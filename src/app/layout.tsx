import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Link from 'next/link';
import Logo from '../components/Logo';
import { createClient } from '@/utils/supabase/server';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ShortLinkify - スマートな短縮URL作成・分析ツール',
  description: '自社ドメインでの一括URL短縮化、QRコード生成、詳細なクリック分析をこれ一つで。',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return (
    <html lang="ja">
      <body className={inter.className}>
        <nav className="glass-panel" style={{
          position: 'sticky',
          top: '0',
          zIndex: 50,
          margin: '1rem',
          padding: '1rem 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <Logo />
          </Link>
          <div className="flex gap-4">
            {user ? (
              <Link href="/dashboard" className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>
                ダッシュボードへ
              </Link>
            ) : (
              <>
                <Link href="/login" className="btn btn-secondary" style={{ padding: '0.5rem 1rem' }}>
                  ログイン
                </Link>
                <Link href="/register" className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>
                  無料で始める
                </Link>
              </>
            )}
          </div>
        </nav>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
