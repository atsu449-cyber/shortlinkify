'use server'

import { createClient } from '@/utils/supabase/server';

export async function checkRateLimit(requestedCount: number): Promise<{ allowed: boolean; remaining?: number; message?: string }> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { allowed: false, message: 'ログインが必要です。' };
  }

  const LIMIT_PER_MINUTE = 1500;
  const oneMinuteAgo = new Date(Date.now() - 60000).toISOString();

  try {
    // 過去1分間にこのユーザーが作成したURL件数を取得
    const { count, error } = await supabase
      .from('urls')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .gte('created_at', oneMinuteAgo);

    if (error) {
      console.error('Rate limit count error:', error);
      // DBエラー時はUXのため一旦通すが、ログには残す
      return { allowed: true };
    }

    const currentCount = count || 0;

    // 今回作成しようとしている件数を足して超過するか判定
    if (currentCount + requestedCount > LIMIT_PER_MINUTE) {
      return {
        allowed: false,
        message: `生成リミット（1分間に1,500件）に到達しました。現在 ${currentCount}件生成済みです。\nサーバー負荷保護のため、約1分間ほど時間をおいてから再度お試しください。`
      };
    }

    return { allowed: true, remaining: LIMIT_PER_MINUTE - (currentCount + requestedCount) };

  } catch (error) {
    console.error('Exception in checkRateLimit:', error);
    return { allowed: true };
  }
}
