import assert from "node:assert/strict";
import test from "node:test";
import { identityAfterPayment, nextIdentityStatus, toPublicBusiness } from "./public.ts";
import { hashPassword, verifyPassword } from "./passwords.ts";

const row = {
  id: "biz_1",
  name: "Iya Bose",
  trader: "Bose",
  market_id: "balogun",
  category: "food",
  about: "Pepper",
  stall_code: "BA01",
  phone: "2348030000000",
  phone_public: false,
  plan: "starter",
  identity_status: "unverified" as const,
};

test("hides the owner phone unless they publish it", () => {
  assert.equal(toPublicBusiness(row).phone, null);
  assert.equal(toPublicBusiness({ ...row, phone_public: true }).phone, "2348030000000");
});

test("a payment does not verify the business", () => {
  assert.equal(identityAfterPayment(), "unverified");
});

test("CAC can be pending, and NAFDAC does not change identity", () => {
  assert.equal(nextIdentityStatus("unverified", "cac"), "pending");
  assert.equal(nextIdentityStatus("unverified", "nafdac"), "unverified");
  assert.equal(nextIdentityStatus("pending", "nafdac"), "pending");
});

test("password hash verifies only the same password", async () => {
  const stored = await hashPassword("market-day-1");
  assert.equal(await verifyPassword("market-day-1", stored), true);
  assert.equal(await verifyPassword("wrong-day", stored), false);
  assert.equal(await verifyPassword("market-day-1", "plain"), false);
});
