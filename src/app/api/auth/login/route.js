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

    // 1. Check environment variables (.env)
    if (adminEmail && adminPassword && cleanEmail === adminEmail.trim().toLowerCase() && cleanPass === adminPassword.trim()) {
      const token = "demo-jwt-token";
      logActivity(request, 'login', 'Super Admin', {}, { userId: 'super_admin', userName: 'Super Admin' }).catch(() => {});
      const response = NextResponse.json({
        token,
        user: {
          name: "Super Admin",
          email: adminEmail,
          role: "super_admin",
          roles: ["super_admin"]
        }
      });
      response.cookies.set("jwt", token, { httpOnly: true, path: "/" });
      return response;
    }

    // 2. Check Database users (MongoDB cms_users collection)
    const db = await getDb();
    const user = await db.collection("cms_users").findOne({
      $or: [
        { email: cleanEmail },
        { email: { $regex: new RegExp(`^${cleanEmail.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i') } }
      ]
    });

    if (user) {
      // Check status
      if (user.status !== "active") {
        return NextResponse.json({ error: "User account is deactivated" }, { status: 403 });
      }

      // Check password
      const calculatedHash = hashPassword(cleanPass);
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
        logActivity(request, 'login', user.name, {}, { userId: user._id.toString(), userName: user.name }).catch(() => {});
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
    return NextResponse.json({ error: "Internal server error: " + (err.message || "") }, { status: 500 });
  }
}