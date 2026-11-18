"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ 
          email: email.trim(), 
          password: password.trim() 
        }),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        const { token, user } = await res.json();
        localStorage.setItem("jwt", token);
        // Store exactly what the API returns — do NOT default to super_admin
        localStorage.setItem("user", JSON.stringify(user ?? {}));
        window.location.href = "/admin"; // Force reload and navigate to admin
      } else {
        const errData = await res.json().catch(() => ({}));
        setError(errData.error || "Invalid email or password");
        setLoading(false);
      }
    } catch (err) {
      console.error("Login fetch error:", err);
      setError("Network or server connection error. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #141E36 0%, #1D2A4C 100%)",
      padding: "20px"
    }}>
      <form
        onSubmit={handleLogin}
        style={{
          background: "#fff",
          padding: "40px 32px",
          borderRadius: "16px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
          width: "100%",
          maxWidth: "380px",
          display: "flex",
          flexDirection: "column",
          gap: 18,
          alignItems: "center"
        }}
      >
        <h2 style={{ textAlign: "center", color: "#141E36", margin: "0 0 8px 0", fontSize: "24px", fontWeight: "700" }}>Admin Login</h2>
        
        {/* Email Input */}
        <div style={{ width: "100%" }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            required
            onChange={e => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: "12px 14px",
              borderRadius: "8px",
              border: "1px solid #d1d5db",
              fontSize: "15px",
              color: "#111827",
              boxSizing: "border-box",
              outline: "none"
            }}
          />
        </div>

        {/* Password Input with Show/Hide Eye Toggle */}
        <div style={{ position: "relative", width: "100%" }}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            required
            onChange={e => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "12px 42px 12px 14px",
              borderRadius: "8px",
              border: "1px solid #d1d5db",
              fontSize: "15px",
              color: "#111827",
              boxSizing: "border-box",
              outline: "none"
            }}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              right: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#6b7280",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "4px"
            }}
            title={showPassword ? "Hide password" : "Show password"}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            background: loading ? "#1D2A4C" : "#141E36",
            color: "#fff",
            fontWeight: "bold",
            fontSize: "16px",
            border: "none",
            cursor: loading ? "not-allowed" : "pointer",
            marginTop: "6px",
            opacity: loading ? 0.8 : 1,
            transition: "all 0.2s"
          }}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {error && (
          <div style={{ color: "#dc2626", textAlign: "center", fontSize: "14px", marginTop: "2px" }}>
            {error}
          </div>
        )}
      </form>
    </div>
  );
}