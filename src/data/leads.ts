export type LeadKind = "ad" | "export" | "partner";

export type Lead = {
  id: string;
  kind: LeadKind;
  name: string;
  phone: string;
  subject: string;
  note: string;
  code: string;
  createdAt: number;
};

export function loosePhone(input: string): string | null {
  const digits = input.replace(/\D/g, "");
  if (digits.length < 8 || digits.length > 15) return null;
  return digits;
}

export function leadText(lead: Lead): string {
  const title =
    lead.kind === "ad"
      ? "Advertising request"
      : lead.kind === "export"
        ? "Export inquiry"
        : "Financial services partnership";
  return [
    `Oja · ${title}`,
    lead.name,
    lead.phone,
    lead.code ? `Stall ${lead.code}` : "",
    lead.subject,
    lead.note,
    "Not a live campaign, shipment, or approved partnership.",
  ]
    .filter(Boolean)
    .join("\n");
}
