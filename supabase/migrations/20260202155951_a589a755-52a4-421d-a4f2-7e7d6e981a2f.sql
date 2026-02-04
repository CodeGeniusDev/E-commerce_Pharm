-- Create storage bucket for prescription uploads
INSERT INTO storage.buckets (id, name, public) VALUES ('prescriptions', 'prescriptions', true);

-- Create policy for anyone to upload prescriptions (no auth required for pharmacy orders)
CREATE POLICY "Anyone can upload prescriptions"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'prescriptions');

-- Create policy for anyone to view prescriptions
CREATE POLICY "Anyone can view prescriptions"
ON storage.objects FOR SELECT
USING (bucket_id = 'prescriptions');