import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { naira, stallByCode } from "@/data/market";
import {
  deliveryQuote,
  googlePin,
  jobDone,
  orderHref,
  orderMessage,
  orderRef,
  presentStall,
  showPhone,
  traderKeeps,
  type Job,
} from "@/data/trade";
import { useMarket } from "@/lib/market-store";

export const Route = createFileRoute("/orders")({
  component: OrdersPage,
});

const stepName: Record<Job["status"], string> = {
  sent: "Waiting on the trader",
  accepted: "Ready for collection",
  collected: "With Posh9ja",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

function OrdersPage() {
  const jobs = useMarket((state) => state.jobs);
  const tokens = useMarket((state) => state.tokens);
  const overrides = useMarket((state) => state.overrides);
  const open = jobs.filter((job) => job.status !== "cancelled" && !jobDone(job)).length;

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-5">
      <p className="text-sm font-medium text-indigo">Posh9ja desk</p>
      <h1 className="mt-1 font-display text-4xl text-ink">Orders</h1>
      <p className="mt-2 max-w-xl text-muted">
        A rider collects with the order reference. The trader confirms the goods first. Posh9ja notes
        the parcel, then records who received it. Oja’s 2% is written down only then.
      </p>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <p className="rounded-2xl bg-indigo px-4 py-4 text-sheet">
          <span className="block text-xs font-semibold tracking-wide text-indigo-soft uppercase">
            Commission recorded
          </span>
          <span className="font-display text-4xl leading-none">{naira(tokens)}</span>
        </p>
        <p className="rounded-2xl border border-line bg-sheet px-4 py-4">
          <span className="block text-xs font-semibold tracking-wide text-muted uppercase">Open jobs</span>
          <span className="font-display text-4xl leading-none text-ink">{open}</span>
        </p>
      </div>
      {jobs.length === 0 ? (
        <p className="mt-6 rounded-2xl border border-dashed border-line bg-sheet px-4 py-6 text-muted">
          No orders yet. Add products on a stall, leave a phone number, and send it.
        </p>
      ) : (
        <ul className="mt-5 grid gap-3">
          {jobs.map((job) => {
            const stall = stallByCode(job.code);
            const live = stall ? presentStall(stall, overrides[stall.id]) : null;
            return <DeskJob key={job.id} job={job} stallName={stall?.business ?? "Stall"} live={live} />;
          })}
        </ul>
      )}
      <section className="mt-8 rounded-2xl border border-line bg-sheet p-4 text-sm text-muted">
        <h2 className="font-display text-2xl text-ink">Pilot rules</h2>
        <ul className="mt-3 grid gap-2">
          <li>Every stall here is a sample. “Sample listing” is not a verification record.</li>
          <li>Oja’s commission is 2% of the goods, at least ₦100, and only after delivery. It is not profit.</li>
          <li>Posh9ja’s delivery quote is separate. The buyer pays it on top. Pickup is free.</li>
          <li>Cancel before collection and no commission is recorded.</li>
          <li>No live payment, refund, or bank settlement runs in this pilot.</li>
        </ul>
      </section>
    </main>
  );
}

function DeskJob({
  job,
  stallName,
  live,
}: {
  job: Job;
  stallName: string;
  live: ReturnType<typeof presentStall> | null;
}) {
  const patchJob = useMarket((state) => state.patchJob);
  const [parcel, setParcel] = useState("");
  const [pod, setPod] = useState("");
  const [error, setError] = useState("");
  const ref = job.ref ?? orderRef(job.code, job.createdAt);
  const fee = job.deliveryFee ?? deliveryQuote(job.mode);
  const stall = stallByCode(job.code);
  const done = jobDone(job);

  function confirmTrader() {
    patchJob(job.id, { status: "accepted" });
    setError("");
  }

  function collect() {
    if (parcel.trim().length < 4) {
      setError("Note the parcel. Sealed, count, or what is missing.");
      return;
    }
    patchJob(job.id, { status: "collected", parcel: parcel.trim() });
    setError("");
  }

  function deliver() {
    if (pod.trim().length < 2) {
      setError("Write who received the parcel.");
      return;
    }
    patchJob(job.id, { status: "delivered", pod: pod.trim() });
    setError("");
  }

  function buyerTookIt() {
    if (pod.trim().length < 2) {
      setError("Write the buyer’s name as they collected it.");
      return;
    }
    patchJob(job.id, { status: "collected", pod: pod.trim(), parcel: "Buyer collected at the stall" });
    setError("");
  }

  return (
    <li className="rounded-2xl border border-line bg-sheet p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-display text-2xl leading-none text-indigo">{ref}</p>
          <p className="mt-1 font-semibold">{stallName}</p>
          <p className="text-sm text-muted">Stall {job.code}</p>
          <p className="text-sm text-ink">{stepName[job.status]}</p>
        </div>
        <p className="text-right text-sm">
          <span className="block font-semibold tabular-nums">{naira(job.goods)} goods</span>
          <span className="block text-muted">Oja 2% {naira(job.token)}</span>
          <span className="block text-muted">Trader keeps {naira(traderKeeps(job.goods, job.token))}</span>
          <span className="block text-muted">{fee > 0 ? `Posh9ja ${naira(fee)}` : "No delivery fee"}</span>
        </p>
      </div>
      <ul className="mt-3 text-sm">
        {job.lines.map((line) => (
          <li key={line.name}>
            {line.qty} × {line.name}
          </li>
        ))}
      </ul>
      <p className="mt-2 text-sm">
        {job.buyerName || "Buyer"} · {showPhone(job.buyerPhone)}
      </p>
      {job.mode === "rider" ? <p className="text-sm text-muted">Drop-off: {job.dropoff}</p> : null}
      {live ? <p className="text-sm text-muted">Stall line: {showPhone(live.phone)}</p> : null}
      {job.parcel ? <p className="mt-2 text-sm">Parcel: {job.parcel}</p> : null}
      {job.pod ? <p className="text-sm">Received by {job.pod}</p> : null}
      {error ? <p className="mt-2 text-sm font-medium text-clay">{error}</p> : null}

      {job.status === "accepted" && job.mode === "rider" ? (
        <label className="mt-3 block text-sm font-medium">
          Parcel at handover
          <input
            value={parcel}
            onChange={(event) => setParcel(event.target.value.slice(0, 120))}
            placeholder="2 yams, sack tied"
            className="mt-1 h-11 w-full rounded-2xl border border-line bg-paper px-3 text-base font-normal outline-none focus-visible:border-indigo"
          />
        </label>
      ) : null}
      {((job.status === "collected" && job.mode === "rider") ||
        (job.status === "sent" && job.mode === "pickup")) && (
        <label className="mt-3 block text-sm font-medium">
          {job.mode === "pickup" ? "Buyer who collected it" : "Who received it"}
          <input
            value={pod}
            onChange={(event) => setPod(event.target.value.slice(0, 80))}
            placeholder="Name at the door"
            className="mt-1 h-11 w-full rounded-2xl border border-line bg-paper px-3 text-base font-normal outline-none focus-visible:border-indigo"
          />
        </label>
      )}

      <div className="mt-3 flex flex-wrap gap-2">
        {stall ? (
          <Link
            to="/stall/$code"
            params={{ code: stall.code }}
            className="inline-flex h-11 items-center rounded-full border border-line px-4 text-sm font-semibold"
          >
            Stall
          </Link>
        ) : null}
        {live ? (
          <a
            href={googlePin(live.lat, live.lng)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-11 items-center rounded-full border border-line px-4 text-sm font-semibold"
          >
            Locate
          </a>
        ) : null}
        {live ? (
          <a
            href={orderHref(live, orderMessage(live, job.lines, job.note, job))}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-11 items-center rounded-full bg-indigo px-4 text-sm font-semibold text-sheet"
          >
            WhatsApp
          </a>
        ) : null}
        {job.status === "sent" && job.mode === "rider" ? (
          <button
            type="button"
            onClick={confirmTrader}
            className="inline-flex h-11 items-center rounded-full bg-clay px-4 text-sm font-semibold text-sheet"
          >
            Trader confirms
          </button>
        ) : null}
        {job.status === "accepted" && job.mode === "rider" ? (
          <button
            type="button"
            onClick={collect}
            className="inline-flex h-11 items-center rounded-full bg-clay px-4 text-sm font-semibold text-sheet"
          >
            Collected
          </button>
        ) : null}
        {job.status === "collected" && job.mode === "rider" ? (
          <button
            type="button"
            onClick={deliver}
            className="inline-flex h-11 items-center rounded-full bg-clay px-4 text-sm font-semibold text-sheet"
          >
            Proof of delivery
          </button>
        ) : null}
        {job.status === "sent" && job.mode === "pickup" ? (
          <button
            type="button"
            onClick={buyerTookIt}
            className="inline-flex h-11 items-center rounded-full bg-clay px-4 text-sm font-semibold text-sheet"
          >
            Buyer collected it
          </button>
        ) : null}
        {!done && job.status !== "cancelled" && job.status !== "collected" ? (
          <button
            type="button"
            onClick={() => patchJob(job.id, { status: "cancelled" })}
            className="inline-flex h-11 items-center rounded-full border border-line px-4 text-sm font-semibold"
          >
            Cancel
          </button>
        ) : null}
        {done ? <span className="inline-flex h-11 items-center text-sm font-semibold text-indigo">Commission recorded</span> : null}
      </div>
    </li>
  );
}