import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { marketById, markets } from "@/data/lagos";
import { stateById } from "@/data/nigeria";
import { categoryLabel, categories, naira, type CategoryId } from "@/data/market";
import { getPublicShop, sendEnquiry, type PublicBusiness } from "@/lib/market/api";
import { showPhone } from "@/data/trade";

export const Route = createFileRoute("/shop/$code")({
  component: ShopPage,
});

function ShopPage() {
  const { code } = Route.useParams();
  const [shop, setShop] = useState<Awaited<ReturnType<typeof getPublicShop>> | undefined>(undefined);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState("");

  useEffect(() => {
    void getPublicShop({ data: { stallCode: code } }).then(setShop);
  }, [code]);

  async function submit(event: FormEvent) {
    event.preventDefault();
    const result = await sendEnquiry({ data: { stallCode: code, fromName: name, fromContact: contact, message } });
    if (!result.ok) {
      setError(result.error);
      return;
    }
    setError("");
    setSent(result.data.inbox ? "Sent to the registered business." : "Saved against this stall code. No registered business owns it yet.");
    setMessage("");
  }

  if (shop === undefined) return <main className="px-4 py-8 text-muted">Loading</main>;
  if (!shop) {
    return (
      <main className="mx-auto max-w-xl px-4 py-8">
        <h1 className="font-display text-4xl text-ink">No registered business uses {code}.</h1>
        <Link to="/join" className="mt-4 inline-flex h-12 items-center font-semibold text-indigo">
          Sign up
        </Link>
      </main>
    );
  }

  return <ShopBody shop={shop.business} products={shop.products} name={name} setName={setName} contact={contact} setContact={setContact} message={message} setMessage={setMessage} error={error} sent={sent} onSubmit={submit} />;
}

function ShopBody({
  shop,
  products,
  name,
  setName,
  contact,
  setContact,
  message,
  setMessage,
  error,
  sent,
  onSubmit,
}: {
  shop: PublicBusiness;
  products: { id: string; name: string; price_naira: number; unit: string }[];
  name: string;
  setName: (value: string) => void;
  contact: string;
  setContact: (value: string) => void;
  message: string;
  setMessage: (value: string) => void;
  error: string;
  sent: string;
  onSubmit: (event: FormEvent) => void;
}) {
  const market = markets.find((item) => item.id === shop.marketId);
  const state = stateById(shop.marketId);
  const placeName = market?.name ?? (state ? `${state.market}, ${state.name}` : "Nigeria");
  const category = (categories.find((item) => item.id === shop.category)?.id ?? "food") as CategoryId;
  return (
    <main className="mx-auto w-full max-w-xl px-4 py-5">
      <p className="text-sm font-medium text-indigo">{placeName}</p>
      <h1 className="mt-1 font-display text-4xl text-ink">{shop.name}</h1>
      <p className="mt-2 text-muted">
        {shop.trader} · {categoryLabel(category)} · {shop.stallCode}
        {shop.lga ? ` · ${shop.lga}` : ""}
      </p>
      <p className="mt-2 inline-flex rounded-full border border-line px-3 py-1 text-sm">
        {shop.identityStatus === "pending" ? "CAC file pending · not verified" : "Not verified"}
      </p>
      <p className="mt-2 text-sm text-muted">
        Person, stall visit, CAC, and NAFDAC are separate. None of them is a badge on this page.
      </p>
      {shop.about ? <p className="mt-3 text-ink">{shop.about}</p> : null}
      <p className="mt-3 text-sm text-muted">
        {shop.phone ? `Published number ${showPhone(shop.phone)}` : "The owner has not published a phone number."}
      </p>
      <h2 className="mt-6 font-display text-3xl">Products</h2>
      {products.length === 0 ? <p className="mt-2 text-sm text-muted">No products listed yet.</p> : null}
      <ul className="mt-3 grid gap-2">
        {products.map((product) => (
          <li key={product.id} className="rounded-2xl border border-line bg-sheet px-3 py-3 text-sm">
            {product.name} · {naira(product.price_naira)} / {product.unit}
          </li>
        ))}
      </ul>
      <form onSubmit={(event) => void onSubmit(event)} className="mt-6 grid gap-2">
        <h2 className="font-display text-3xl">Enquiry</h2>
        <input value={name} onChange={(event) => setName(event.target.value)} placeholder="Your name" className="h-12 rounded-2xl border border-line bg-sheet px-3" />
        <input value={contact} onChange={(event) => setContact(event.target.value)} placeholder="Phone or email" className="h-12 rounded-2xl border border-line bg-sheet px-3" />
        <textarea value={message} onChange={(event) => setMessage(event.target.value)} placeholder="What do you want to buy?" rows={3} className="rounded-2xl border border-line bg-sheet px-3 py-3" />
        {error ? <p className="text-sm font-medium text-clay">{error}</p> : null}
        {sent ? <p className="text-sm font-medium text-indigo">{sent}</p> : null}
        <button type="submit" className="h-12 rounded-2xl bg-clay text-sm font-semibold text-sheet">
          Send enquiry
        </button>
      </form>
      {market ? (
        <Link to="/market/$id" params={{ id: market.id }} className="mt-4 inline-flex text-sm font-semibold text-indigo">
          {market.name}
        </Link>
      ) : state ? (
        <Link to="/state/$id" params={{ id: state.id }} className="mt-4 inline-flex text-sm font-semibold text-indigo">
          {state.name}
        </Link>
      ) : null}
    </main>
  );
}
