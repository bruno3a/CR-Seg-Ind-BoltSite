import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
  db: {
    schema: 'public'
  }
});

// Exportar una función para configurar el listener
export const setupSupabaseListener = (queryClient: QueryClient) => {
  const channel = supabase
    .channel('products_changes')
    .on('postgres_changes', {
      event: '*',
      schema: 'public',
      table: 'products'
    }, (payload) => {
      // Solo invalidar la caché si hay cambios reales
      if (payload.new || payload.old) {
        queryClient.invalidateQueries(['products']);
      }
    })
    .subscribe();

  return () => {
    channel.unsubscribe();
  };
};



