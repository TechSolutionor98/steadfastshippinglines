import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import crypto from "crypto";
import { logActivity } from "@/lib/activity-logger";

function hashPassword(password) {
  return crypto.createHash("sha256").update(password + "cms_salt_2024").digest("hex");
}

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanPass = (password || '').trim();

    // 1. Direct Super Admin Credentials (Instant login failover)
    if (cleanEmail === "saleemmughal03092002@gmail.com" && cleanPass === "saleemmughal03092002") {
      const token = Buffer.from(JSON.stringify({
        userId: "super_admin_saleem",
        role: "super_admin",
        roles: ["super_admin"],
        name: "Saleem Mughal"
      })).toString('base64');

      // Non-blocking activity log (does not block or delay login response)
      logActivity(request, 'login', 'Saleem Mughal', {}, { userId: 'super_admin_saleem', userName: 'Saleem Mughal' }).catch(() => {});

      const response = NextResponse.json({
        token,
        user: {
          name: "Saleem Mughal",
          email: "saleemmughal03092002@gmail.com",
          role: "super_admin",
          roles: ["super_admin"],
        }
      });
      response.cookies.set("jwt", token, { httpOnly: true, path: "/" });
      return response;
    }

    // 2. Check environment variables
    if (adminEmail && adminPassword && cleanEmail === adminEmail.toLowerCase() && cleanPass === adminPassword) {
      const token = "demo-jwt-token";
      logActivity(request, 'login', 'Super Admin', {}, { userId: 'super_admin', userName: 'Super Admin' }).catch(() => {});
      const response = NextResponse.json({
        token,
        user: {
          name: "Super Admin",
          email: adminEmail,
          role: "super_admin",
        }
      });
      response.cookies.set("jwt", token, { httpOnly: true, path: "/" });
      return response;
    }

    // 2. Check Database users
    const db = await getDb();
    const user = await db.collection("cms_users").findOne({ email });

    if (user) {
      // Check status
      if (user.status !== "active") {
        return NextResponse.json({ error: "User account is deactivated" }, { status: 403 });
      }

      // Check password
      const calculatedHash = hashPassword(password);
      if (user.passwordHash === calculatedHash) {
        const uRoles = Array.isArray(user.roles) && user.roles.length > 0
          ? user.roles
          : (user.role ? [user.role] : ['editor']);
        const primaryRole = user.role || uRoles[0];
        const token = Buffer.from(JSON.stringify({
          userId: user._id.toString(),
          role: primaryRole,
          roles: uRoles,
          name: user.name
        })).toString('base64');
        await logActivity(request, 'login', user.name, {}, { userId: user._id.toString(), userName: user.name });
        const response = NextResponse.json({
          token,
          user: {
            name: user.name,
            email: user.email,
            role: primaryRole,
            roles: uRoles,
          }
        });
        response.cookies.set("jwt", token, { httpOnly: true, path: "/" });
        return response;
      }
    }

    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}