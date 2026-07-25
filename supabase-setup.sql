-- Run this in the Supabase SQL Editor (one time setup)

-- 1. Create the key-value table
CREATE TABLE kv_store (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Enable Realtime on the table (so all phones sync live)
ALTER PUBLICATION supabase_realtime ADD TABLE kv_store;

-- 3. Allow public read/write (no auth needed — it's a bachelor party app)
ALTER TABLE kv_store ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read"  ON kv_store FOR SELECT USING (true);
CREATE POLICY "Allow public insert" ON kv_store FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update" ON kv_store FOR UPDATE USING (true);
CREATE POLICY "Allow public delete" ON kv_store FOR DELETE USING (true);

-- 4. Auto-update timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER kv_store_updated
  BEFORE UPDATE ON kv_store
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();
