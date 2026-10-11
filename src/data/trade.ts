import { basePin, marketById } from "@/data/lagos";
import { naira, orderTotal, spokenCode, type CatalogueItem, type OrderLine, type Stall } from "@/data/market";

export type VerifyState = "sample" | "pending";

export type StallOverride = {
  phone?: string;
  photo?: string;
  lat?: number;
  lng?: number;
  movedNote?: string;
  catalogue?: CatalogueItem[];
  verify?: VerifyState;
  slip?: string;
};

export type JobMode = "pickup" | "rider";
export type JobStatus = "sent" | "accepted" | "collected" | "delivered" | "cancelled";

export type Job = {
  id: string;
  code: string;
  lines: OrderLine[];
  note: string;
  buyerName: string;
  buyerPhone: string;
  dropoff: string;
  mode: JobMode;
  status: JobStatus;
  goods: number;
  token: number;
  deliveryFee?: number;
  ref?: string;
  parcel?: string;
  pod?: string;
  createdAt: number;
};

export const TOKEN_RATE = 0.02;
export const DELIVERY_FEE = 2500;

export function ojaToken(goods: number): number {
  return Math.max(100, Math.round(goods * TOKEN_RATE));
}

export function deliveryQuote(mode: JobMode): number {
  return mode === "rider" ? DELIVERY_FEE : 0;
}

export function traderKeeps(goods: number, token: number): number {
  return Math.max(0, goods - token);
}

export function jobDone(job: Pick<Job, "status" | "mode">): boolean {
  if (job.status === "cancelled") return false;
  return job.mode === "pickup"
    ? job.status === "collected" || job.status === "delivered"
    : job.status === "delivered";
}

export function orderRef(code: string, at: number): string {
  return `OJA-${code}-${at.toString(36).toUpperCase().slice(-4)}`;
}

export function listingLabel(state: VerifyState): string {
  return state === "pending" ? "Check requested · still a sample" : "Sample listing";
}

export function tidyPhone(input: string): string | null {
  let digits = input.replace(/\D/g, "");
  if (digits.startsWith("234")) digits = `0${digits.slice(3)}`;
  if (!/^0[7-9][01]\d{8}$/.test(digits)) return null;
  return `234${digits.slice(1)}`;
}

export function localPhone(value: string): string {
  const tidy = tidyPhone(value);
  if (!tidy) return "";
  return `0${tidy.slice(3)}`;
}
export function showPhone(value: string): string {
  const tidy = tidyPhone(value) ?? value.replace(/\D/g, "");
  if (tidy.startsWith("234") && tidy.length === 13) {
    return `+234 ${tidy.slice(3, 6)} ${tidy.slice(6, 9)} ${tidy.slice(9)}`;
  }
  return value;
}

export function googlePin(lat: number, lng: number): string {
  return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
}

export function osmEmbed(lat: number, lng: number): string {
  const span = 0.004;
  const bbox = [lng - span, lat - span, lng + span, lat + span].join("%2C");
  return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lng}`;
}

export type LiveStall = Stall & {
  marketId: string;
  phone: string;
  lat: number;
  lng: number;
  verified: VerifyState;
  movedNote?: string;
};

export function presentStall(stall: Stall, override?: StallOverride): LiveStall {
  const pin = basePin(stall);
  return {
    ...stall,
    marketId: stall.marketId ?? "balogun",
    phone: override?.phone || stall.whatsapp,
    photo: override?.photo || stall.photo,
    catalogue: override?.catalogue ?? stall.catalogue,
    lat: override?.lat ?? pin.lat,
    lng: override?.lng ?? pin.lng,
    verified: override?.verify === "pending" || stall.verified === "pending" ? "pending" : "sample",
    movedNote: override?.movedNote,
  };
}

export function orderMessage(
  stall: LiveStall,
  lines: OrderLine[],
  note: string,
  job: Pick<Job, "buyerName" | "buyerPhone" | "dropoff" | "mode" | "token" | "ref" | "deliveryFee">,
): string {
  const chosen = lines.filter((line) => line.qty > 0);
  const market = marketById(stall.marketId);
  const rows = chosen.map(
    (line) => `${line.qty} × ${line.name} (${line.unit}) — ${naira(line.price * line.qty)}`,
  );
  const parts = [
    `Hello ${stall.trader}, order from Oja.`,
    "",
    `Order ${job.ref}`,
    stall.business,
    `Code ${stall.code} — ${spokenCode(stall)}`,
    market.name,
    `Pin: ${stall.lat.toFixed(5)}, ${stall.lng.toFixed(5)}`,
    "",
    ...rows,
    "",
    `Goods: ${naira(orderTotal(chosen))}`,
    `Oja commission if delivered: ${naira(job.token)} (2% of the goods, at least ₦100). Not profit, and not the delivery fee.`,
    job.mode === "rider"
      ? `Posh9ja delivery quote: ${naira(job.deliveryFee ?? 0)}. Charged separately from the 2%.`
      : "Pickup at the stall. No Posh9ja delivery fee.",
    "",
    `Buyer: ${job.buyerName || "Customer"} · ${showPhone(job.buyerPhone)}`,
  ];
  if (job.mode === "rider") {
    parts.push(`Dispatch a rider. Drop-off: ${job.dropoff}`);
  } else {
    parts.push("I will pick up at the stall.");
  }
  const trimmed = note.trim();
  if (trimmed) parts.push(`Note: ${trimmed}`);
  parts.push("", "Please confirm it is available.");
  return parts.join("\n");
}

export function orderHref(stall: LiveStall, message: string): string {
  return `https://wa.me/${stall.phone}?text=${encodeURIComponent(message)}`;
}
