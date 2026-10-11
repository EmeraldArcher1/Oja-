import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Bookmark, Clock, MessageCircle, Minus, Navigation, Plus, Share2 } from "lucide-react";
import { useEffect, useState } from "react";
import { OwnerDesk } from "@/components/owner-desk";
import { StreetMap } from "@/components/street-map";
import { marketById } from "@/data/lagos";
import {
  categoryLabel,
  minutesBetween,
  naira,
  orderTotal,
  placeById,
  spokenCode,
  stallByCode,
  t,
  ui,
  waLink,
} from "@/data/market";
import {
  deliveryQuote,
  listingLabel,
  localPhone,
  ojaToken,
  orderHref,
  orderMessage,
  orderRef,
  presentStall,
  showPhone,
  tidyPhone,
  type Job,
} from "@/data/trade";
import { cn } from "@/lib/cn";
import { sendEnquiry } from "@/lib/market/api";
import { useMarket } from "@/lib/market-store";

export const Route = createFileRoute("/stall/$code")({
  component: StallPage,
});

function StallPage() {
  const { code } = Route.useParams();
  const navigate = useNavigate();
  const stall = stallByCode(code);
  const hereId = useMarket((state) => state.hereId);
  const lang = useMarket((state) => state.lang);
  const saved = useMarket((state) => state.saved);
  const toggleSaved = useMarket((state) => state.toggleSaved);
  const override = useMarket((state) => (stall ? state.overrides[stall.id] : undefined));
  const placeJob = useMarket((state) => state.placeJob);
  const knownBuyer = useMarket((state) => state.buyer);
  const setBuyer = useMarket((state) => state.setBuyer);
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);
  const [qty, setQty] = useState<Record<string, number>>({});
  const [note, setNote] = useState("");
  const [buyerName, setBuyerName] = useState("");
  const [buyerPhone, setBuyerPhone] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [mode, setMode] = useState<"pickup" | "rider">("rider");
  const [formError, setFormError] = useState("");
  const [seeded, setSeeded] = useState(false);

  useEffect(() => {
    if (seeded || !knownBuyer) return;
    setBuyerName(knownBuyer.name);
    setBuyerPhone(localPhone(knownBuyer.phone));
    setSeeded(true);
  }, [knownBuyer, seeded]);

  if (!stall) {
    return (
      <main className="mx-auto max-w-xl px-4 py-10">
        <h1 className="font-display text-4xl text-ink">{t(ui.missing, lang)}</h1>
        <Link to="/" className="mt-4 inline-flex h-11 items-center font-semibold text-clay">
          {t(ui.backHome, lang)}
        </Link>
      </main>
    );
  }

  const found = stall;

  const block = placeById(stall.block);
  const market = marketById(stall.marketId ?? "balogun");
  const live = presentStall(stall, override);
  const isSaved = saved.includes(stall.id);
  const minutes = minutesBetween(hereId, stall);
  const lines = live.catalogue.map((item) => ({
    name: item.name,
    qty: qty[item.name] ?? 0,
    price: item.price,
    unit: item.unit,
  }));
  const count = lines.reduce((sum, line) => sum + line.qty, 0);
  const total = orderTotal(lines);

  function changeQty(name: string, next: number) {
    setQty((current) => ({ ...current, [name]: Math.max(0, Math.min(20, next)) }));
  }

  async function shareShop(current: NonNullable<typeof stall>) {
    const text = `${current.business} on Oja\nCode ${current.code} — ${spokenCode(current)}\nOrder: ${window.location.href}`;
    if (typeof navigator.share === "function") {
      try {
        await navigator.share({ title: current.business, text, url: window.location.href });
      } catch {
        // The buyer closed the share sheet.
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(text);
      setShared(true);
      window.setTimeout(() => setShared(false), 1600);
    } catch {
      setShared(false);
    }
  }

  async function placeOrder() {
    const buyer = tidyPhone(buyerPhone);
    if (!buyer) {
      setFormError("Enter the buyer’s Nigerian mobile so the trader and rider can call back.");
      return;
    }
    if (buyerName.trim().length < 2) {
      setFormError("Add the name the trader should ask for.");
      return;
    }
    if (mode === "rider" && dropoff.trim().length < 4) {
      setFormError("Where should the rider drop the order? A street or an estate is enough.");
      return;
    }
    const createdAt = Date.now();
    const token = ojaToken(total);
    const job: Job = {
      id: `job-${createdAt.toString(36)}`,
      ref: orderRef(found.code, createdAt),
      code: found.code,
      lines: lines.filter((line) => line.qty > 0),
      note,
      buyerName: buyerName.trim(),
      buyerPhone: buyer,
      dropoff: mode === "rider" ? dropoff.trim() : "",
      mode,
      status: "sent",
      goods: total,
      token,
      deliveryFee: deliveryQuote(mode),
      createdAt,
    };
    placeJob(job);
    setBuyer({ name: job.buyerName, phone: buyer });
    setFormError("");
    const basket = job.lines.map((line) => `${line.qty} × ${line.name}`).join(", ");
    if (live.phonePublic) {
      window.open(orderHref(live, orderMessage(live, job.lines, note, job)), "_blank", "noopener,noreferrer");
    } else {
      const result = await sendEnquiry({
        data: {
          stallCode: found.code,
          fromName: job.buyerName,
          fromContact: buyer,
          message: `${basket}. ${note}`.trim(),
        },
      });
      if (!result.ok) {
        setFormError(result.error);
        return;
      }
    }
    void navigate({ to: "/orders" });
  }

  async function copyCode() {
    const text = `Oja · ${market.name}\n${found.business}\n${spokenCode(found)}\nCode ${found.code}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <main className={count > 0 ? "mx-auto w-full max-w-3xl px-4 py-5 pb-36" : "mx-auto w-full max-w-3xl px-4 py-5"}>
      <p className="text-sm font-medium text-indigo">{market.area}</p>
      <div className="mt-1 flex items-start justify-between gap-3">
        <h1 className="font-display text-4xl text-ink sm:text-5xl">{stall.business}</h1>
        <button
          type="button"
          onClick={() => toggleSaved(stall.id)}
          className="grid size-11 shrink-0 place-items-center rounded-full border border-line bg-sheet text-indigo"
          aria-pressed={isSaved}
          aria-label={isSaved ? `Unsave ${stall.business}` : `Save ${stall.business}`}
        >
          <Bookmark className={cn("size-5", isSaved && "fill-indigo")} aria-hidden />
        </button>
      </div>
      <p className="mt-1 text-muted">
        {stall.trader} · {categoryLabel(stall.category)}
        {market.lanes ? ` · ${minutes} ${t(ui.minWalk, lang)}` : ""}
      </p>
      <p className="mt-2 inline-flex rounded-full border border-line px-3 py-1 text-sm font-medium text-muted">
        {listingLabel(live.verified)}
      </p>
      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
        <Link
          to="/market/$id"
          params={{ id: market.id }}
          className="text-sm font-semibold text-clay"
        >
          {market.name}
        </Link>
        <Link to="/open" search={{ kind: "ad", code: stall.code }} className="text-sm font-semibold text-indigo">
          Ad request
        </Link>
        <Link to="/open" search={{ kind: "export", code: stall.code }} className="text-sm font-semibold text-indigo">
          Export inquiry
        </Link>
      </div>

      <section className="mt-4 rounded-2xl bg-indigo px-5 py-5 text-sheet">
        <p className="text-xs font-semibold tracking-wide text-indigo-soft uppercase">Stall code</p>
        <p className="font-display text-5xl leading-none">{stall.code}</p>
        <p className="mt-2 text-base">{spokenCode(stall)}</p>
        <p className="mt-3 max-w-md text-sm text-indigo-soft">{t(ui.giveCode, lang)}</p>
        <button
          type="button"
          onClick={() => void copyCode()}
          className="mt-4 h-11 rounded-full border border-sheet/40 px-4 text-sm font-semibold"
        >
          {copied ? t(ui.copied, lang) : t(ui.copy, lang)}
        </button>
      </section>

      <div className="mt-3 grid grid-cols-2 gap-2">
        {market.lanes ? (
          <Link
            to="/walk/$code"
            params={{ code: stall.code }}
            className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-clay px-3 text-center text-sm font-semibold text-sheet"
          >
            <Navigation className="size-4" aria-hidden />
            {t(ui.walk, lang)}
          </Link>
        ) : (
          <a
            href="#shop"
            className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-clay px-3 text-center text-sm font-semibold text-sheet"
          >
            Order
          </a>
        )}
        <a
          href={live.phonePublic ? waLink({ ...stall, whatsapp: live.phone }) : "#shop"}
          target={live.phonePublic ? "_blank" : undefined}
          rel={live.phonePublic ? "noreferrer" : undefined}
          className="flex h-14 items-center justify-center gap-2 rounded-2xl border border-line bg-sheet px-3 text-center text-sm font-semibold text-ink"
        >
          <MessageCircle className="size-4" aria-hidden />
          <span>
            {live.phonePublic ? showPhone(live.phone) : "Enquiry"}
            <span className="block text-xs font-normal text-muted">
              {live.phonePublic ? t(ui.askOpen, lang) : "Number hidden"}
            </span>
          </span>
        </a>
      </div>

      <img
        src={live.photo}
        alt={stall.blurb}
        className="mt-3 aspect-video w-full rounded-2xl object-cover"
      />
      <div className="mt-3">
        <StreetMap lat={live.lat} lng={live.lng} label={stall.business} moved={live.movedNote} />
      </div>

      <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-3">
        <div className="rounded-2xl border border-line bg-sheet px-3 py-3">
          <dt className="flex items-center gap-1 text-muted">
            <Clock className="size-3.5" aria-hidden /> {t(ui.hours, lang)}
          </dt>
          <dd className="mt-1 font-medium">{stall.hours}</dd>
        </div>
        <div className="rounded-2xl border border-line bg-sheet px-3 py-3">
          <dt className="text-muted">{t(ui.languages, lang)}</dt>
          <dd className="mt-1 font-medium">{stall.languages.join(", ")}</dd>
        </div>
        <div className="rounded-2xl border border-line bg-sheet px-3 py-3">
          <dt className="text-muted">Market</dt>
          <dd className="mt-1 font-medium">{market.lanes ? block.name : market.name}</dd>
        </div>
      </dl>

      <section id="shop" className="mt-8">
        <div className="flex items-end justify-between gap-3">
          <h2 className="font-display text-3xl text-ink">{t(ui.shop, lang)}</h2>
          <button
            type="button"
            onClick={() => void shareShop(stall)}
            className="inline-flex h-11 shrink-0 items-center gap-1.5 rounded-full border border-line bg-sheet px-3 text-sm font-semibold text-indigo"
          >
            <Share2 className="size-4" aria-hidden />
            {shared ? t(ui.shopCopied, lang) : t(ui.shareShop, lang)}
          </button>
        </div>
        <p className="mt-1 text-sm text-muted">{t(ui.shopHelp, lang)}</p>
        <ul className="mt-3 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-sheet">
          {live.catalogue.map((item) => {
            const amount = qty[item.name] ?? 0;
            return (
              <li key={item.name} className="flex items-center justify-between gap-3 px-4 py-3">
                <span className="min-w-0">
                  <span className="block font-medium">{item.name}</span>
                  <span className="block text-sm text-muted">
                    <span className="tabular-nums">{naira(item.price)}</span>
                    <span> · {item.unit}</span>
                  </span>
                </span>
                {amount === 0 ? (
                  <button
                    type="button"
                    onClick={() => changeQty(item.name, 1)}
                    className="inline-flex h-11 shrink-0 items-center gap-1 rounded-full bg-indigo px-4 text-sm font-semibold text-sheet"
                  >
                    <Plus className="size-4" aria-hidden />
                    {t(ui.add, lang)}
                  </button>
                ) : (
                  <span className="flex shrink-0 items-center gap-1">
                    <button
                      type="button"
                      onClick={() => changeQty(item.name, amount - 1)}
                      className="grid size-11 place-items-center rounded-full border border-line text-ink"
                      aria-label={`Remove one ${item.name}`}
                    >
                      <Minus className="size-4" aria-hidden />
                    </button>
                    <span className="w-6 text-center font-semibold tabular-nums">{amount}</span>
                    <button
                      type="button"
                      onClick={() => changeQty(item.name, amount + 1)}
                      className="grid size-11 place-items-center rounded-full bg-indigo text-sheet"
                      aria-label={`Add one ${item.name}`}
                    >
                      <Plus className="size-4" aria-hidden />
                    </button>
                  </span>
                )}
              </li>
            );
          })}
        </ul>
        <label className="mt-3 block">
          <span className="text-sm font-medium text-ink">Your name</span>
          <input
            value={buyerName}
            onChange={(event) => setBuyerName(event.target.value.slice(0, 40))}
            placeholder="The name the trader should ask for"
            className="mt-1 h-12 w-full rounded-2xl border border-line bg-sheet px-3 text-base outline-none focus-visible:border-indigo"
          />
        </label>
        <label className="mt-3 block">
          <span className="text-sm font-medium text-ink">Your mobile</span>
          <input
            value={buyerPhone}
            onChange={(event) => setBuyerPhone(event.target.value)}
            inputMode="tel"
            placeholder="0803 000 0000"
            className="mt-1 h-12 w-full rounded-2xl border border-line bg-sheet px-3 text-base outline-none focus-visible:border-indigo"
          />
        </label>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setMode("rider")}
            className={cn(
              "h-11 rounded-full border text-sm font-semibold",
              mode === "rider" ? "border-indigo bg-indigo text-sheet" : "border-line bg-sheet",
            )}
          >
            Posh9ja rider
          </button>
          <button
            type="button"
            onClick={() => setMode("pickup")}
            className={cn(
              "h-11 rounded-full border text-sm font-semibold",
              mode === "pickup" ? "border-indigo bg-indigo text-sheet" : "border-line bg-sheet",
            )}
          >
            I’ll pick up
          </button>
        </div>
        {mode === "rider" ? (
          <label className="mt-3 block">
            <span className="text-sm font-medium text-ink">Where Posh9ja should drop it</span>
            <input
              value={dropoff}
              onChange={(event) => setDropoff(event.target.value.slice(0, 120))}
              placeholder="Estate, street, or junction"
              className="mt-1 h-12 w-full rounded-2xl border border-line bg-sheet px-3 text-base outline-none focus-visible:border-indigo"
            />
          </label>
        ) : null}
        <label className="mt-3 block">
          <span className="text-sm font-medium text-ink">{t(ui.orderNote, lang)}</span>
          <textarea
            value={note}
            onChange={(event) => setNote(event.target.value.slice(0, 180))}
            placeholder={t(ui.orderNotePlaceholder, lang)}
            rows={2}
            className="mt-1 w-full resize-none rounded-2xl border border-line bg-sheet px-3 py-3 text-base text-ink outline-none placeholder:text-muted focus-visible:border-indigo"
          />
        </label>
        {knownBuyer && tidyPhone(buyerPhone) === knownBuyer.phone ? (
          <p className="mt-2 text-sm font-medium text-indigo">Known buyer on this phone.</p>
        ) : (
          <p className="mt-2 text-sm text-muted">
            A Nigerian mobile is required so the trader can call back. Oja does not collect NIN.
          </p>
        )}
        {formError ? <p className="mt-2 text-sm font-medium text-clay">{formError}</p> : null}
        <p className="mt-2 text-sm text-muted">
          Sample price. Stock is not live. A 2% fee is proposed and is not charged. The trader’s number
          stays hidden unless they publish it.
          {mode === "rider"
            ? ` Posh9ja quotes ${naira(deliveryQuote("rider"))} separately, and that quote is not a booking.`
            : " Pickup has no delivery fee."}
        </p>
      </section>

      <section className="mt-8">
        <h2 className="font-display text-3xl text-ink">{t(ui.how, lang)}</h2>
        <p className="mt-2 text-ink">{t(stall.shutter, lang)}</p>
        {market.lanes ? (
          <Link
            to="/map"
            search={{ stall: stall.code }}
            className="mt-3 inline-flex h-11 items-center font-semibold text-indigo"
          >
            {t(ui.showMap, lang)}
          </Link>
        ) : null}
      </section>

      <OwnerDesk stall={stall} live={live} />

      <section className="mt-8 rounded-2xl border border-line bg-sheet p-4">
        <h2 className="text-xs font-semibold tracking-wide text-muted uppercase">{t(ui.note, lang)}</h2>
        <p className="mt-2 text-sm text-muted">Written for the pilot. This is not a customer review.</p>
        <p className="mt-2 text-ink">{stall.note.text}</p>
        <p className="mt-2 text-sm text-muted">Sample name, not a customer: {stall.note.name}</p>
      </section>
      {count > 0 ? (
        <div className="fixed inset-x-0 bottom-16 z-20 border-t border-line bg-sheet px-4 py-3 lg:bottom-0">
          <div className="mx-auto flex w-full max-w-3xl items-center gap-3">
            <div className="min-w-0">
              <p className="text-xs text-muted">
                {count} · {t(ui.total, lang)}
              </p>
              <p className="font-display text-2xl leading-none tabular-nums text-ink">{naira(total)}</p>
            </div>
            <button
              type="button"
              onClick={placeOrder}
              className="ml-auto inline-flex h-12 items-center gap-2 rounded-2xl bg-clay px-4 text-sm font-semibold text-sheet"
            >
              <MessageCircle className="size-4" aria-hidden />
              {t(ui.sendOrder, lang)}
            </button>
          </div>
          <p className="mx-auto mt-1 max-w-3xl text-xs text-muted">{t(ui.sampleOrder, lang)}</p>
        </div>
      ) : null}
    </main>
  );
}
