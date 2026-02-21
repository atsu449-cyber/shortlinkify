import Link from 'next/link';
import { ArrowRight, BarChart3, Link as LinkIcon, QrCode, Zap, ShieldCheck, CheckCircle2, Download } from 'lucide-react';

export default function Home() {
  return (
    <div className="container" style={{ padding: '2rem 1.5rem', minHeight: 'calc(100vh - 100px)' }}>
      {/* Hero Section */}
      <section className="text-center animate-fade-in" style={{ marginTop: '2rem', marginBottom: '6rem' }}>
        <div style={{ display: 'inline-block', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)', padding: '0.5rem 1.25rem', borderRadius: '999px', fontWeight: 600, marginBottom: '2rem', border: '1px solid rgba(16, 185, 129, 0.2)', fontSize: '0.875rem' }}>
          ✨ すべての便利機能が完全無料
        </div>
        <h1 className="hero-title" style={{ fontSize: '3.5rem', marginBottom: '1.5rem', lineHeight: 1.2 }}>
          URLをスマートに。<br />
          <span className="text-gradient">必要なすべてを</span>安全・シンプルに提供
        </h1>
        <p style={{ fontSize: '1.125rem', color: 'var(--text-muted)', maxWidth: '650px', margin: '0 auto 2.5rem', lineHeight: 1.6 }}>
          通常は有料プランとなる「URLの文字列カスタマイズ」も無料。<br />
          最大300件の一括生成やQRコード、高機能なアクセス解析まで、<br />
          マーケティングに必要なすべてをこれ一つで提供します。
        </p>
        <div className="flex justify-center gap-4 hero-buttons">
          <Link href="/register" className="btn btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.125rem' }}>
            無料で始める <ArrowRight size={20} />
          </Link>
          <Link href="#details" className="btn btn-secondary" style={{ padding: '1rem 2.5rem', fontSize: '1.125rem' }}>
            詳しい機能を見る
          </Link>
        </div>
      </section>

      {/* Benefits Summary Section */}
      <section id="features" style={{ marginBottom: '6rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem' }}>

          <div className="glass-panel" style={{ padding: '2rem' }}>
            <div style={{ background: 'var(--surface-hover)', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
              <LinkIcon size={24} color="var(--primary)" />
            </div>
            <h3 style={{ fontSize: '1.25rem' }}>お好みの文字でカスタマイズ</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>
              キャンペーン名やブランド名など、お客様に伝わりやすい意味のある文字列（識別用テキスト）を指定できます。
            </p>
          </div>

          <div className="glass-panel" style={{ padding: '2rem' }}>
            <div style={{ background: 'var(--surface-hover)', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
              <Zap size={24} color="var(--primary)" />
            </div>
            <h3 style={{ fontSize: '1.25rem' }}>数百件の一括短縮処理</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>
              数十〜数百（1回最大300件）の長いURLもシートからコピペして一括変換。大量のリンク作成を一瞬で終わらせます。
            </p>
          </div>

          <div className="glass-panel" style={{ padding: '2rem' }}>
            <div style={{ background: 'var(--surface-hover)', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
              <QrCode size={24} color="var(--primary)" />
            </div>
            <h3 style={{ fontSize: '1.25rem' }}>QRコード自動生成</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>
              URLの作成と同時にQRコードも即座に自動生成。オフライン施策との連動やスマホからの流入を強力にサポートします。
            </p>
          </div>

          <div className="glass-panel" style={{ padding: '2rem' }}>
            <div style={{ background: 'var(--surface-hover)', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
              <ShieldCheck size={24} color="var(--primary)" />
            </div>
            <h3 style={{ fontSize: '1.25rem' }}>安心・安全なシステム</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>
              最新のクラウドデータベース（Supabase）を採用し、安定かつセキュアなリダイレクト基盤を採用しています。
            </p>
          </div>

        </div>
      </section>

      {/* Detailed Features with Mockups Section */}
      <section id="details" style={{ marginBottom: '6rem' }}>
        <h2 className="text-center" style={{ fontSize: '2.5rem', marginBottom: '4rem' }}>できることの詳細</h2>

        {/* Detail 1: URL Customization */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', alignItems: 'center', marginBottom: '6rem' }}>
          <div style={{ flex: '1 1 350px' }}>
            <h3 style={{ fontSize: '1.75rem', marginBottom: '1.5rem' }}>通常は有料の「カスタムURL」が無料で使い放題</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              他社の短縮URLサービスでは高額な月額課金が必要となるケースが多い「URL前半の文字列カスタマイズ」が、完全無料で使用できます。
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-muted)' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}><CheckCircle2 size={18} color="var(--success)" /> クリックへの心理的ハードルを下げCTRを向上</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}><CheckCircle2 size={18} color="var(--success)" /> スパムや怪しいリンクだと誤認されるリスクを低減</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={18} color="var(--success)" /> URLを一目見るだけで何のキャンペーンか把握可能</li>
            </ul>
          </div>
          <div style={{ flex: '1 1 350px' }}>
            <div className="glass-panel" style={{ padding: '2.5rem', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'var(--primary-glow)' }}></div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>設定したいテキスト（任意）</label>
              <div style={{ display: 'flex', alignItems: 'center', background: 'var(--background)', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid var(--primary)', marginBottom: '1.5rem', boxShadow: '0 0 0 2px rgba(99, 102, 241, 0.1)' }}>
                <span style={{ color: 'var(--text-muted)' }}>slf.onl / </span>
                <span style={{ fontWeight: 600, color: 'var(--text)', borderRight: '2px solid var(--primary)', paddingRight: '2px' }}>summer-sale</span>
                <span style={{ color: 'var(--text-muted)' }}> / e2b4x</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--success)', fontSize: '0.875rem' }}>
                <CheckCircle2 size={16} /> カスタマイズが適用されました
              </div>
            </div>
          </div>
        </div>

        {/* Detail 2: Bulk Shortening */}
        <div style={{ display: 'flex', flexWrap: 'wrap-reverse', gap: '4rem', alignItems: 'center', marginBottom: '6rem' }}>
          <div style={{ flex: '1 1 350px' }}>
            <div className="glass-panel" style={{ padding: '2.5rem', position: 'relative' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'var(--primary-glow)' }}></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', alignItems: 'flex-end' }}>
                <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>対象URL（改行区切り）</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--primary)', background: 'rgba(99, 102, 241, 0.1)', padding: '4px 8px', borderRadius: '4px' }}>最大 300 件まで</span>
              </div>
              <div style={{ background: 'var(--background)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '0.875rem', fontFamily: 'monospace', lineHeight: 1.8, height: '140px', overflow: 'hidden' }}>
                https://example.com/products/item-a?utm_...<br />
                https://example.com/products/item-b?utm_...<br />
                https://example.com/products/item-c?utm_...<br />
                https://example.com/products/item-d?utm_...<br />
                ...
              </div>
              <div style={{ marginTop: '1.5rem', height: '44px', background: 'var(--primary)', borderRadius: '8px', opacity: 0.9, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.9rem', fontWeight: 500 }}>
                一括で短縮する
              </div>
            </div>
          </div>
          <div style={{ flex: '1 1 350px' }}>
            <h3 style={{ fontSize: '1.75rem', marginBottom: '1.5rem' }}>Excel等のデータと連携しやすい一括生成</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              メルマガの差し込み用URLや、大量のキャンペーン個別リンクなど、最大300件までの長大なURL群をコピペだけで一瞬にして一括短縮できます。
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: 1.7 }}>
              1つずつ手作業で変換する手間を省き、作業時間を数分の一に短縮。転記ミスや漏れも防ぐことができます。
            </p>
          </div>
        </div>

        {/* Detail 3: Analytics */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', alignItems: 'center', marginBottom: '6rem' }}>
          <div style={{ flex: '1 1 350px' }}>
            <h3 style={{ fontSize: '1.75rem', marginBottom: '1.5rem' }}>直感的な分析ダッシュボード</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              どのリンクが、いつクリックされたのか？「月別」「週別」「日別」はもちろん、効果測定に重要な「時間帯別」の細かな傾向までグラフで可視化します。
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: 1.7 }}>
              ターゲット層がアクティブな時間を正確に把握することで、次回以降のプロモーション配信の精度を劇的に向上させます。
            </p>
          </div>
          <div style={{ flex: '1 1 350px' }}>
            <div className="glass-panel" style={{ padding: '2rem', position: 'relative' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'var(--primary-glow)' }}></div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '1.125rem', fontWeight: 600 }}>クリック推移</div>
                <div style={{ display: 'flex', gap: '0.25rem', background: 'var(--bg-color)', padding: '0.25rem', borderRadius: '6px' }}>
                  <div style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem', color: 'var(--text-muted)', cursor: 'pointer' }}>月別</div>
                  <div style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem', color: 'var(--text-muted)', cursor: 'pointer' }}>週別</div>
                  <div style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem', color: 'white', background: 'var(--primary)', borderRadius: '4px', cursor: 'pointer' }}>日別</div>
                  <div style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem', color: 'var(--text-muted)', cursor: 'pointer' }}>時間帯別</div>
                </div>
              </div>
              {/* Generic Line/Bar Chart Mock */}
              <div style={{ position: 'relative', height: '140px', borderBottom: '1px solid var(--border-color)', borderLeft: '1px solid var(--border-color)', paddingBottom: '0.5rem', paddingLeft: '0.5rem', marginBottom: '0.75rem' }}>
                {/* Mock grid lines */}
                <div style={{ position: 'absolute', top: '25%', left: '0.5rem', right: 0, borderBottom: '1px dashed var(--border-color)', opacity: 0.5 }}></div>
                <div style={{ position: 'absolute', top: '50%', left: '0.5rem', right: 0, borderBottom: '1px dashed var(--border-color)', opacity: 0.5 }}></div>
                <div style={{ position: 'absolute', top: '75%', left: '0.5rem', right: 0, borderBottom: '1px dashed var(--border-color)', opacity: 0.5 }}></div>
                {/* Bars */}
                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', height: '100%', width: '100%', paddingTop: '1rem' }}>
                  <div style={{ width: '8%', height: '30%', background: 'var(--primary)', opacity: 0.8, borderRadius: '4px 4px 0 0' }}></div>
                  <div style={{ width: '8%', height: '60%', background: 'var(--primary)', opacity: 0.8, borderRadius: '4px 4px 0 0' }}></div>
                  <div style={{ width: '8%', height: '45%', background: 'var(--primary)', opacity: 0.8, borderRadius: '4px 4px 0 0' }}></div>
                  <div style={{ width: '8%', height: '95%', background: 'var(--primary)', opacity: 0.8, borderRadius: '4px 4px 0 0' }}></div>
                  <div style={{ width: '8%', height: '80%', background: 'var(--primary)', opacity: 0.8, borderRadius: '4px 4px 0 0' }}></div>
                  <div style={{ width: '8%', height: '55%', background: 'var(--primary)', opacity: 0.8, borderRadius: '4px 4px 0 0' }}></div>
                  <div style={{ width: '8%', height: '40%', background: 'var(--primary)', opacity: 0.8, borderRadius: '4px 4px 0 0' }}></div>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.75rem', padding: '0 0.5rem' }}>
                <span>02/01</span><span>02/03</span><span>02/05</span><span>02/07</span>
              </div>
            </div>
          </div>
        </div>

        {/* Detail 4: QR Code Generation */}
        <div style={{ display: 'flex', flexWrap: 'wrap-reverse', gap: '4rem', alignItems: 'center' }}>
          <div style={{ flex: '1 1 350px' }}>
            <div className="glass-panel" style={{ padding: '2.5rem', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'var(--primary-glow)' }}></div>
              <div style={{ background: 'white', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-color)', marginBottom: '1.5rem', display: 'inline-block' }}>
                {/* Mock QR Code Pattern via CSS grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '4px', width: '120px', height: '120px' }}>
                  <div style={{ background: '#000', width: '100%', height: '100%' }}></div>
                  <div style={{ background: '#000', width: '100%', height: '100%' }}></div>
                  <div style={{ background: 'transparent' }}></div>
                  <div style={{ background: '#000', width: '100%', height: '100%' }}></div>
                  <div style={{ background: '#000', width: '100%', height: '100%' }}></div>
                  <div style={{ background: '#000', width: '100%', height: '100%' }}></div>
                  <div style={{ background: 'transparent' }}></div>
                  <div style={{ background: '#000', width: '100%', height: '100%' }}></div>
                  <div style={{ background: 'transparent' }}></div>
                  <div style={{ background: '#000', width: '100%', height: '100%' }}></div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--surface-hover)', padding: '0.5rem 1rem', borderRadius: '6px', fontSize: '0.875rem', fontWeight: 500, border: '1px solid var(--border-color)', cursor: 'pointer' }}>
                <Download size={16} /> QRコード（PNG）をダウンロード
              </div>
            </div>
          </div>
          <div style={{ flex: '1 1 350px' }}>
            <h3 style={{ fontSize: '1.75rem', marginBottom: '1.5rem' }}>QRコードの即時・自動生成</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              短縮URLを作成するたびに、ダウンロード可能な「QRコード（PNG画像）」が自動で即座に発行されます。
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: 1.7 }}>
              別途QRコード作成ツールを開く手間がなくなり、チラシ、名刺、パンフレットといった「オフライン媒体」からオンラインへのシームレスな誘導と「効果測定」が可能になります。
            </p>
          </div>
        </div>

      </section>

      {/* CTA Section */}
      <section className="text-center glass-panel animate-fade-in" style={{ padding: '4rem 2rem', marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>今すぐリンクを最適化しましょう</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.125rem', margin: '0 auto 2.5rem', maxWidth: '600px', lineHeight: 1.6 }}>
          クレジットカードの登録は不要。<br />
          すべてのパワフルな機能を、最初から制限なくお試しいただけます。
        </p>
        <Link href="/register" className="btn btn-primary" style={{ padding: '1rem 3rem', fontSize: '1.125rem', display: 'inline-block' }}>
          無料でアカウント作成
        </Link>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--border-color)', paddingTop: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
        <p>&copy; {new Date().getFullYear()} ShortLinkify. All rights reserved.</p>
      </footer>
    </div>
  );
}
