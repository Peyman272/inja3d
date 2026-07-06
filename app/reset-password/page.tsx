"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();

  const key = searchParams.get("key");
  const login = searchParams.get("login");

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleReset() {
    setMsg("");

    if (!password || password.length < 6) {
      setMsg("رمز باید حداقل ۶ کاراکتر باشد");
      return;
    }

    if (password !== confirm) {
      setMsg("رمزها یکسان نیستند");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        key,
        login,
        password,
      }),
    });

    const data = await res.json();

    setLoading(false);

    if (!data.ok) {
      setMsg(data.error || "خطا در تغییر رمز");
    } else {
      setMsg("رمز با موفقیت تغییر کرد ✔");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="w-[350px] p-6 bg-zinc-900 rounded-xl">
        <h1 className="text-xl mb-4">تغییر رمز عبور</h1>

        <input
          type="password"
          placeholder="رمز جدید"
          className="w-full p-2 text-black mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="تکرار رمز"
          className="w-full p-2 text-black"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />

        <button
          onClick={handleReset}
          disabled={loading}
          className="w-full mt-4 bg-yellow-500 text-black p-2"
        >
          {loading ? "در حال ذخیره..." : "تغییر رمز"}
        </button>

        {msg && <p className="mt-3 text-sm">{msg}</p>}
      </div>
    </div>
  );
}
