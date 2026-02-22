import Link from 'next/link';
import { ArrowRight, BarChart3, Link as LinkIcon, QrCode, Zap, ShieldCheck, CheckCircle2, Download, Sparkles } from 'lucide-react';

export default function Home() {
  return (
    <div className="container" style={{ padding: '2rem 1.5rem', minHeight: 'calc(100vh - 100px)' }}>
      {/* Hero Section */}
      <section className="text-center animate-fade-in hero-section" style={{ marginTop: '1rem', marginBottom: '4rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: '#0f172a', color: '#ffffff', padding: '0.35rem 1.25rem', borderRadius: '999px', fontWeight: 600, marginBottom: '1.25rem', border: '1px solid rgba(255, 255, 255, 0.1)', fontSize: '0.875rem', boxShadow: '0 4px 14px 0 rgba(0,0,0,0.1)' }}>
          <Sparkles size={16} color="#ffffff" /> すべての機能が永久無料・生成数も無制限
        </div>
        <h1 className="hero-title" style={{ fontSize: '3rem', marginBottom: '1rem', lineHeight: 1.2 }}>
          URLをスマートに。<br />
          <span className="text-gradient">必要なすべてを</span><br className="sp-only" />安全・シンプルに提供
        </h1>
        <p style={{ fontSize: '1.125rem', color: 'var(--text-muted)', maxWidth: '650px', margin: '0 auto 2.5rem', lineHeight: 1.6 }}>
          通常は有料プランとなる<br className="sp-only" />「URLの文字列カスタマイズ」も無料。<br />
          最大300件の一括生成やQRコード、<br className="sp-only" />高機能なアクセス解析も可能
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
            <h3 style={{ fontSize: '1.25rem' }}>無制限・一括短縮機能</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>
              生成数や利用期限は完全に無制限。長大なURL群も対象をコピペするだけで一瞬（1回最大300件）で一括変換できます。
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
          <div style={{ flex: '1 1 min(100%, 350px)' }}>
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
          <div style={{ flex: '1 1 min(100%, 350px)', minWidth: 0 }}>
            <div className="glass-panel" style={{ padding: '2.5rem', position: 'relative', overflow: 'hidden' }}>
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
          <div style={{ flex: '1 1 min(100%, 350px)', minWidth: 0 }}>
            <div className="glass-panel" style={{ padding: '2.5rem', position: 'relative', overflow: 'hidden' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', alignItems: 'flex-end', flexWrap: 'wrap', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>対象URL（改行区切り）</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--primary)', background: 'rgba(99, 102, 241, 0.1)', padding: '4px 8px', borderRadius: '4px' }}>最大 300 件まで</span>
              </div>
              <div style={{ background: 'var(--background)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '0.875rem', fontFamily: 'monospace', lineHeight: 1.8, height: '140px', overflow: 'hidden', wordBreak: 'break-all' }}>
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
          <div style={{ flex: '1 1 min(100%, 350px)' }}>
            <h3 style={{ fontSize: '1.75rem', marginBottom: '1.5rem' }}>無制限のURL生成と<br className="sp-only" />効率的な一括処理</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              短縮URLのトータル生成数に上限はなく、作成したリンクの期限切れもありません。あらゆる施策で気兼ねなく無制限にご活用いただけます。
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: 1.7 }}>
              さらに、メルマガの差し込み用URLなど、最大300件までの長大なURL群もコピペだけで一瞬にして一括短縮できます。<br />
              1つずつ手作業で変換する手間を省き、作業時間を数分の一に短縮。転記ミスや漏れも防ぐことができます。
            </p>
          </div>
        </div>

        {/* Detail 3: Analytics */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', alignItems: 'center', marginBottom: '6rem' }}>
          <div style={{ flex: '1 1 min(100%, 350px)' }}>
            <h3 style={{ fontSize: '1.75rem', marginBottom: '1.5rem' }}>直感的な分析ダッシュボード</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              どのリンクが、いつクリックされたのか？「月別」「週別」「日別」はもちろん、効果測定に重要な「時間帯別」の細かな傾向までグラフで可視化します。
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: 1.7 }}>
              さらに、マーケティングに直結するクリーンな生データ（日時・デバイス・リファラ）を<strong style={{ color: 'var(--primary)' }}>CSV形式でダウンロード可能</strong>。社内BIツールや既存のExcelレポートへシームレスに転記でき、ターゲット層がアクティブな時間を正確に把握することで、次回以降のプロモーション配信の精度を劇的に向上させます。
            </p>
          </div>
          <div style={{ flex: '1 1 min(100%, 350px)', minWidth: 0 }}>
            <div className="glass-panel" style={{ padding: '0', position: 'relative', overflow: 'hidden' }}>
              <div style={{ background: 'white', padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontWeight: 600, color: 'var(--text-main)' }}>
                  <BarChart3 size={18} color="var(--primary)" /> アクセス推移
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.25rem', marginBottom: '1.5rem' }}>
                  <div style={{ padding: '0.35rem 1rem', fontSize: '0.75rem', color: 'white', background: 'var(--primary)', borderRadius: '4px', cursor: 'pointer', fontWeight: 500 }}>時間別</div>
                  <div style={{ padding: '0.35rem 1rem', fontSize: '0.75rem', color: 'var(--text-muted)', background: 'var(--bg-color)', borderRadius: '4px', cursor: 'pointer' }}>日別</div>
                  <div style={{ padding: '0.35rem 1rem', fontSize: '0.75rem', color: 'var(--text-muted)', background: 'var(--bg-color)', borderRadius: '4px', cursor: 'pointer' }}>週別</div>
                  <div style={{ padding: '0.35rem 1rem', fontSize: '0.75rem', color: 'var(--text-muted)', background: 'var(--bg-color)', borderRadius: '4px', cursor: 'pointer' }}>月別</div>
                </div>
                {/* Line Chart Mock with SVG */}
                <div style={{ position: 'relative', height: '140px', width: '100%', marginBottom: '0.75rem' }}>
                  <svg width="100%" height="100%" viewBox="0 0 300 100" preserveAspectRatio="none">
                    {/* Grid lines */}
                    <line x1="0" y1="20" x2="300" y2="20" stroke="var(--border-color)" strokeWidth="1" />
                    <line x1="0" y1="40" x2="300" y2="40" stroke="var(--border-color)" strokeWidth="1" />
                    <line x1="0" y1="60" x2="300" y2="60" stroke="var(--border-color)" strokeWidth="1" />
                    <line x1="0" y1="80" x2="300" y2="80" stroke="var(--border-color)" strokeWidth="1" />
                    <line x1="0" y1="100" x2="300" y2="100" stroke="var(--border-color)" strokeWidth="1" />

                    {/* Fill area */}
                    <path d="M0 100 L180 100 L200 10 L220 100 L240 100 L260 100 L280 10 L300 100 Z" fill="rgba(37, 99, 235, 0.15)" />
                    {/* Line series */}
                    <path d="M0 100 L180 100 L200 10 L220 100 L240 100 L260 100 L280 10 L300 100" fill="none" stroke="#2563eb" strokeWidth="2" />

                    {/* Base tracking line */}
                    <line x1="0" y1="100" x2="300" y2="100" stroke="#2563eb" strokeWidth="2" />

                    {/* Points */}
                    <circle cx="200" cy="10" r="3" fill="white" stroke="#2563eb" strokeWidth="2" />
                    <circle cx="280" cy="10" r="3" fill="white" stroke="#2563eb" strokeWidth="2" />
                    <circle cx="0" cy="100" r="2" fill="#90b4f8" /><circle cx="30" cy="100" r="2" fill="#90b4f8" /><circle cx="60" cy="100" r="2" fill="#90b4f8" /><circle cx="90" cy="100" r="2" fill="#90b4f8" /><circle cx="120" cy="100" r="2" fill="#90b4f8" /><circle cx="150" cy="100" r="2" fill="#90b4f8" />
                  </svg>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.65rem' }}>
                  <span>16:00</span><span>18:00</span><span>20:00</span><span>22:00</span><span>0:00</span><span>2:00</span><span>4:00</span><span>6:00</span><span>8:00</span><span>10:00</span><span>12:00</span><span>14:00</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detail 4: QR Code Generation */}
        <div style={{ display: 'flex', flexWrap: 'wrap-reverse', gap: '4rem', alignItems: 'center' }}>
          <div style={{ flex: '1 1 min(100%, 350px)', minWidth: 0 }}>
            <div className="glass-panel" style={{ padding: '0', position: 'relative', overflow: 'hidden' }}>
              <div style={{ background: '#f1f5f9', padding: '2.5rem 1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '1.5rem' }}>
                  <QrCode size={20} /> QRコード
                </div>
                <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', marginBottom: '1.5rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', display: 'flex', justifyContent: 'center' }}>
                  <img src="/qr-demo.png" alt="QR Code" width={150} height={150} style={{ display: 'block', borderRadius: '4px' }} />
                </div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem', fontFamily: 'monospace', wordBreak: 'break-all', textAlign: 'center' }}>
                  https://www.slf.onl/companyname/3tbsn
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', width: '100%', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button style={{ padding: '0.6rem 1.75rem', background: 'white', border: '1px solid var(--border-color)', borderRadius: '6px', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-main)', cursor: 'pointer' }}>閉じる</button>
                  <button style={{ padding: '0.6rem 1.75rem', background: '#2563eb', border: 'none', borderRadius: '6px', fontSize: '0.875rem', fontWeight: 600, color: 'white', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}><Download size={16} /> 画像を保存</button>
                </div>
              </div>
            </div>
          </div>
          <div style={{ flex: '1 1 min(100%, 350px)' }}>
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

      {/* FAQ Section */}
      <section className="glass-panel" style={{ padding: '4rem 1.5rem', marginBottom: '4rem' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div style={{ display: 'inline-block', background: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary)', padding: '0.5rem 1rem', borderRadius: '999px', fontWeight: 600, marginBottom: '1rem' }}>
              FAQ
            </div>
            <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem' }}>よくあるご質問</h2>
            <p style={{ color: 'var(--text-muted)' }}>法人・個人の皆様からいただくご質問にお答えします。</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* FAQ Item 1 */}
            <div className="glass-panel" style={{ padding: '1.5rem', background: 'white' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.75rem', display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <span style={{ color: 'var(--primary)', fontWeight: 700 }}>Q.</span>
                <span>なぜこれほど高機能なのに、永久無料・無制限で使えるのですか？</span>
              </h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, fontSize: '0.95rem', paddingLeft: '1.8rem' }}>
                <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>A.</span> 当社ではShortLinkify単体での直接的なマネタイズ（有料化）ではなく、本ツールを入り口としたマーケティング支援や、別途展開している他事業とのシナジー効果による「トータルでの収益最大化」を事業モデルとしております。そのため、本システム自体はマーケティング・インフラとして機能制限なく、永続的に無料でご提供することが可能です。
              </p>
            </div>

            {/* FAQ Item 2 */}
            <div className="glass-panel" style={{ padding: '1.5rem', background: 'white' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.75rem', display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <span style={{ color: 'var(--primary)', fontWeight: 700 }}>Q.</span>
                <span>急にサービスが終了したり、作成したリンクが切れたりしませんか？</span>
              </h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, fontSize: '0.95rem', paddingLeft: '1.8rem' }}>
                <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>A.</span> ご安心ください。本サービスはモダンなサーバーレスアーキテクチャ（データベースにSupabase、ホスティングにVercel）を採用しており、ユーザー数やアクセス数の急激な増加に対しても自動でスケール（拡張）する強固なインフラストラクチャの上に構築されています。そのため、一時的なアクセス集中によるダウンや、インフラ維持コストの肥大化による突然のサービス終了のリスクを極小化しております。
              </p>
            </div>

            {/* FAQ Item 3 */}
            <div className="glass-panel" style={{ padding: '1.5rem', background: 'white' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.75rem', display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <span style={{ color: 'var(--primary)', fontWeight: 700 }}>Q.</span>
                <span>法人利用を検討しています。セキュリティやデータの扱いは安全ですか？</span>
              </h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, fontSize: '0.95rem', paddingLeft: '1.8rem' }}>
                <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>A.</span> はい、大企業のセキュリティ基準に対応できる水準を確保しております。通信はすべてSSL/TLSで暗号化され、アカウントの認証機能やデータベースへのアクセス権限（RLS）も厳格に管理されています。また、ご登録いただいた会員情報について無断での第三者提供は行わず、自社のプライバシーポリシーに則り適正に管理・運用いたします。悪質なスパムユーザー等に対しては、利用規約（反社会的勢力の排除・禁止事項）に基づき即時アカウント停止等の厳正な措置をとることで、プラットフォームの健全性を保っています。
              </p>
            </div>

            {/* FAQ Item 4 */}
            <div className="glass-panel" style={{ padding: '1.5rem', background: 'white' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.75rem', display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <span style={{ color: 'var(--primary)', fontWeight: 700 }}>Q.</span>
                <span>会員登録なしでも利用できますか？</span>
              </h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, fontSize: '0.95rem', paddingLeft: '1.8rem' }}>
                <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>A.</span> いいえ、安全なプラットフォーム運営のため、全ユーザー様に事前の無料アカウント登録をお願いしております。匿名での不正利用やフィッシング詐欺目的でのURL生成を根絶し、すべての皆様が安心して利用できる環境を提供するため、ご理解とご協力をお願いいたします。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--border-color)', paddingTop: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
        <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'center', gap: '1.5rem', fontSize: '0.875rem', flexWrap: 'wrap' }}>
          <Link href="/terms" style={{ color: 'var(--text-muted)', textDecoration: 'none' }} className="hover:text-primary">利用規約</Link>
          <Link href="/privacy" style={{ color: 'var(--text-muted)', textDecoration: 'none' }} className="hover:text-primary">プライバシーポリシー</Link>
          <Link href="/law" style={{ color: 'var(--text-muted)', textDecoration: 'none' }} className="hover:text-primary">特定商取引法に基づく表記</Link>
        </div>
        <p>&copy; {new Date().getFullYear()} ShortLinkify. All rights reserved.</p>
      </footer>
    </div>
  );
}
