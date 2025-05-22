// This file is for documentation purposes only

export interface ContactSubmission {
  id: number
  first_name: string
  last_name: string
  email: string
  message: string
  created_at: string
}

/*
Database Schema (Supabase)

Table: contact_submissions
- id: integer (primary key, auto-increment)
- first_name: text (not null)
- last_name: text (not null)
- email: text (not null)
- message: text (not null)
- created_at: timestamp with time zone (default: now())

SQL to create the table:

CREATE TABLE contact_submissions (
  id SERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

*/
