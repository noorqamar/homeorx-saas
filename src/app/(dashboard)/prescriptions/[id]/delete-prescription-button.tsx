"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deletePrescription } from "@/app/actions/prescriptions";

export function DeletePrescriptionButton({
  prescriptionId,
}: {
  prescriptionId: string;
}) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (
      confirm(
        "Are you sure you want to permanently delete this prescription? This action cannot be undone."
      )
    ) {
      setIsDeleting(true);
      try {
        await deletePrescription(prescriptionId);
        router.push("/prescriptions");
        router.refresh();
      } catch (err: any) {
        alert(err.message || "Failed to delete prescription.");
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleDelete}
      isLoading={isDeleting}
      className="text-xs text-rose-600 hover:text-rose-700 hover:bg-rose-50"
    >
      <Trash2 className="h-3.5 w-3.5 mr-1" />
      Delete (حذف کریں)
    </Button>
  );
}
