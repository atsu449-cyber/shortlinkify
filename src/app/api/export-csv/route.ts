import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'URL ID is required' }, { status: 400 });
    }

    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // URLの所有者かどうかチェック
    const { data: urlData, error: urlError } = await supabase
      .from('urls')
      .select('id, user_id, long_url, short_id')
      .eq('id', id)
      .single();

    if (urlError || !urlData) {
      return NextResponse.json({ error: 'URL not found' }, { status: 404 });
    }

    if (urlData.user_id !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // 直近30日間の日時を計算
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const thirtyDaysAgoString = thirtyDaysAgo.toISOString();

    // クリックログの取得
    const { data: logs, error: logsError } = await supabase
      .from('click_logs')
      .select('id, clicked_at, referer, device_type')
      .eq('url_id', id)
      .gte('clicked_at', thirtyDaysAgoString)
      .order('clicked_at', { ascending: false });

    if (logsError) {
      console.error('Error fetching logs:', logsError);
      return NextResponse.json({ error: 'Failed to fetch click logs' }, { status: 500 });
    }

    // CSV フォーマット生成
    // BOM (Byte Order Mark) を追加して Excel での文字化けを防ぐ
    const BOM = '\uFEFF';
    const csvHeaders = ['クリック日時', 'デバイスタイプ', 'リファラ (参照元URL)'].join(',');

    const csvRows = logs.map(log => {
      const date = new Date(log.clicked_at).toLocaleString('ja-JP');
      const device = log.device_type || 'Unknown';
      const referer = log.referer === 'direct' ? 'Direct' : (log.referer || 'Unknown');

      return [
        `"${date}"`,
        `"${device}"`,
        `"${referer}"`
      ].join(',');
    });

    const csvContent = BOM + [csvHeaders, ...csvRows].join('\n');

    const headers = new Headers();
    headers.set('Content-Type', 'text/csv; charset=utf-8');
    headers.set('Content-Disposition', `attachment; filename="click_logs_${urlData.short_id}.csv"`);

    return new NextResponse(csvContent, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error('CSV Export API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
