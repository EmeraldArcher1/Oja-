import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { accountCopy } from "@/data/account-copy";
import { loginBusiness } from "@/lib/market/api";
import { useMarket } from "@/lib/market-store";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const lang = useMarket((state) => state.lang);
  const text = accountCopy[lang];
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function submit(event: FormEvent) {
    event.preventDefault();
    const result = await loginBusiness({ data: { email, password } });
    if (!result.ok) {
      setError(result.error);
      return;
    }
    void navigate({ to: "/business" });
  }

  return (
    <main className="mx-auto w-full max-w-xl px-4 py-5">
      <h1 className="font-display text-4xl text-ink">{text.loginTitle}</h1>
      <form onSubmit={(event) => void submit(event)} className="mt-4 grid gap-3">
        <label className="text-sm font-medium">
          {text.email}
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-1 h-12 w-full rounded-2xl border border-line bg-sheet px-3 text-base outline-none focus-visible:border-indigo"
          />
        </label>
        <label className="text-sm font-medium">
          {text.password}
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-1 h-12 w-full rounded-2xl border border-line bg-sheet px-3 text-base outline-none focus-visible:border-indigo"
          />
        </label>
        {error ? <p className="text-sm font-medium text-clay">{error}</p> : null}
        <button type="submit" className="h-12 rounded-2xl bg-indigo text-sm font-semibold text-sheet">
          {text.login}
        </button>
      </form>
      <Link to="/join" className="mt-4 inline-flex text-sm font-semibold text-indigo">
        {text.need}
      </Link>
    </main>
  );
}
