import { NextResponse, type NextRequest } from "next/server";

const PROTECTED_PREFIXES = [
  "/dashboard",
  "/patients",
  "/prescriptions",
  "/medicines",
  "/repertory",
  "/clinic",
  "/admin",
  "/settings",
];

// Patterns commonly used by automated exploit scanners and scrapers
const MALICIOUS_PATTERNS = [
  /\.\./,                          // Directory traversal
  /\/\.env/i,                      // Environment file probe
  /\/\.git/i,                      // Git metadata probe
  /\/\.vscode/i,                   // IDE configuration probe
  /wp-config/i,                    // WordPress config probe
  /wp-admin/i,                     // WordPress admin probe
  /phpinfo/i,                      // PHP info leak
  /<script/i,                      // Direct XSS script tags in URL
  /union\s+select/i,               // SQL injection attempts
  /select\s+.*\s+from/i,           // Raw SQL injection probes
  /\.(php|asp|aspx|jsp|cgi|sql|bak|yml|yaml|ini|sh|bash)$/i, // Suspicious file extensions
];

// Simple in-memory sliding window rate limiter
interface RateLimitRecord {
  count: number;
  resetAt: number;
}
const rateLimitMap = new Map<string, RateLimitRecord>();

function isRateLimited(ip: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + windowMs });
    return false;
  }

  record.count += 1;
  return record.count > limit;
}

// Clean up stale IP records periodically to prevent memory leaks
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, record] of rateLimitMap.entries()) {
      if (now > record.resetAt) {
        rateLimitMap.delete(key);
      }
    }
  }, 5 * 60 * 1000);
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "127.0.0.1";

  // 1. Exploit & Attack Pattern Shield (Defense-in-Depth)
  for (const pattern of MALICIOUS_PATTERNS) {
    if (pattern.test(pathname) || pattern.test(request.nextUrl.search)) {
      return new NextResponse("Access Denied: Malformed or prohibited request.", {
        status: 403,
        headers: {
          "Content-Type": "text/plain",
          "X-Content-Type-Options": "nosniff",
        },
      });
    }
  }

  // 2. Allow static assets, images, and fonts immediately
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    pathname.startsWith("/images") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // 3. Rate Limiting on Sensitive Authentication Endpoints
  const isAuthRoute =
    pathname === "/login" ||
    pathname === "/register" ||
    pathname.startsWith("/api/auth");

  if (isAuthRoute) {
    // Max 20 auth requests per 60 seconds per IP
    if (isRateLimited(`auth:${ip}`, 20, 60 * 1000)) {
      return new NextResponse(
        JSON.stringify({
          error: "Too many authentication attempts. Please try again in 1 minute.",
        }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "Retry-After": "60",
          },
        }
      );
    }
  }

  // General traffic rate limit: max 200 requests per 60 seconds per IP
  if (isRateLimited(`gen:${ip}`, 200, 60 * 1000)) {
    return new NextResponse("Too Many Requests. Please slow down.", {
      status: 429,
      headers: { "Retry-After": "30" },
    });
  }

  const sessionCookie = request.cookies.get("homeorx_session_token")?.value;
  const isProtected = PROTECTED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );

  // If visiting login/register with an active session, redirect to dashboard
  if ((pathname === "/login" || pathname === "/register") && sessionCookie) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // If route is protected and no session cookie exists, redirect to login
  if (isProtected && !sessionCookie) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  const response = NextResponse.next();

  // 4. Enforce Security Headers on all dynamic responses
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "SAMEORIGIN");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
