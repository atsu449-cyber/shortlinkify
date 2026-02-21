import { NextRequest, NextResponse } from 'next/server';
import { userAgent } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET(request: NextRequest, { params }: { params: Promise<{ alias: string; id: string }> }) {
  const { alias, id } = await params;

  // システムの予約語（Next.jsの静的ルート）とバッティングした場合はリダイレクト処理を行わず次のルートへ譲る（404回避）
  const reservedPaths = ['dashboard', 'login', 'register', 'forgot-password', 'reset-password', 'analytics', 'auth'];
  if (reservedPaths.includes(alias)) {
    return NextResponse.next();
  }

  const supabase = await createClient();

  // 1. URLを検索（aliasとshort_idの両方で一致するものを検索）
  const { data: urlData, error: urlError } = await supabase
    .from('urls')
    .select('id, long_url')
    .eq('alias', alias)
    .eq('short_id', id)
    .single();

  if (urlError || !urlData) {
    // 見つからない場合はトップページやエラーページへリダイレクト
    return NextResponse.redirect(new URL('/', request.url));
  }

  // 2. ユーザーエージェント等からクリック情報を取得
  const { device } = userAgent(request);
  const ip = request.headers.get('x-forwarded-for') || 'unknown';
  const referer = request.headers.get('referer') || 'direct';

  let deviceType = 'desktop';
  if (device.type === 'mobile') deviceType = 'mobile';
  if (device.type === 'tablet') deviceType = 'tablet';

  // 3. クリックログを非同期で保存（awaitしないことでリダイレクトを高速化する方針も可能だが、
  // 今回はエッジ環境での確実な実行のためawaitするケースとする。本番運用で負荷が高ければ調整）
  await supabase.from('click_logs').insert({
    url_id: urlData.id,
    ip_address: ip,
    user_agent: request.headers.get('user-agent') || 'unknown',
    device_type: deviceType,
    referer: referer,
  });

  // 4. 元の長いURLへダイレクトにリダイレクト（クッションページなしのHTTP 301/302）
  // ※恒久的移動(301)または一時的移動(302)。通常短縮URLは302を用います。
  return NextResponse.redirect(urlData.long_url, 302);
}
