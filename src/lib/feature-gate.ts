import { db } from "@/lib/db";
import { AccountStatus } from "./account-lifecycle";

export const DEMO_DAILY_PRESCRIPTION_LIMIT = 5;

export interface FeatureAccess {
  canCreatePrescription: boolean;
  canPrintCleanLetterhead: boolean; // false = prints with watermark
  canUseQrVerification: boolean;
  canSelectCustomThemes: boolean;
  canAccessRepertory: boolean;
  dailyPrescriptionLimit: number | null; // null = unlimited
  reason?: string;
}

/**
 * Returns feature access permissions based on account status
 */
export function getFeatureAccess(status: string | null | undefined): FeatureAccess {
  const accountStatus = (status || "demo") as AccountStatus;

  switch (accountStatus) {
    case "active":
      return {
        canCreatePrescription: true,
        canPrintCleanLetterhead: true,
        canUseQrVerification: true,
        canSelectCustomThemes: true,
        canAccessRepertory: true,
        dailyPrescriptionLimit: null, // Unlimited
      };

    case "pending_approval":
      return {
        canCreatePrescription: true,
        canPrintCleanLetterhead: false, // Watermarked
        canUseQrVerification: false,
        canSelectCustomThemes: false,
        canAccessRepertory: true,
        dailyPrescriptionLimit: DEMO_DAILY_PRESCRIPTION_LIMIT,
        reason: "آپ کا اپ گریڈ اکاؤنٹ ایڈمن کی تصدیق کے انتظار میں ہے۔",
      };

    case "demo":
      return {
        canCreatePrescription: true,
        canPrintCleanLetterhead: false, // Watermarked
        canUseQrVerification: false,
        canSelectCustomThemes: false,
        canAccessRepertory: true,
        dailyPrescriptionLimit: DEMO_DAILY_PRESCRIPTION_LIMIT,
        reason: "ڈیمو ٹرائل اکاؤنٹ: روزانہ 5 نسخے، ٹرائل واٹر مارک اور ڈیفالٹ تھیم۔",
      };

    case "rejected":
      return {
        canCreatePrescription: false,
        canPrintCleanLetterhead: false,
        canUseQrVerification: false,
        canSelectCustomThemes: false,
        canAccessRepertory: false,
        dailyPrescriptionLimit: 0,
        reason: "یہ اکاؤنٹ ریجیکٹ ہو چکا ہے۔ براہ کرم نئی تفصیلات کے ساتھ دوبارہ اپلائی کریں۔",
      };

    case "suspended":
    default:
      return {
        canCreatePrescription: false,
        canPrintCleanLetterhead: false,
        canUseQrVerification: false,
        canSelectCustomThemes: false,
        canAccessRepertory: false,
        dailyPrescriptionLimit: 0,
        reason: "اکاؤنٹ معطل ہے۔ براہ کرم سپر ایڈمن سے رابطہ کریں۔",
      };
  }
}

/**
 * Server-side check for daily prescription creation quota
 */
export async function verifyPrescriptionCreationQuota(tenantId: string): Promise<{
  allowed: boolean;
  remainingToday: number | null;
  limit: number | null;
  isDemo: boolean;
  error?: string;
}> {
  const tenant = await db.tenant.findUnique({
    where: { id: tenantId },
    select: { accountStatus: true },
  });

  const status = (tenant?.accountStatus || "demo") as AccountStatus;
  const access = getFeatureAccess(status);

  if (!access.canCreatePrescription) {
    return {
      allowed: false,
      remainingToday: 0,
      limit: 0,
      isDemo: status !== "active",
      error: access.reason || "آپ کا اکاؤنٹ نسخہ تحریر کرنے کی اجازت نہیں دیتا۔",
    };
  }

  // Active accounts have unlimited creation
  if (status === "active") {
    return {
      allowed: true,
      remainingToday: null,
      limit: null,
      isDemo: false,
    };
  }

  // Calculate prescriptions created by tenant today (Midnight to Midnight)
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  const countToday = await db.prescription.count({
    where: {
      tenantId,
      createdAt: {
        gte: startOfDay,
        lte: endOfDay,
      },
    },
  });

  const limit = access.dailyPrescriptionLimit || DEMO_DAILY_PRESCRIPTION_LIMIT;
  const remaining = Math.max(0, limit - countToday);

  if (countToday >= limit) {
    return {
      allowed: false,
      remainingToday: 0,
      limit,
      isDemo: true,
      error: `ڈیمو اکاؤنٹ کی یومیہ حد (${limit} نسخہ جات) مکمل ہو چکی ہے۔ لامحدود نسخوں اور QR فیچرز کے لیے اپنا اکاؤنٹ اپ گریڈ فرمائیں۔`,
    };
  }

  return {
    allowed: true,
    remainingToday: remaining,
    limit,
    isDemo: true,
  };
}
