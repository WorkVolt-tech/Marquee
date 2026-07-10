import { useState } from "react";
import { Ticket } from "lucide-react";
import { supabase, isSupabaseConfigured } from "../lib/supabase";

export default function Login() {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    if (!isSupabaseConfigured) {
      await new Promise((r) => setTimeout(r, 500));
      setStatus({ type: "info", message: "Demo mode — connect Supabase in .env to enable real auth." });
      setLoading(false);
      return;
    }

    const action =
      mode === "login"
        ? supabase.auth.signInWithPassword({ email, password })
        : supabase.auth.signUp({ email, password });

    const { error } = await action;
    setStatus(error ? { type: "error", message: error.message } : { type: "success", message: "Check your email to confirm your account." });
    setLoading(false);
  }

  return (
    <div className="max-w-md mx-auto px-6 py-20">
      <div className="flex items-center gap-2 justify-center mb-8">
        <Ticket className="text-marigold" size={22} />
        <span className="font-display text-2xl tracking-wide">MARQUEE</span>
      </div>

      <div className="bg-ink-soft border border-line rounded-2xl p-7">
        <div className="flex gap-2 mb-6 bg-ink rounded-full p-1">
          <button
            onClick={() => setMode("login")}
            className={`flex-1 py-2 rounded-full text-sm font-medium transition-colors ${mode === "login" ? "bg-marigold text-ink" : "text-paper/50"}`}
          >
            Log in
          </button>
          <button
            onClick={() => setMode("signup")}
            className={`flex-1 py-2 rounded-full text-sm font-medium transition-colors ${mode === "signup" ? "bg-marigold text-ink" : "text-paper/50"}`}
          >
            Sign up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-paper/70">Email</span>
            <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input" placeholder="you@example.com" />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-paper/70">Password</span>
            <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input" placeholder="••••••••" />
          </label>

          {status && (
            <p className={`text-sm ${status.type === "error" ? "text-coral" : "text-teal-soft"}`}>{status.message}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full bg-marigold text-ink font-semibold py-3 rounded-full hover:bg-marigold-soft transition-colors disabled:opacity-60"
          >
            {loading ? "Please wait…" : mode === "login" ? "Log in" : "Create account"}
          </button>
        </form>
      </div>
    </div>
  );
}
