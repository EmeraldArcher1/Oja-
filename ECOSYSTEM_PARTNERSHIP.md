# POSH9JA Group of Companies — Ecosystem Partnership

**Status:** Founder-approved ecosystem partnership direction, effective for product planning and coordinated development as of 16 October 2026.

## Approved ecosystem partners

- **POSH9JA EXPORT & LOGISTICS** — export, freight and logistics enquiries. Official customer channels remain managed by POSH9JA.
- **OJA** — a Nigerian local-business and marketplace initiative. Marketplace listings, merchant verification, orders, payments and delivery must be described according to their separately verified implementation status.

## Relationship with LagosGo

LagosGo is the group's mobility product. POSH9JA EXPORT & LOGISTICS and OJA are approved ecosystem partners within the POSH9JA Group of Companies ecosystem. This approval authorises coordinated product planning, cross-promotion design and implementation work; it does not mean every integration or service is already operational.

## Integration and customer-trust rules

1. Ride booking, driver acceptance, active-trip tracking, emergency access and payment flows take priority over partner promotion.
2. Partner cards must be clearly labelled. Do not imply that a partner feature is live until it has been implemented, tested and deployed.
3. No partner promotion may block a ride, hide fare information, or create an undisclosed fee or driver deduction.
4. Do not automatically share LagosGo passenger, driver, location, trip or payment data with a partner. Any future data exchange needs a defined purpose, appropriate legal basis, notice, access controls and retention limits.
5. Keep codebases, deployments, databases, credentials and operational permissions isolated. Integrations should use documented interfaces and least-privilege access.
6. A partner outage must not prevent a user from requesting or completing a LagosGo ride.
7. POSH9JA enquiries, OJA merchant listings and future delivery services must remain separate workflows until each is genuinely connected and operational.
8. Do not represent this internal ecosystem approval as a claim of incorporation, regulatory approval, third-party certification or a completed commercial contract.

## Rollout gates

- **Partner visibility:** approved descriptions and a non-blocking partner section may be shown.
- **External contact:** links and contact details must be verified and direct users to the partner's official channel.
- **Transactional integration:** requires documented API contracts, consent/privacy review, security checks, failure handling and end-to-end tests.
- **Production release:** requires passing CI, code review and a confirmed deployment. A repository change or open pull request is not a production release.

## Current product-status rule

LagosGo's current interface includes prototype elements. Do not describe sample fares, sample merchants, delivery, dispatch, payment, marketplace listings or partner transactions as live unless separately verified. OJA remains a marketplace pilot and must not be described as having completed CAC/NAFDAC verification or live payment/delivery integrations unless those capabilities are independently confirmed.
