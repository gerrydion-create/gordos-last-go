import { createClient } from '@supabase/supabase-js';

const supabaseUrl  = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnon = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnon);

const TABLE = 'kv_store';
const ROW_KEY = 'beer_olympics_v4';

// ─── Read shared state ───
export async function loadState() {
  try {
    const { data, error } = await supabase
      .from(TABLE)
      .select('value')
      .eq('key', ROW_KEY)
      .maybeSingle();
    if (error) throw error;
    return data ? JSON.parse(data.value) : null;
  } catch (e) {
    console.error('loadState error:', e);
    return null;
  }
}

// ─── Write shared state (upsert) ───
export async function persistState(state) {
  try {
    const { error } = await supabase
      .from(TABLE)
      .upsert({ key: ROW_KEY, value: JSON.stringify(state) }, { onConflict: 'key' });
    if (error) throw error;
  } catch (e) {
    console.error('persistState error:', e);
  }
}

// ─── Realtime subscription ───
export function subscribeToChanges(callback) {
  const channel = supabase
    .channel('kv-changes')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: TABLE, filter: `key=eq.${ROW_KEY}` },
      (payload) => {
        if (payload.new?.value) {
          try {
            callback(JSON.parse(payload.new.value));
          } catch {}
        }
      }
    )
    .subscribe();

  return () => supabase.removeChannel(channel);
}
