# Oja

Pilot directory for Nigerian markets. A person can register a business, pick a state and a local government, and list products. Buyers can browse sample stalls and send an enquiry.

This is not a live marketplace. Sample stalls are examples. Registration does not send the shop to buyers around the world.

## What works

- Sign up and log in for a business, separate from the preview account.
- All 36 states, the FCT, and 774 local government names, so a business can say where it is.
- Named markets in each state. Balogun has the only lane-by-lane sample walk.
- Phone numbers stay hidden unless the owner publishes them.
- Enquiries save against a stall code. They do not text the trader.
- A CAC or NAFDAC number can be stored as pending. No tier becomes verified. Paying does not verify anyone.
- The 2% fee and the verification review are proposals. Neither can be charged.

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
