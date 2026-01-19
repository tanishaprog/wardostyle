-- Create waitlist table to store signups
CREATE TABLE public.waitlist (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (for waitlist signups)
CREATE POLICY "Anyone can join waitlist" 
ON public.waitlist 
FOR INSERT 
WITH CHECK (true);

-- Only allow reading via authenticated admin (you can expand this later)
CREATE POLICY "No public reads" 
ON public.waitlist 
FOR SELECT 
USING (false);