"use client";

import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  async function handleSubmit() {
    setLoading(true);
    setMsg("");

    const res = await fetch("/api/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    setLoading(false);

    if (!data.ok) {
      setMsg(data.error);
    } else {
      setMsg("لینک بازیابی ایمیل شد 📩");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="w-[350px] p-6 bg-zinc-900 rounded-xl">
        <h1 className="text-xl mb-4">بازیابی رمز عبور</h1>

        <input
          className="w-full p-2 text-black rounded"
          placeholder="ایمیل یا شماره"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full mt-4 bg-yellow-500 p-2 text-black"
        >
          {loading ? "در حال ارسال..." : "ارسال لینک"}
        </button>

        {msg && <p className="mt-3 text-sm">{msg}</p>}
      </div>
    </div>
  );
}
