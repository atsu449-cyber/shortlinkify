import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Link from 'next/link';
import Logo from '../components/Logo';
import { createClient } from '@/utils/supabase/server';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ShortLinkify｜永久無料・無制限の短縮URL一括生成サービス',
  description: 'カスタムURLの設定、生成数無制限（一括最大300件）・利用期限なしのURL短縮、多角的なアクセス解析、QRコード自動生成など、マーケティングとリンク管理に必要なすべての機能を安全・完全無料でご提供します。',
  openGraph: {
    title: 'ShortLinkify｜永久無料・無制限の短縮URL一括生成サービス',
    description: 'カスタムURLの設定、一括短縮機能、高度なアクセス解析を完全無料で。',
    url: 'https://slf.onl',
    siteName: 'ShortLinkify',
    images: [
      {
        url: 'https://slf.onl/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ShortLinkify OGP Image',
      },
    ],
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ShortLinkify｜永久無料・無制限の短縮URL一括生成サービス',
    description: 'カスタムURLの設定、一括短縮機能、高度なアクセス解析を完全無料で。',
    images: ['https://slf.onl/og-image.jpg'],
  },
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
        <nav className="glass-panel main-nav" style={{
          position: 'sticky',
          top: '0',
          zIndex: 50,
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
