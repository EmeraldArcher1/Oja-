import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { z } from "zod";
import { leadText, loosePhone, type Lead, type LeadKind } from "@/data/leads";
import { tidyPhone } from "@/data/trade";
import { saveOpenRequest } from "@/lib/market/api";
import { useMarket } from "@/lib/market-store";

const searchSchema = z.object({
  kind: z.enum(["ad", "export", "partner"]).optional(),
  code: z.string().optional(),
});

export const Route = createFileRoute("/open")({
  validateSearch: searchSchema,
  component: OpenPage,
});

const kinds: LeadKind[] = ["ad", "export", "partner"];

const copy = {
  en: {
    kicker: "Open desk",
    title: "Advertise, export, or partner",
    lede: "Send a request. Oja stores it for the desk. Nothing here starts a live advert, a shipment, or a bank account.",
    ad: "Advertise",
    export: "Export",
    partner: "Partner",
    name: "Your name",
    company: "Company",
    phone: "Mobile",
    code: "Stall code",
    offer: "What should buyers see?",
    goods: "What should be exported?",
    pitch: "What do you want to offer traders?",
    note: "Note",
    save: "Save the request",
    saved: "Saved for the Oja desk",
    copy: "Copy",
    copied: "Copied",
    empty: "No requests yet.",
    list: "Also kept on this phone",
    warn: "A financial partner is not approved by this form. Oja does not take deposits or move money.",
  },
  pg: {
    kicker: "Open desk",
    title: "Advertise, export, or partner",
    lede: "Send request. Oja go store am for desk. Nothing here go start live advert, shipment, or bank account.",
    ad: "Advertise",
    export: "Export",
    partner: "Partner",
    name: "Your name",
    company: "Company",
    phone: "Mobile",
    code: "Stall code",
    offer: "Wetin buyer suppose see?",
    goods: "Wetin you wan export?",
    pitch: "Wetin you wan offer traders?",
    note: "Note",
    save: "Save the request",
    saved: "E don save for Oja desk",
    copy: "Copy",
    copied: "Copied",
    empty: "No request yet.",
    list: "Request wey dey this phone",
    warn: "Financial partner no approve by this form. Oja no dey collect deposit or move money.",
  },
} as const;

function OpenPage() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const lang = useMarket((state) => state.lang);
  const leads = useMarket((state) => state.leads) ?? [];
  const text = lang === "pg" ? copy.pg : copy.en;
  const kind = search.kind ?? "ad";

  return (
    <main className="mx-auto w-full max-w-xl px-4 py-5">
      <p className="text-sm font-medium text-indigo">{text.kicker}</p>
      <h1 className="mt-1 font-display text-4xl text-ink">{text.title}</h1>
      <p className="mt-2 text-muted">{text.lede}</p>
      <div className="mt-4 grid grid-cols-3 gap-2">
        {kinds.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => void navigate({ search: { kind: item, code: search.code } })}
            className={
              kind === item
                ? "h-11 rounded-full bg-indigo text-sm font-semibold text-sheet"
                : "h-11 rounded-full border border-line bg-sheet text-sm font-semibold"
            }
          >
            {text[item]}
          </button>
        ))}
      </div>
      <LeadForm key={`${kind}-${search.code ?? ""}`} kind={kind} code={search.code ?? ""} />
      {kind === "partner" ? <p className="mt-3 text-sm text-muted">{text.warn}</p> : null}
      <section className="mt-8">
        <h2 className="font-display text-3xl text-ink">{text.list}</h2>
        {leads.length === 0 ? <p className="mt-2 text-sm text-muted">{text.empty}</p> : null}
        <ul className="mt-3 grid gap-2">
          {leads.map((lead) => (
            <LeadRow key={lead.id} lead={lead} />
          ))}
        </ul>
      </section>
    </main>
  );
}

function LeadForm({ kind, code }: { kind: LeadKind; code: string }) {
  const lang = useMarket((state) => state.lang);
  const addLead = useMarket((state) => state.addLead);
  const text = lang === "pg" ? copy.pg : copy.en;
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [stallCode, setStallCode] = useState(code);
  const [subject, setSubject] = useState(kind === "partner" ? "Payments" : "");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    const local = kind === "export" ? loosePhone(phone) : tidyPhone(phone);
    if (name.trim().length < 2) {
      setError("Add a name.");
      return;
    }
    if (!local) {
      setError(kind === "export" ? "Add a phone number, including the country code." : "Use a Nigerian mobile, like 0803 000 0000.");
      return;
    }
    if (kind === "partner" && note.trim().length < 4) {
      setError("Say what you want to offer.");
      return;
    }
    if (kind !== "partner" && subject.trim().length < 2) {
      setError("Add what this request is about.");
      return;
    }
    const lead: Lead = {
      id: `lead-${Date.now().toString(36)}`,
      kind,
      name: name.trim(),
      phone: local,
      subject: subject.trim(),
      note: note.trim(),
      code: stallCode.trim().toUpperCase(),
      createdAt: Date.now(),
    };
    addLead(lead);
    const saved = await saveOpenRequest({
      data: {
        kind,
        name: lead.name,
        phone: lead.phone,
        stallCode: lead.code,
        subject: lead.subject,
        note: lead.note,
      },
    });
    if (!saved.ok) {
      setError(saved.error);
      return;
    }
    setDone(true);
    setError("");
    setNote("");
  }

  const subjectLabel = kind === "ad" ? text.offer : kind === "export" ? text.goods : text.pitch;

  return (
    <form onSubmit={(event) => void submit(event)} className="mt-4 rounded-2xl border border-line bg-sheet p-4">
      <label className="block text-sm font-medium">
        {kind === "partner" ? text.company : text.name}
        <input
          value={name}
          onChange={(event) => setName(event.target.value.slice(0, 60))}
          className="mt-1 h-12 w-full rounded-2xl border border-line bg-paper px-3 text-base outline-none focus-visible:border-indigo"
        />
      </label>
      <label className="mt-3 block text-sm font-medium">
        {text.phone}
        <input
          value={phone}
          onChange={(event) => setPhone(event.target.value.slice(0, 20))}
          inputMode="tel"
          placeholder={kind === "export" ? "+44 7700 900000" : "0803 000 0000"}
          className="mt-1 h-12 w-full rounded-2xl border border-line bg-paper px-3 text-base outline-none focus-visible:border-indigo"
        />
      </label>
      {kind !== "partner" ? (
        <label className="mt-3 block text-sm font-medium">
          {text.code}
          <input
            value={stallCode}
            onChange={(event) => setStallCode(event.target.value.slice(0, 16))}
            placeholder="A1-04"
            className="mt-1 h-12 w-full rounded-2xl border border-line bg-paper px-3 text-base outline-none focus-visible:border-indigo"
          />
        </label>
      ) : (
        <div className="mt-3 flex flex-wrap gap-2">
          {["Bank", "Payments", "Microfinance", "Insurance"].map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setSubject(item)}
              className={
                subject === item
                  ? "h-10 rounded-full bg-clay px-3 text-sm font-semibold text-sheet"
                  : "h-10 rounded-full border border-line px-3 text-sm font-semibold"
              }
            >
              {item}
            </button>
          ))}
        </div>
      )}
      <label className="mt-3 block text-sm font-medium">
        {subjectLabel}
        <textarea
          value={kind === "partner" ? note : subject}
          onChange={(event) =>
            kind === "partner" ? setNote(event.target.value.slice(0, 180)) : setSubject(event.target.value.slice(0, 80))
          }
          rows={2}
          className="mt-1 w-full resize-none rounded-2xl border border-line bg-paper px-3 py-3 text-base outline-none focus-visible:border-indigo"
        />
      </label>
      {kind !== "partner" ? (
        <label className="mt-3 block text-sm font-medium">
          {text.note}
          <input
            value={note}
            onChange={(event) => setNote(event.target.value.slice(0, 140))}
            className="mt-1 h-12 w-full rounded-2xl border border-line bg-paper px-3 text-base outline-none focus-visible:border-indigo"
          />
        </label>
      ) : null}
      {error ? <p className="mt-2 text-sm font-medium text-clay">{error}</p> : null}
      {done ? <p className="mt-2 text-sm font-medium text-indigo">{text.saved}</p> : null}
      <button type="submit" className="mt-3 h-12 w-full rounded-2xl bg-clay text-sm font-semibold text-sheet">
        {text.save}
      </button>
    </form>
  );
}

function LeadRow({ lead }: { lead: Lead }) {
  const lang = useMarket((state) => state.lang);
  const text = lang === "pg" ? copy.pg : copy.en;
  const [copied, setCopied] = useState(false);
  const label = lead.kind === "ad" ? text.ad : lead.kind === "export" ? text.export : text.partner;

  async function copyLead() {
    try {
      await navigator.clipboard.writeText(leadText(lead));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      setCopied(false);
    }
  }

  return (
    <li className="rounded-2xl border border-line bg-sheet px-4 py-3">
      <p className="text-sm font-semibold text-indigo">{label}</p>
      <p className="font-medium">{lead.name}</p>
      <p className="text-sm text-muted">
        {lead.subject}
        {lead.code ? ` · ${lead.code}` : ""}
      </p>
      {lead.note ? <p className="text-sm text-muted">{lead.note}</p> : null}
      <button type="button" onClick={() => void copyLead()} className="mt-2 text-sm font-semibold text-clay">
        {copied ? text.copied : text.copy}
      </button>
    </li>
  );
}
