-- An owner can answer an enquiry. The useful count is answers, not sign-ups.
-- A verification request still cannot become a badge.

alter table enquiries add column if not exists reply text not null default '';
alter table enquiries add column if not exists replied_at timestamptz;
