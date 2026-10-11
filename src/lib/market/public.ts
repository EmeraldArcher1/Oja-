/** What a buyer is allowed to see. Phone is omitted unless the owner published it. */
export type PublicBusiness = {
  id: string;
  name: string;
  trader: string;
  marketId: string;
  lga: string;
  category: string;
  about: string;
  stallCode: string;
  phone: string | null;
  plan: string;
  identityStatus: "unverified" | "pending";
};

export function toPublicBusiness(row: {
  id: string;
  name: string;
  trader: string;
  market_id: string;
  lga?: string;
  category: string;
  about: string;
  stall_code: string;
  phone: string;
  phone_public: boolean;
  plan: string;
  identity_status: "unverified" | "pending";
}): PublicBusiness {
  return {
    id: row.id,
    name: row.name,
    trader: row.trader,
    marketId: row.market_id,
    lga: row.lga ?? "",
    category: row.category,
    about: row.about,
    stallCode: row.stall_code,
    phone: row.phone_public ? row.phone : null,
    plan: row.plan,
    identityStatus: row.identity_status,
  };
}

/** Paying or advertising does not verify a business. */
export function identityAfterPayment(): "unverified" {
  return "unverified";
}

/** A CAC file can be queued. A NAFDAC number is a product-record request, not identity. */
export function nextIdentityStatus(
  current: "unverified" | "pending",
  kind: "cac" | "nafdac",
): "unverified" | "pending" {
  if (kind === "cac") return "pending";
  return current;
}
