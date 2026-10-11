-- A business can be located in any of the 774 LGAs. Listing stays free.
-- Verification review is the product Oja would charge for. It cannot be bought,
-- and this schema still cannot record an official badge.

alter table businesses add column if not exists lga text not null default '';

insert into plan_settings (code, name, price_naira, purchasable, note) values
  (
    'verification',
    'Verification review',
    0,
    false,
    'The review Oja would charge for, after a person checks the business. Listing stays free so a buyer anywhere can find the stall. This review is not for sale, and paying would not create a badge.'
  )
on conflict (code) do update
  set note = excluded.note,
      purchasable = false;
