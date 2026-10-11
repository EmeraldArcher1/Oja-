import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { naira } from "@/data/market";
import { listPlans, updatePlanPrice } from "@/lib/market/api";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
});

function AdminPage() {
  const [plans, setPlans] = useState<Awaited<ReturnType<typeof listPlans>>>([]);
  const [price, setPrice] = useState("");
  const [adminKey, setAdminKey] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    void listPlans().then(setPlans);
  }, []);

  async function submit(event: FormEvent) {
    event.preventDefault();
    const result = await updatePlanPrice({ data: { code: "growth", priceNaira: Number(price.replace(/,/g, "")), adminKey } });
    setMessage(result.ok ? `Growth proposed at ${naira(result.data.priceNaira)}. It still cannot be bought.` : result.error);
    if (result.ok) {
      setAdminKey("");
      setPlans(await listPlans());
    }
  }

  return (
    <main className="mx-auto w-full max-w-xl px-4 py-5">
      <h1 className="font-display text-4xl text-ink">Plan prices</h1>
      <p className="mt-2 text-muted">
        An administrator can propose the Growth price. The key is checked on the server and is not saved in the app. Starter stays free. The 2% fee cannot be switched on.
      </p>
      <ul className="mt-4 grid gap-2">
        {plans.map((plan) => (
          <li key={plan.code} className="rounded-2xl border border-line bg-sheet px-3 py-3 text-sm">
            <p className="font-semibold">
              {plan.name} · {plan.purchasable ? naira(plan.price_naira) : "Not for sale"}
            </p>
            <p className="text-muted">{plan.note}</p>
          </li>
        ))}
      </ul>
      <form onSubmit={(event) => void submit(event)} className="mt-6 grid gap-2">
        <input value={price} onChange={(event) => setPrice(event.target.value)} inputMode="numeric" placeholder="Growth price in naira" className="h-12 rounded-2xl border border-line bg-sheet px-3" />
        <input value={adminKey} onChange={(event) => setAdminKey(event.target.value)} type="password" placeholder="Administrator key" autoComplete="off" className="h-12 rounded-2xl border border-line bg-sheet px-3" />
        <button type="submit" className="h-12 rounded-2xl bg-indigo text-sm font-semibold text-sheet">
          Save proposed price
        </button>
      </form>
      {message ? <p className="mt-3 text-sm">{message}</p> : null}
    </main>
  );
}
