import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { accountCopy } from "@/data/account-copy";
import { naira } from "@/data/market";
import { showPhone } from "@/data/trade";
import {
  addProduct,
  getOwner,
  listPlans,
  logoutBusiness,
  setPhonePublic,
  submitEvidence,
  type OwnerView,
} from "@/lib/market/api";
import { useMarket } from "@/lib/market-store";

export const Route = createFileRoute("/business")({
  component: BusinessPage,
});

function BusinessPage() {
  const lang = useMarket((state) => state.lang);
  const text = accountCopy[lang];
  const [owner, setOwner] = useState<OwnerView | null | undefined>(undefined);
  const [plans, setPlans] = useState<Awaited<ReturnType<typeof listPlans>>>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [reference, setReference] = useState("");
  const [kind, setKind] = useState<"cac" | "nafdac">("cac");
  const [error, setError] = useState("");
  const [note, setNote] = useState("");

  async function load() {
    const [next, planRows] = await Promise.all([getOwner(), listPlans()]);
    setOwner(next);
    setPlans(planRows);
  }

  useEffect(() => {
    void load();
  }, []);

  async function saveProduct(event: FormEvent) {
    event.preventDefault();
    const result = await addProduct({ data: { name, price: Number(price.replace(/,/g, "")), unit: "piece" } });
    if (!result.ok) {
      setError(result.error);
      return;
    }
    setName("");
    setPrice("");
    setError("");
    await load();
  }

  async function evidence(event: FormEvent) {
    event.preventDefault();
    const result = await submitEvidence({ data: { kind, reference } });
    if (!result.ok) {
      setError(result.error);
      return;
    }
    setNote(text.evidenceNote);
    setReference("");
    await load();
  }

  if (owner === undefined) return <main className="px-4 py-8 text-muted">Loading</main>;
  if (!owner) {
    return (
      <main className="mx-auto max-w-xl px-4 py-8">
        <h1 className="font-display text-4xl text-ink">{text.deskTitle}</h1>
        <Link to="/login" className="mt-4 inline-flex h-12 items-center rounded-2xl bg-indigo px-4 font-semibold text-sheet">
          {text.login}
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-xl px-4 py-5">
      <p className="text-sm text-muted">{owner.email}</p>
      <h1 className="mt-1 font-display text-4xl text-ink">{owner.business.name}</h1>
      <p className="mt-2 text-muted">
        {owner.business.stall_code} · {owner.business.identity_status === "pending" ? "Check pending" : "Not verified"}
      </p>
      <p className="mt-2 text-sm">
        {text.hidden}: {showPhone(owner.business.phone)}
      </p>
      <button
        type="button"
        onClick={() => void setPhonePublic({ data: { phonePublic: !owner.business.phone_public } }).then(load)}
        className="mt-2 h-11 rounded-full border border-line px-4 text-sm font-semibold"
      >
        {owner.business.phone_public ? text.hideNumber : text.showNumber}
      </button>
      <form onSubmit={(event) => void saveProduct(event)} className="mt-6 grid gap-2">
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder={text.product}
          className="h-12 rounded-2xl border border-line bg-sheet px-3"
        />
        <input
          value={price}
          onChange={(event) => setPrice(event.target.value)}
          inputMode="numeric"
          placeholder={text.price}
          className="h-12 rounded-2xl border border-line bg-sheet px-3"
        />
        <button type="submit" className="h-12 rounded-2xl bg-clay px-4 text-sm font-semibold text-sheet">
          {text.add}
        </button>
      </form>
      {error ? <p className="mt-2 text-sm font-medium text-clay">{error}</p> : null}
      <ul className="mt-3 grid gap-2">
        {owner.products.map((product) => (
          <li key={product.id} className="rounded-2xl border border-line bg-sheet px-3 py-3 text-sm">
            {product.name} · {naira(product.price_naira)}
          </li>
        ))}
      </ul>
      <section className="mt-8">
        <h2 className="font-display text-3xl">{text.enquiries}</h2>
        {owner.enquiries.length === 0 ? <p className="mt-2 text-sm text-muted">{text.noEnquiries}</p> : null}
        <ul className="mt-3 grid gap-2">
          {owner.enquiries.map((item) => (
            <li key={item.id} className="rounded-2xl border border-line bg-sheet px-3 py-3 text-sm">
              <p className="font-semibold">{item.from_name}</p>
              <p className="text-muted">{item.from_contact}</p>
              <p className="mt-1 whitespace-pre-wrap">{item.message}</p>
            </li>
          ))}
        </ul>
      </section>
      <form onSubmit={(event) => void evidence(event)} className="mt-8 rounded-2xl border border-line bg-sheet p-4">
        <h2 className="font-display text-3xl">{text.evidence}</h2>
        <p className="mt-2 text-sm text-muted">{text.evidenceNote}</p>
        <p className="mt-2 text-sm text-muted">CAC is a business-identity check. NAFDAC is a product-registration check. Neither one verifies the goods in hand, and neither one is an official result.</p>
        <div className="mt-3 flex gap-2">
          {(["cac", "nafdac"] as const).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setKind(item)}
              className={item === kind ? "h-10 rounded-full bg-indigo px-3 text-sm font-semibold text-sheet" : "h-10 rounded-full border border-line px-3 text-sm font-semibold"}
            >
              {item.toUpperCase()}
            </button>
          ))}
        </div>
        <input
          value={reference}
          onChange={(event) => setReference(event.target.value)}
          placeholder="RC or NAFDAC number"
          className="mt-3 h-12 w-full rounded-2xl border border-line bg-paper px-3"
        />
        <button type="submit" className="mt-3 h-11 rounded-full border border-line px-4 text-sm font-semibold">
          {text.sendEvidence}
        </button>
        {note ? <p className="mt-2 text-sm text-indigo">{note}</p> : null}
      </form>
      <section className="mt-8">
        <h2 className="font-display text-3xl">{text.plans}</h2>
        <ul className="mt-3 grid gap-2">
          {plans.map((plan) => (
            <li key={plan.code} className="rounded-2xl border border-line bg-sheet px-3 py-3 text-sm">
              <p className="font-semibold">
                {plan.name} · {plan.purchasable ? naira(plan.price_naira) : text.notLive}
              </p>
              <p className="text-muted">{plan.note}</p>
            </li>
          ))}
        </ul>
      </section>
      <button
        type="button"
        onClick={() => void logoutBusiness().then(() => setOwner(null))}
        className="mt-6 text-sm font-semibold text-muted"
      >
        Log out
      </button>
    </main>
  );
}
