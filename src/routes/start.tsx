import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { marketById, markets } from "@/data/lagos";
import { categories, stallByCode, type CategoryId, type Stall } from "@/data/market";
import { tidyPhone } from "@/data/trade";
import { useMarket } from "@/lib/market-store";

export const Route = createFileRoute("/start")({
  component: StartPage,
});

const copy = {
  en: {
    kicker: "For traders",
    title: "How to put your stall on Oja",
    lede: "Sign up with your email. A phone number is optional and is not the account.",
    steps: [
      {
        n: "1",
        title: "Open your market",
        body: "Buyers start from the market, not a street address.",
      },
      {
        n: "2",
        title: "Open the stall",
        body: "For this lesson, use Kemi Lace House, code A1-04. On a real stall you would open yours.",
      },
      {
        n: "3",
        title: "Save your mobile",
        body: "Scroll to Stall owner. Type the number buyers already call, like 0803 000 0000, and tap Save phone. Orders open on that WhatsApp.",
      },
      {
        n: "4",
        title: "List what you sell",
        body: "Add the product and the price. Remove anything you do not sell. The price is listed. Stock is not live — you still confirm each order.",
      },
      {
        n: "5",
        title: "Fix the photo and the pin",
        body: "If the directory picture or the map pin is wrong, change them. Buyers see what you save.",
      },
      {
        n: "6",
        title: "Share the shop",
        body: "Tap Share shop and send the link on your WhatsApp status. That is how a buyer finds you.",
      },
      {
        n: "7",
        title: "Confirm, then hand over",
        body: "An enquiry can be saved on this pilot. It does not open WhatsApp, book a rider, or take a fee. You keep the whole sample price, because Oja does not collect it.",
      },
    ],
    does: "What it does now",
    doesItems: [
      "Saves an enquiry against the stall code when someone places a sample order.",
      "Hides the phone number unless you publish it.",
      "Shows a delivery quote on screen. It does not book a rider.",
      "Does not take a fee.",
    ],
    not: "What it does not do",
    notItems: [
      "It does not take NIN or BVN.",
      "It does not move money. There is no live payment or refund.",
      "A sample listing is not a verified business.",
    ],
    helps: "How the day gets simpler",
    helpItems: [
      "You stop repeating your location. The code and the pin do that.",
      "You stop retyping the price list for every customer.",
      "The rider is not guessing which shutter.",
      "You can see what you keep before you hand the goods over.",
    ],
    markets: "Choose a market",
    stall: "Open the sample stall",
    desk: "Go to Stall owner",
    mapped: "Are the stalls mapped?",
    mappedBody:
      "Partly. Each market has a street pin near the real market, and every stall opens in Google Maps. Balogun also has a lane walk: turn at the landmark, then use the stall code. The pin is not a surveyed door. If yours is wrong, nudge it under Stall owner. About 15 metres a tap.",
  },
  pg: {
    kicker: "For traders",
    title: "How you go put your stall for Oja",
    lede: "Sign up with your email. Phone number no be the account.",
    steps: [
      {
        n: "1",
        title: "Open your market",
        body: "Buyer dey start from the market, no be street address.",
      },
      {
        n: "2",
        title: "Open the stall",
        body: "For this lesson, use Kemi Lace House, code A1-04. For real stall, you go open your own.",
      },
      {
        n: "3",
        title: "Save your number",
        body: "Scroll go Stall owner. Type the number wey buyer dey call, like 0803 000 0000, then tap Save phone. Order go open for that WhatsApp.",
      },
      {
        n: "4",
        title: "List wetin you dey sell",
        body: "Add the product and the price. Remove wetin you no dey sell. The price na listed price. Stock no be live — you still go confirm each order.",
      },
      {
        n: "5",
        title: "Correct the photo and the pin",
        body: "If the picture or the map pin no correct, change am. Buyer go see wetin you save.",
      },
      {
        n: "6",
        title: "Share the shop",
        body: "Tap Share shop and send the link for your WhatsApp status. Na so buyer go find you.",
      },
      {
        n: "7",
        title: "Confirm, then give am",
        body: "Enquiry fit save for this pilot. E no open WhatsApp, e no book rider, and e no take fee. You keep the sample price, because Oja no collect am.",
      },
    ],
    does: "Wetin e dey do now",
    doesItems: [
      "E save enquiry for the stall code when person place sample order.",
      "E hide the phone number until you publish am.",
      "E show delivery quote for screen. E no book rider.",
      "E no take fee.",
    ],
    not: "Wetin e no dey do",
    notItems: [
      "E no collect NIN or BVN.",
      "E no move money. No live payment or refund.",
      "Sample listing no be verified business.",
    ],
    helps: "How the day go easy",
    helpItems: [
      "You no go dey repeat your location. The code and the pin go do am.",
      "You no go dey type the price list for every customer.",
      "The rider no go dey guess which shutter.",
      "You fit see wetin you go keep before you hand the goods over.",
    ],
    markets: "Choose market",
    stall: "Open the sample stall",
    desk: "Go Stall owner",
    mapped: "The stall dem don map?",
    mappedBody:
      "Small. Every market get street pin near the real market, and every stall fit open for Google Maps. Balogun get lane waka: turn for the landmark, then use the stall code. The pin no be measured door. If your own no correct, shift am under Stall owner. About 15 metres for one tap.",
  },
} as const;

function StartPage() {
  const lang = useMarket((state) => state.lang);
  const text = lang === "pg" ? copy.pg : copy.en;

  return (
    <main className="mx-auto w-full max-w-xl px-4 py-5">
      <p className="text-sm font-medium text-indigo">{text.kicker}</p>
      <h1 className="mt-1 font-display text-4xl text-ink">{text.title}</h1>
      <p className="mt-2 text-muted">{text.lede}</p>
      <Link to="/join" className="mt-3 inline-flex h-11 items-center text-sm font-semibold text-clay">
        Sign up
      </Link>
      <AddStall lang={lang} />
      <Link to="/open" className="mt-3 inline-flex text-sm font-semibold text-indigo">
        {lang === "pg" ? "Advertise, export, or partner." : "Advertise, export, or partner."}
      </Link>

      <div className="mt-4 flex flex-wrap gap-2">
        <Link
          to="/markets"
          className="inline-flex h-11 items-center rounded-full bg-indigo px-4 text-sm font-semibold text-sheet"
        >
          {text.markets}
        </Link>
        <Link
          to="/stall/$code"
          params={{ code: "A1-04" }}
          hash="owner"
          className="inline-flex h-11 items-center rounded-full bg-clay px-4 text-sm font-semibold text-sheet"
        >
          {text.desk}
        </Link>
      </div>

      <ol className="mt-6 grid gap-3">
        {text.steps.map((step) => (
          <li key={step.n} className="rounded-2xl border border-line bg-sheet px-4 py-4">
            <p className="font-display text-3xl leading-none text-clay">{step.n}</p>
            <h2 className="mt-2 text-lg font-semibold text-ink">{step.title}</h2>
            <p className="mt-1 text-sm text-muted">{step.body}</p>
          </li>
        ))}
      </ol>

      <section className="mt-8 rounded-2xl bg-indigo px-4 py-4 text-sheet">
        <h2 className="font-display text-3xl">{text.mapped}</h2>
        <p className="mt-2 text-sm text-indigo-soft">{text.mappedBody}</p>
      </section>

      <section className="mt-8">
        <h2 className="font-display text-3xl text-ink">{text.does}</h2>
        <ul className="mt-3 grid gap-2 text-sm text-ink">
          {text.doesItems.map((item) => (
            <li key={item} className="rounded-2xl border border-line bg-sheet px-4 py-3">
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="font-display text-3xl text-ink">{text.helps}</h2>
        <ul className="mt-3 grid gap-2 text-sm text-ink">
          {text.helpItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="font-display text-3xl text-ink">{text.not}</h2>
        <ul className="mt-3 grid gap-2 text-sm text-muted">
          {text.notItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <Link
        to="/stall/$code"
        params={{ code: "A1-04" }}
        className="mt-6 inline-flex h-12 items-center rounded-2xl border border-line bg-sheet px-4 text-sm font-semibold"
      >
        {text.stall}
      </Link>
    </main>
  );
}

function freshCode(marketId: string): string {
  const prefix = marketId.replace(/[^a-z0-9]/gi, "").slice(0, 2).toUpperCase() || "OJ";
  for (let n = 1; n < 90; n += 1) {
    const code = `${prefix}${String(n).padStart(2, "0")}`;
    if (!stallByCode(code)) return code;
  }
  return `${prefix}${Date.now().toString(36).slice(-3).toUpperCase()}`;
}

function AddStall({ lang }: { lang: "en" | "pg" | "yo" | "ig" | "ha" }) {
  const navigate = useNavigate();
  const registerStall = useMarket((state) => state.registerStall);
  const [marketId, setMarketId] = useState("balogun");
  const [business, setBusiness] = useState("");
  const [trader, setTrader] = useState("");
  const [phone, setPhone] = useState("");
  const [category, setCategory] = useState<CategoryId>("food");
  const [goods, setGoods] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState("");
  const pg = lang === "pg";

  function submit(event: FormEvent) {
    event.preventDefault();
    const tidy = tidyPhone(phone);
    const amount = Number(price.replace(/,/g, ""));
    if (business.trim().length < 2) {
      setError(pg ? "Add the stall name." : "Add the stall name.");
      return;
    }
    if (trader.trim().length < 2) {
      setError(pg ? "Add your name." : "Add your name.");
      return;
    }
    if (!tidy) {
      setError(pg ? "Use Nigerian number, like 0803 000 0000." : "Use a Nigerian mobile, like 0803 000 0000.");
      return;
    }
    if (goods.trim().length < 2 || !Number.isFinite(amount) || amount <= 0) {
      setError(pg ? "Add one product and the price." : "Add one product and a price in naira.");
      return;
    }
    const market = marketById(marketId);
    const code = freshCode(marketId);
    const stallNo = Number(code.replace(/\D/g, "").slice(-2)) || 1;
    const name = business.trim();
    const person = trader.trim();
    const item = goods.trim();
    const stall: Stall = {
      id: code.toLowerCase(),
      code,
      marketId,
      block: market.lanes ? "block-c" : marketId,
      row: 1,
      stallNo,
      business: name,
      trader: person,
      category,
      blurb: `${name} at ${market.name}.`,
      keywords: [name, person, item, market.name, marketId],
      languages: ["English", "Pidgin"],
      hours: "Mon–Sat, 8am–6pm",
      photo: market.photo,
      whatsapp: tidy,
      verified: "sample",
      lat: market.lat + 0.0003,
      lng: market.lng + 0.00025,
      shutter: {
        en: `Ask for ${person} and quote ${code}.`,
        pg: `Ask for ${person} and quote ${code}.`,
      },
      catalogue: [{ name: item, price: Math.round(amount), unit: "piece" }],
      note: {
        name: "Sample",
        text: "Added on this phone. Not a verified business.",
      },
    };
    registerStall(stall);
    void navigate({ to: "/stall/$code", params: { code }, hash: "owner" });
  }

  return (
    <form onSubmit={submit} className="mt-4 rounded-2xl border border-line bg-sheet p-4">
      <h2 className="font-display text-3xl text-ink">{pg ? "Add your stall" : "Add your stall"}</h2>
      <label className="mt-3 block text-sm font-medium">
        {pg ? "Market" : "Market"}
        <select
          value={marketId}
          onChange={(event) => setMarketId(event.target.value)}
          className="mt-1 h-12 w-full rounded-2xl border border-line bg-paper px-3 text-base"
        >
          {markets.map((market) => (
            <option key={market.id} value={market.id}>
              {market.name}
            </option>
          ))}
        </select>
      </label>
      <label className="mt-3 block text-sm font-medium">
        {pg ? "Stall name" : "Stall name"}
        <input
          value={business}
          onChange={(event) => setBusiness(event.target.value.slice(0, 48))}
          placeholder={pg ? "Mama Ngozi Provisions" : "Mama Ngozi Provisions"}
          className="mt-1 h-12 w-full rounded-2xl border border-line bg-paper px-3 text-base outline-none focus-visible:border-indigo"
        />
      </label>
      <label className="mt-3 block text-sm font-medium">
        {pg ? "Your name" : "Your name"}
        <input
          value={trader}
          onChange={(event) => setTrader(event.target.value.slice(0, 40))}
          className="mt-1 h-12 w-full rounded-2xl border border-line bg-paper px-3 text-base outline-none focus-visible:border-indigo"
        />
      </label>
      <label className="mt-3 block text-sm font-medium">
        {pg ? "Your mobile" : "Your mobile"}
        <input
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          inputMode="tel"
          placeholder="0803 000 0000"
          className="mt-1 h-12 w-full rounded-2xl border border-line bg-paper px-3 text-base outline-none focus-visible:border-indigo"
        />
      </label>
      <label className="mt-3 block text-sm font-medium">
        {pg ? "Wetin you dey sell" : "What you sell"}
        <select
          value={category}
          onChange={(event) => setCategory(event.target.value as CategoryId)}
          className="mt-1 h-12 w-full rounded-2xl border border-line bg-paper px-3 text-base"
        >
          {categories.map((item) => (
            <option key={item.id} value={item.id}>
              {item.label}
            </option>
          ))}
        </select>
      </label>
      <div className="mt-3 grid grid-cols-[1fr_7rem] gap-2">
        <input
          value={goods}
          onChange={(event) => setGoods(event.target.value.slice(0, 40))}
          placeholder={pg ? "Product" : "Product"}
          className="h-12 rounded-2xl border border-line bg-paper px-3 text-base outline-none focus-visible:border-indigo"
        />
        <input
          value={price}
          onChange={(event) => setPrice(event.target.value)}
          inputMode="numeric"
          placeholder={pg ? "Price" : "Price"}
          className="h-12 rounded-2xl border border-line bg-paper px-3 text-base outline-none focus-visible:border-indigo"
        />
      </div>
      {error ? <p className="mt-2 text-sm font-medium text-clay">{error}</p> : null}
      <button
        type="submit"
        className="mt-3 h-12 w-full rounded-2xl bg-clay text-sm font-semibold text-sheet"
      >
        {pg ? "Add the stall" : "Add the stall"}
      </button>
      <p className="mt-2 text-sm text-muted">
        {pg
          ? "E go get a stall code. E still be sample listing, no be verified business."
          : "You get a stall code. It stays a sample listing, not a verified business."}
      </p>
    </form>
  );
}
