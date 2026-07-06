"use client";

import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    const res = await fetch("/api/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    });

    const data = await res.json();

    setLoading(false);
    setMessage(data.message);
  }

  return (
    <div className="max-w-md mx-auto py-20">
      <h1 className="text-3xl mb-6">بازیابی رمز عبور</h1>

      <form onSubmit={handleSubmit}>
        <input
          className="input-field w-full"
          type="email"
          placeholder="ایمیل"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          className="mt-4 w-full bg-gold py-3"
          disabled={loading}
        >
          {loading ? "در حال ارسال..." : "ارسال لینک بازیابی"}
        </button>
      </form>

      {message && (
        <p className="mt-5">
          {message}
        </p>
      )}
    </div>
  );
}
