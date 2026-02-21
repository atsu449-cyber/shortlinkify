import Link from 'next/link';
import { ArrowRight, BarChart3, Link as LinkIcon, QrCode, Zap } from 'lucide-react';

export default function Home() {
  return (
    <div className="container" style={{ padding: '4rem 1.5rem', minHeight: 'calc(100vh - 100px)' }}>
      {/* Hero Section */}
      <section className="text-center animate-fade-in" style={{ marginTop: '2rem', marginBottom: '6rem' }}>
        <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', lineHeight: 1.1 }}>
          URLをスマートに。<br />
          <span className="text-gradient">ビジネスを加速する</span>リンク管理
        </h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto 2.5rem' }}>
          短縮URLの一括作成、QRコードの自動生成、そして詳細なアクセス解析。<br />
          マーケティングに必要なすべてを、この一つのプラットフォームで。
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/register" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
            無料で始める <ArrowRight size={20} />
          </Link>
          <Link href="#features" className="btn btn-secondary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
            機能を見る
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" style={{ marginBottom: '6rem' }}>
        <h2 className="text-center" style={{ fontSize: '2rem', marginBottom: '3rem' }}>圧倒的な利便性と分析力</h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>

          <div className="glass-panel" style={{ padding: '2rem' }}>
            <div style={{ background: 'var(--surface-hover)', width: '50px', height: '50px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
              <Zap size={28} color="var(--primary)" />
            </div>
            <h3 style={{ fontSize: '1.25rem' }}>一括短縮化</h3>
            <p style={{ color: 'var(--text-muted)' }}>
              数百、数千の長いURLもワンクリックで一括変換。Excel等のデータとも連携しやすく、作業時間を大幅に削減します。
            </p>
          </div>

          <div className="glass-panel" style={{ padding: '2rem' }}>
            <div style={{ background: 'var(--surface-hover)', width: '50px', height: '50px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
              <BarChart3 size={28} color="var(--primary)" />
            </div>
            <h3 style={{ fontSize: '1.25rem' }}>詳細なアクセス解析</h3>
            <p style={{ color: 'var(--text-muted)' }}>
              月別、週別、日別、時間別のクリック数をリアルタイムでグラフ化。どのリンクが最も効果的か一目でわかります。
            </p>
          </div>

          <div className="glass-panel" style={{ padding: '2rem' }}>
            <div style={{ background: 'var(--surface-hover)', width: '50px', height: '50px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
              <QrCode size={28} color="var(--primary)" />
            </div>
            <h3 style={{ fontSize: '1.25rem' }}>QRコード自動生成</h3>
            <p style={{ color: 'var(--text-muted)' }}>
              URLの短縮化と同時にQRコードも即座に生成。チラシやパンフレットなど、オフラインのマーケティングも強力にサポートします。
            </p>
          </div>

          <div className="glass-panel" style={{ padding: '2rem' }}>
            <div style={{ background: 'var(--surface-hover)', width: '50px', height: '50px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
              <LinkIcon size={28} color="var(--primary)" />
            </div>
            <h3 style={{ fontSize: '1.25rem' }}>カスタムドメイン</h3>
            <p style={{ color: 'var(--text-muted)' }}>
              自社ブランドのドメイン名を短縮URLの冒頭に設定可能。信頼性を高め、クリック率の向上に貢献します。
            </p>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--border-color)', paddingTop: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
        <p>&copy; {new Date().getFullYear()} ShortLinkify. All rights reserved.</p>
      </footer>
    </div>
  );
}
