import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://vhgsfsfuwgkqwcxmsran.supabase.co/rest/v1/'
const supabaseKey = sb_publishable_w5j3v9WOQoHLQN_WIl4Z7Q_kNKSBezp
export const supabase = createClient(
  supabaseUrl,
  supabaseKey
)