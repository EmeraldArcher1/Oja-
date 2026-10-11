-- Verification is the proposed paid product. Locating a business stays free.
-- This row cannot be purchased. A price change must not set purchasable.

insert into plan_settings (code, name, price_naira, purchasable, note) values
  (
    'verify',
    'Verification',
    0,
    false,
    'Proposed paid product. Any business can be located for free. A check can be queued. This price cannot be charged, and paying would not grant a badge.'
  )
on conflict (code) do nothing;
