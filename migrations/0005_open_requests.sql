-- Advertising, export, and partnership requests are stored for the Oja desk.
-- Saving a row does not start an advert, a shipment, or a bank partnership.

create table if not exists open_requests (
  id text primary key,
  kind text not null check (kind in ('ad', 'export', 'partner')),
  name text not null,
  phone text not null,
  stall_code text not null default '',
  subject text not null default '',
  note text not null default '',
  created_at timestamptz not null default now()
);
