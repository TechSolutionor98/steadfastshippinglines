"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });
    if (res.ok) {
      const { token, user } = await res.json();
      localStorage.setItem("jwt", token);
      // Store exactly what the API returns — do NOT default to super_admin
      localStorage.setItem("user", JSON.stringify(user ?? {}));
      window.location.href = "/admin"; // Force reload and navigate to admin
    } else {
      setError("Invalid email or password");
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
          boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
          minWidth: 340,
          display: "flex",
          flexDirection: "column",
          gap: 18,
          alignItems: "center"
        }}
      >
        <div style={{ marginBottom: 4 }}>
          <Image
            src="/images/logo.png"
            alt="Steadfast Shipping Lines"
            width={180}
            height={55}
            priority
            style={{ objectFit: "contain" }}
          />
        </div>
        <h2 style={{ textAlign: "center", color: "#141E36", margin: "0 0 8px 0", fontSize: "20px", fontWeight: "700" }}>Admin Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={e => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "15px",
            color: "black",
            boxSizing: "border-box"
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={e => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "15px",
            color: "black",
            boxSizing: "border-box"
          }}
        />
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            background: "#141E36",
            color: "#fff",
            fontWeight: "bold",
            fontSize: "16px",
            border: "none",
            cursor: "pointer",
            marginTop: "8px"
          }}
        >
          Login
        </button>
        {error && (
          <div style={{ color: "red", textAlign: "center", marginTop: "4px" }}>
            {error}
          </div>
        )}
      </form>
    </div>
  );
}