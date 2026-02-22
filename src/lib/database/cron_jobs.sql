-- ==============================================================================
-- 目的: click_logs テーブルの肥大化・無料枠（500MB）超過を防ぐための定期自動削除処理
-- 実行場所: Supabase の SQL Editor に貼り付けて「RUN」を実行してください
-- 説明: このジョブを登録すると、毎晩（UTC18時 = JST午前3時）に
--       1年以上前の古いクリックログが自動的に削除（DELETE）されます。
-- ==============================================================================

-- 1. pg_cron 拡張機能を有効化（Supabaseでは標準でサポートされています）
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- 2. 毎晩自動実行するジョブの登録
-- ジョブ名: 'delete_old_click_logs'
-- スケジュール: '0 18 * * *' （毎日 UTC 18:00 = サーバー時刻 に実行）
-- ※月別の推移が最低1年は見えるよう「NOW() - INTERVAL '1 year'」より古いものを削除
SELECT cron.schedule(
  'delete_old_click_logs',
  '0 18 * * *',
  $$
    DELETE FROM public.click_logs 
    WHERE created_at < NOW() - INTERVAL '1 year';
  $$
);

-- ==============================================================================
-- 【管理者用メモ】
-- 
-- ▼ 登録されているスケジュールの確認方法
-- SELECT * FROM cron.job;
-- 
-- ▼ 登録したスケジュールを削除（停止）したい場合
-- SELECT cron.unschedule('delete_old_click_logs');
-- 
-- ▼ スケジュールの実行履歴（成功/失敗）を確認したい場合
-- SELECT * FROM cron.job_run_details ORDER BY start_time DESC LIMIT 10;
-- ==============================================================================
