export type TrustTier = "individual" | "location" | "business" | "product";
export type TrustState = "not_checked" | "pending";

export const trustTiers: { id: TrustTier; title: string; detail: string }[] = [
  {
    id: "individual",
    title: "Person",
    detail: "NIN and BVN are not checked. A phone number on file is not this tier.",
  },
  {
    id: "location",
    title: "Stall",
    detail: "No shopfront photo, geotag, or agent visit is recorded.",
  },
  {
    id: "business",
    title: "CAC",
    detail: "A reference can sit as pending. Oja does not call the CAC registry.",
  },
  {
    id: "product",
    title: "NAFDAC",
    detail: "A number can sit as a product-record request. It does not prove the goods in hand.",
  },
];

/** No tier can become verified in this build. Pending is a queue, not a badge. */
export function tierBoard(input: { cacPending: boolean; nafdacPending: boolean }): { id: TrustTier; state: TrustState }[] {
  return [
    { id: "individual", state: "not_checked" },
    { id: "location", state: "not_checked" },
    { id: "business", state: input.cacPending ? "pending" : "not_checked" },
    { id: "product", state: input.nafdacPending ? "pending" : "not_checked" },
  ];
}

export function anyTierVerified(): false {
  return false;
}

/** Proposed only. Charging stays off until payments, refunds, and settlement exist. */
export const proposedFee = { rate: 0.02, minimumNaira: 100, active: false as const };

export function feeCharged(_goodsNaira: number): 0 {
  return 0;
}

/** A campaign that is not live must not look like an advert. A live one must say Sponsored. */
export function sponsorMark(live: boolean): "Sponsored" | null {
  return live ? "Sponsored" : null;
}
