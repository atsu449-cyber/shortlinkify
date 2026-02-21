-- Supabase SQL Editor用 初期構築スクリプト
-- ※これをSupabaseのSQLエディタに貼り付けて実行してください

-- 1. profilesテーブル（会員情報）
CREATE TABLE public.profiles (
  id uuid REFERENCES auth.users NOT NULL PRIMARY KEY,
  email text NOT NULL,
  organization text NOT NULL,
  department text NOT NULL,
  job_type text NOT NULL, -- 職種
  role text NOT NULL, -- 役職
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- RLS（Row Level Security）ポリシー設定
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "自分のプロフィールのみ閲覧可能" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "自分のプロフィールのみ更新可能" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- 2. urlsテーブル（短縮URL情報）
CREATE TABLE public.urls (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES public.profiles(id) NOT NULL,
  long_url text NOT NULL,
  short_id text NOT NULL UNIQUE, -- ランダム生成されたID (例: aB3dE)
  alias text, -- 手動指定（例: companyname）
  title text, -- ページの取得タイトル
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- インデックス作成（検索高速化用）
CREATE INDEX urls_short_id_idx ON public.urls (short_id);
CREATE INDEX urls_alias_idx ON public.urls (alias);
CREATE INDEX urls_user_id_idx ON public.urls (user_id);

-- RLSポリシー設定
ALTER TABLE public.urls ENABLE ROW LEVEL SECURITY;
-- 所有者は全て可能、一般公開はSELECT（リダイレクト用）のみ
CREATE POLICY "自分のURLのみCRUD可能" ON public.urls FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "URLは誰でも引ける" ON public.urls FOR SELECT USING (true);


-- 3. click_logsテーブル（クリック解析用）
CREATE TABLE public.click_logs (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  url_id uuid REFERENCES public.urls(id) ON DELETE CASCADE NOT NULL,
  clicked_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  ip_address text,
  user_agent text,
  device_type text,   -- 'mobile', 'desktop', 'tablet'
  referer text
);

-- インデックス作成（分析の集計を高速にするため）
CREATE INDEX click_logs_url_id_idx ON public.click_logs (url_id);
CREATE INDEX click_logs_clicked_at_idx ON public.click_logs (clicked_at);

-- RLSポリシー設定
ALTER TABLE public.click_logs ENABLE ROW LEVEL SECURITY;
-- ログ追加はAPI（Service Role）経由で行うが、匿名ユーザーのアクセスによっても発生するため、INSERTを許可
CREATE POLICY "誰でもクリックログを送信可能" ON public.click_logs FOR INSERT WITH CHECK (true);
CREATE POLICY "所有者のみクリックログを閲覧可能" ON public.click_logs FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.urls
    WHERE public.urls.id = public.click_logs.url_id
    AND public.urls.user_id = auth.uid()
  )
);
