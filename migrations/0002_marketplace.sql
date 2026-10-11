-- Oja marketplace schema.
--
-- Accounts are separate from the Grok preview user. A business owns its row.
-- phone is stored for the owner and is not part of the public projection unless
-- phone_public is true.
-- identity_status starts unverified. Paying or advertising must not change it.
-- verification_requests can only be inserted as pending. This database cannot
-- record an official CAC or NAFDAC result.
-- plan_settings holds prices. Nothing in this schema charges a card.
-- transaction_fee_active stays false until payments, refunds, and settlement exist.

create table if not exists market_accounts (
  id text primary key,
  email text not null unique,
  password_hash text not null,
  created_at timestamptz not null default now()
);

create table if not exists market_sessions (
  token_hash text primary key,
  account_id text not null references market_accounts (id) on delete cascade,
  expires_at timestamptz not null
);

create table if not exists businesses (
  id text primary key,
  account_id text not null unique references market_accounts (id) on delete cascade,
  name text not null,
  trader text not null,
  market_id text not null,
  category text not null,
  about text not null default '',
  stall_code text not null unique,
  phone text not null,
  phone_public boolean not null default false,
  plan text not null default 'starter',
  identity_status text not null default 'unverified'
    check (identity_status in ('unverified', 'pending')),
  created_at timestamptz not null default now()
);

create table if not exists products (
  id text primary key,
  business_id text not null references businesses (id) on delete cascade,
  name text not null,
  price_naira integer not null check (price_naira > 0),
  unit text not null default 'piece',
  created_at timestamptz not null default now()
);

create table if not exists enquiries (
  id text primary key,
  business_id text references businesses (id) on delete set null,
  stall_code text not null,
  from_name text not null,
  from_contact text not null,
  message text not null,
  created_at timestamptz not null default now()
);

create table if not exists verification_requests (
  id text primary key,
  business_id text not null references businesses (id) on delete cascade,
  kind text not null check (kind in ('cac', 'nafdac')),
  reference text not null,
  status text not null default 'pending' check (status = 'pending'),
  created_at timestamptz not null default now()
);

create table if not exists plan_settings (
  code text primary key,
  name text not null,
  price_naira integer not null check (price_naira >= 0),
  purchasable boolean not null default false,
  note text not null
);

insert into plan_settings (code, name, price_naira, purchasable, note) values
  ('starter', 'Free Starter', 0, true, 'Profile, product listings, market location, and enquiries.'),
  ('growth', 'Growth', 0, false, 'Not for sale. An authorised administrator must set the price before anyone can pay.'),
  ('transaction', 'Transaction fee', 0, false, 'A 2% fee is proposed only. It is not charged. Payments, refunds, and settlement are not connected.')
on conflict (code) do nothing;
