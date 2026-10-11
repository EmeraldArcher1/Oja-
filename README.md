# OJA

Lagos market marketplace. Registered businesses get a stall code, hidden mobile number, product listings, and buyer enquiries. Sample Balogun stalls stay labelled as samples.

## What is implemented

- Sign up and log in for a business, separate from the preview account.
- Free Starter plan. Growth price can be proposed by an administrator. It cannot be bought.
- Phone numbers stay hidden unless the owner publishes them.
- Enquiries do not require the owner’s number.
- Trust tiers: person, stall visit, CAC, and NAFDAC. A CAC or NAFDAC reference can be saved as pending only. No tier becomes verified. Paying does not verify anyone.
- The 2% transaction fee is proposed and is not charged.
- English, Pidgin, Yoruba, Igbo, and Hausa on the account screens. Market copy falls back to English where a translation is not written.

## What is not connected

CAC, NAFDAC, NIN, BVN, Paystack, escrow, refunds, settlement, and live advertising. Dojah and other KYB providers are not called. A sponsored label is only for a campaign that is actually live, and none is.

## Setup

```bash
npm install
npm run db:migrate
npm test
npm run dev
```

Set `OJA_ADMIN_KEY` to at least 16 characters before `/admin` can change the proposed Growth price. Do not commit that key.

This repository documents the product. The application source has not been pushed to this repository yet.
