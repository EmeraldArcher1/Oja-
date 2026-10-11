# Oja

The working pilot is Balogun Market. Other states and local governments are names of places. A sample stall stays a sample until a Balogun trader signs up with that exact code. The owner can answer an enquiry. That answer is counted. A verification check can be requested only after an enquiry, and it stays pending.

This is not a live marketplace. Sample stalls are examples. Registration does not send the shop to buyers around the world.

## Launch

Not ready for an official launch. The Balogun stalls are samples. Payments, rider booking, CAC, and NAFDAC are not connected. A public launch would present examples as shops.

POSH9JA EXPORT AND LOGISTICS is listed at `/posh9ja` as the founder’s company, with the office, email, and phone numbers the business already publishes. It is not verified, and it is not a Balogun stall.

## What works

- Sign up and log in for a business, separate from the preview account.
- All 36 states, the FCT, and 774 local government names, so a business can say where it is.
- Named markets in each state. Balogun has the only lane-by-lane sample walk.
- Phone numbers stay hidden unless the owner publishes them.
- Enquiries save against a stall code. They do not text the trader.
- A CAC or NAFDAC number can be stored as pending. No tier becomes verified. Paying does not verify anyone.
- The 2% fee and the verification review are proposals. Neither can be charged.

## Verification and fees

A check is a queue. It is not a badge. The database has no verified status.

A trader must be logged in. The check stays closed until a buyer has written to that stall. Signing up, advertising, or paying does not open it and does not pass it.

| Tier | Fee | What Oja does |
|---|---|---|
| Person | ₦0 | NIN and BVN are not checked. A phone number is not this tier. |
| Stall | ₦0 | No visit, photo check, or map pin is recorded as proof. |
| CAC | ₦0 | An RC number can be saved as pending. Oja does not call CAC. |
| NAFDAC | ₦0 | A number can be saved as a product-record request. It does not prove the goods. |

Filing a CAC number changes the label from "Not verified" to "Check pending". A NAFDAC number does not change that label. Buyers see the pending label as a number that was typed in, not as a check that was done.

The Verification price in the database is ₦0 and is not for sale. An administrator can store a proposed price. It still cannot be charged, and paying it would not grant a badge. Listing stays free. The 2% transaction fee is not collected.

## What is not connected

CAC, NAFDAC, NIN, BVN, Paystack, escrow, refunds, settlement, advertising, and rider dispatch. No KYB provider is called. Nothing is marked Sponsored.

## Setup

```bash
npm install
npm run db:migrate
npm test
npm run dev
```

Set `OJA_ADMIN_KEY` to at least 16 characters before `/admin` can change a proposed price. Do not commit that key.
