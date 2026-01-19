-- Block all UPDATE operations on waitlist table
CREATE POLICY "No public updates" 
ON public.waitlist 
FOR UPDATE 
USING (false);

-- Block all DELETE operations on waitlist table
CREATE POLICY "No public deletes" 
ON public.waitlist 
FOR DELETE 
USING (false);