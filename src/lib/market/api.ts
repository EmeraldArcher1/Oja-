import { createHash, randomBytes } from "node:crypto";
import { createServerFn } from "@tanstack/react-start";
import { markets } from "@/data/lagos";
import { isStateId } from "@/data/nigeria";
import { lgasIn } from "@/data/lgas";
import { categories } from "@/data/market";
import { tidyPhone } from "@/data/trade";
import { getSql } from "@/lib/db";
import { hashPassword, verifyPassword } from "@/lib/market/passwords";
import { toPublicBusiness, nextIdentityStatus, type PublicBusiness } from "@/lib/market/public";

export type { PublicBusiness };

const COOKIE = "oja_session";
const marketIds = new Set(markets.map((market) => market.id));
const categoryIds = new Set(categories.map((item) => item.id));

type BusinessRow = {
  id: string;
  name: string;
  trader: string;
  market_id: string;
  lga: string;
  category: string;
  about: string;
  stall_code: string;
  phone: string;
  phone_public: boolean;
  plan: string;
  identity_status: "unverified" | "pending";
};

export type RegisterInput = {
  email: string;
  password: string;
  name: string;
  trader: string;
  marketId: string;
  lga: string;
  category: string;
  stallCode: string;
  phone: string;
  about: string;
};

export type Result<T> = { ok: true; data: T } | { ok: false; error: string };

function newId(prefix: string): string {
  return `${prefix}_${randomBytes(8).toString("hex")}`;
}

function tokenHash(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

async function readAccountId(): Promise<string | null> {
  const { getCookie } = await import("@tanstack/react-start/server");
  const token = getCookie(COOKIE);
  if (!token) return null;
  const sql = await getSql();
  const rows = await sql<{ account_id: string }>`
    select account_id from market_sessions
    where token_hash = ${tokenHash(token)} and expires_at > now()
  `;
  return rows[0]?.account_id ?? null;
}

async function writeSession(accountId: string) {
  const token = randomBytes(32).toString("hex");
  const sql = await getSql();
  await sql`
    insert into market_sessions (token_hash, account_id, expires_at)
    values (${tokenHash(token)}, ${accountId}, now() + interval '30 days')
  `;
  const { setCookie } = await import("@tanstack/react-start/server");
  setCookie(COOKIE, token, {
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
  });
}

async function businessByAccount(accountId: string): Promise<BusinessRow | null> {
  const sql = await getSql();
  const rows = await sql<BusinessRow>`select * from businesses where account_id = ${accountId}`;
  return rows[0] ?? null;
}

export const registerBusiness = createServerFn({ method: "POST" })
  .inputValidator((data: RegisterInput) => data)
  .handler(async ({ data }): Promise<Result<PublicBusiness>> => {
    const email = data.email.trim().toLowerCase();
    const phone = tidyPhone(data.phone);
    const stallCode = data.stallCode.trim().toUpperCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { ok: false, error: "Enter a real email." };
    if (data.password.length < 8) return { ok: false, error: "Use a password of at least 8 characters." };
    if (data.name.trim().length < 2 || data.trader.trim().length < 2) {
      return { ok: false, error: "Add the business name and your name." };
    }
    const lga = data.lga.trim();
    const stateKey = isStateId(data.marketId) ? data.marketId : "lagos";
    if (!lgasIn(stateKey).includes(lga)) {
      return { ok: false, error: "Choose a local government in that state." };
    }
    if (!marketIds.has(data.marketId) && !isStateId(data.marketId)) {
      return { ok: false, error: "Choose a state or a Lagos market." };
    }
    if (!categoryIds.has(data.category as (typeof categories)[number]["id"])) {
      return { ok: false, error: "Choose what you sell." };
    }
    if (!/^[A-Z0-9-]{2,12}$/.test(stallCode)) return { ok: false, error: "Stall code should look like BA01." };
    if (data.phone.trim() && !phone) {
      return { ok: false, error: "Use a Nigerian mobile, or leave it blank. You sign up with your email." };
    }
    const sql = await getSql();
    const existing = await sql<{ id: string }>`select id from market_accounts where email = ${email}`;
    if (existing.length > 0) return { ok: false, error: "That email is already registered." };
    const taken = await sql<{ id: string }>`select id from businesses where stall_code = ${stallCode}`;
    if (taken.length > 0) return { ok: false, error: "That stall code is already registered." };
    const accountId = newId("acc");
    const businessId = newId("biz");
    const passwordHash = await hashPassword(data.password);
    await sql`
      insert into market_accounts (id, email, password_hash)
      values (${accountId}, ${email}, ${passwordHash})
    `;
    await sql`
      insert into businesses (
        id, account_id, name, trader, market_id, lga, category, about, stall_code, phone
      ) values (
        ${businessId}, ${accountId}, ${data.name.trim()}, ${data.trader.trim()},
        ${data.marketId}, ${lga}, ${data.category}, ${data.about.trim().slice(0, 280)}, ${stallCode}, ${phone}
      )
    `;
    await sql`
      update enquiries set business_id = ${businessId}
      where stall_code = ${stallCode} and business_id is null
    `;
    await writeSession(accountId);
    const row = await businessByAccount(accountId);
    if (!row) return { ok: false, error: "The business could not be saved." };
    return { ok: true, data: toPublicBusiness(row) };
  });

export const loginBusiness = createServerFn({ method: "POST" })
  .inputValidator((data: { email: string; password: string }) => data)
  .handler(async ({ data }): Promise<Result<{ email: string }>> => {
    const email = data.email.trim().toLowerCase();
    const sql = await getSql();
    const rows = await sql<{ id: string; password_hash: string }>`
      select id, password_hash from market_accounts where email = ${email}
    `;
    const account = rows[0];
    if (!account || !(await verifyPassword(data.password, account.password_hash))) {
      return { ok: false, error: "Email or password is wrong." };
    }
    await writeSession(account.id);
    return { ok: true, data: { email } };
  });

export const logoutBusiness = createServerFn({ method: "POST" }).handler(async () => {
  const { getCookie, setCookie } = await import("@tanstack/react-start/server");
  const token = getCookie(COOKIE);
  if (token) {
    const sql = await getSql();
    await sql`delete from market_sessions where token_hash = ${tokenHash(token)}`;
  }
  setCookie(COOKIE, "", { path: "/", httpOnly: true, sameSite: "lax", maxAge: 0 });
  return { ok: true as const };
});

export const listPublicBusinesses = createServerFn({ method: "GET" }).handler(async () => {
  const sql = await getSql();
  const rows = await sql<BusinessRow>`
    select * from businesses order by created_at desc limit 50
  `;
  return rows.map(toPublicBusiness);
});

export const getPublicShop = createServerFn({ method: "GET" })
  .inputValidator((data: { stallCode: string }) => data)
  .handler(async ({ data }) => {
    const stallCode = data.stallCode.trim().toUpperCase();
    const sql = await getSql();
    const rows = await sql<BusinessRow>`select * from businesses where stall_code = ${stallCode}`;
    const row = rows[0];
    if (!row) return null;
    const products = await sql<{ id: string; name: string; price_naira: number; unit: string }>`
      select id, name, price_naira, unit from products
      where business_id = ${row.id} order by created_at desc
    `;
    return { business: toPublicBusiness(row), products };
  });

export const updatePlanPrice = createServerFn({ method: "POST" })
  .inputValidator((data: { code: string; priceNaira: number; adminKey: string }) => data)
  .handler(async ({ data }): Promise<Result<{ priceNaira: number }>> => {
    const expected = process.env.OJA_ADMIN_KEY ?? "";
    if (expected.length < 16) {
      return { ok: false, error: "Set OJA_ADMIN_KEY on the server, at least 16 characters, before a price can change." };
    }
    if (data.adminKey !== expected) return { ok: false, error: "That administrator key was refused." };
    if (data.code !== "growth" && data.code !== "verify") {
      return { ok: false, error: "Only the Growth or Verification price can be proposed. Locating a business stays free, and the 2% fee stays off." };
    }
    const price = Math.round(Number(data.priceNaira));
    if (!Number.isFinite(price) || price < 0 || price > 5_000_000) {
      return { ok: false, error: "Use a price from ₦0 to ₦5,000,000." };
    }
    const sql = await getSql();
    await sql`
      update plan_settings
      set price_naira = ${price},
          purchasable = false,
          note = ${
            data.code === "verify"
              ? "Proposed verification price. Payment is not connected, so this cannot be bought, and paying would not grant a badge."
              : "Proposed price only. Payment is not connected, so this plan cannot be bought."
          }
      where code = ${data.code}
    `;
    return { ok: true, data: { priceNaira: price } };
  });

export const listPlans = createServerFn({ method: "GET" }).handler(async () => {
  const sql = await getSql();
  return sql<{ code: string; name: string; price_naira: number; purchasable: boolean; note: string }>`
    select code, name, price_naira, purchasable, note from plan_settings order by code
  `;
});

export const sendEnquiry = createServerFn({ method: "POST" })
  .inputValidator((data: { stallCode: string; fromName: string; fromContact: string; message: string }) => data)
  .handler(async ({ data }): Promise<Result<{ inbox: boolean }>> => {
    const stallCode = data.stallCode.trim().toUpperCase();
    const fromName = data.fromName.trim();
    const message = data.message.trim();
    const contact = data.fromContact.trim();
    if (fromName.length < 2 || message.length < 2 || contact.length < 6) {
      return { ok: false, error: "Add your name, a way to reply, and the enquiry." };
    }
    const sql = await getSql();
    const owners = await sql<{ id: string }>`select id from businesses where stall_code = ${stallCode}`;
    await sql`
      insert into enquiries (id, business_id, stall_code, from_name, from_contact, message)
      values (${newId("enq")}, ${owners[0]?.id ?? null}, ${stallCode}, ${fromName}, ${contact.slice(0, 40)}, ${message.slice(0, 800)})
    `;
    return { ok: true, data: { inbox: Boolean(owners[0]) } };
  });

export type OwnerView = {
  email: string;
  business: BusinessRow;
  products: { id: string; name: string; price_naira: number; unit: string }[];
  enquiries: { id: string; from_name: string; from_contact: string; message: string; stall_code: string }[];
  checks: { kind: "cac" | "nafdac" }[];
};

export const getOwner = createServerFn({ method: "GET" }).handler(async (): Promise<OwnerView | null> => {
  const accountId = await readAccountId();
  if (!accountId) return null;
  const sql = await getSql();
  const accounts = await sql<{ email: string }>`select email from market_accounts where id = ${accountId}`;
  const business = await businessByAccount(accountId);
  if (!accounts[0] || !business) return null;
  const products = await sql<{ id: string; name: string; price_naira: number; unit: string }>`
    select id, name, price_naira, unit from products where business_id = ${business.id} order by created_at desc
  `;
  const enquiries = await sql<{ id: string; from_name: string; from_contact: string; message: string; stall_code: string }>`
    select id, from_name, from_contact, message, stall_code from enquiries
    where business_id = ${business.id} or stall_code = ${business.stall_code}
    order by created_at desc limit 30
  `;
  const checks = await sql<{ kind: "cac" | "nafdac" }>`
    select kind from verification_requests where business_id = ${business.id} and status = 'pending'
  `;
  return { email: accounts[0].email, business, products, enquiries, checks };
});

export const addProduct = createServerFn({ method: "POST" })
  .inputValidator((data: { name: string; price: number; unit: string }) => data)
  .handler(async ({ data }): Promise<Result<{ id: string }>> => {
    const accountId = await readAccountId();
    if (!accountId) return { ok: false, error: "Log in first." };
    const business = await businessByAccount(accountId);
    if (!business) return { ok: false, error: "Register a business first." };
    const name = data.name.trim();
    const price = Math.round(Number(data.price));
    if (name.length < 2 || !Number.isFinite(price) || price <= 0) {
      return { ok: false, error: "Add a product name and a price in naira." };
    }
    const id = newId("prd");
    const sql = await getSql();
    await sql`
      insert into products (id, business_id, name, price_naira, unit)
      values (${id}, ${business.id}, ${name.slice(0, 60)}, ${price}, ${(data.unit || "piece").slice(0, 24)})
    `;
    return { ok: true, data: { id } };
  });

export const setPhonePublic = createServerFn({ method: "POST" })
  .inputValidator((data: { phonePublic: boolean }) => data)
  .handler(async ({ data }): Promise<Result<{ phonePublic: boolean }>> => {
    const accountId = await readAccountId();
    if (!accountId) return { ok: false, error: "Log in first." };
    const sql = await getSql();
    await sql`update businesses set phone_public = ${Boolean(data.phonePublic)} where account_id = ${accountId}`;
    return { ok: true, data: { phonePublic: Boolean(data.phonePublic) } };
  });

export const submitEvidence = createServerFn({ method: "POST" })
  .inputValidator((data: { kind: "cac" | "nafdac"; reference: string }) => data)
  .handler(async ({ data }): Promise<Result<{ status: "pending" }>> => {
    const accountId = await readAccountId();
    if (!accountId) return { ok: false, error: "Log in first." };
    const business = await businessByAccount(accountId);
    if (!business) return { ok: false, error: "Register a business first." };
    if (data.kind !== "cac" && data.kind !== "nafdac") return { ok: false, error: "Choose CAC or NAFDAC." };
    const reference = data.reference.trim();
    if (reference.length < 4) return { ok: false, error: "Add the reference number you want checked." };
    const sql = await getSql();
    await sql`
      insert into verification_requests (id, business_id, kind, reference, status)
      values (${newId("ver")}, ${business.id}, ${data.kind}, ${reference.slice(0, 40)}, 'pending')
    `;
    const identity = nextIdentityStatus(business.identity_status, data.kind);
    if (identity !== business.identity_status) {
      await sql`update businesses set identity_status = ${identity} where id = ${business.id}`;
    }
    return { ok: true, data: { status: "pending" as const } };
  });
