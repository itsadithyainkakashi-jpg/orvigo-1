-- Extend product_category enum
ALTER TYPE public.product_category ADD VALUE IF NOT EXISTS 'mens';
ALTER TYPE public.product_category ADD VALUE IF NOT EXISTS 'womens';

-- Create collection_type enum
DO $$ BEGIN
  CREATE TYPE public.collection_type AS ENUM ('new_arrivals', 'classic', 'striped', 'socks');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- Add columns to products
ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS collection public.collection_type,
  ADD COLUMN IF NOT EXISTS sizes text[] NOT NULL DEFAULT ARRAY['S','M','L','XL']::text[];

CREATE INDEX IF NOT EXISTS idx_products_category_collection
  ON public.products(category, collection);

-- Storage bucket for product images
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies
DROP POLICY IF EXISTS "Public can view product images" ON storage.objects;
CREATE POLICY "Public can view product images"
ON storage.objects FOR SELECT
USING (bucket_id = 'product-images');

DROP POLICY IF EXISTS "Admins can upload product images" ON storage.objects;
CREATE POLICY "Admins can upload product images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'product-images' AND public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can update product images" ON storage.objects;
CREATE POLICY "Admins can update product images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'product-images' AND public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can delete product images" ON storage.objects;
CREATE POLICY "Admins can delete product images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'product-images' AND public.has_role(auth.uid(), 'admin'));

-- Enable realtime on products
ALTER TABLE public.products REPLICA IDENTITY FULL;
DO $$ BEGIN
  EXECUTE 'ALTER PUBLICATION supabase_realtime ADD TABLE public.products';
EXCEPTION WHEN duplicate_object THEN NULL; WHEN others THEN NULL; END $$;