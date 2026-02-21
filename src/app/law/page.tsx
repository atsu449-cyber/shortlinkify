import Link from 'next/link';

export const metadata = {
  title: '特定商取引法に基づく表記 - ShortLinkify',
  description: 'ShortLinkifyの特定商取引法に基づく表記です。',
};

export default function LawPage() {
  return (
    <div className="container" style={{ padding: '4rem 1.5rem', minHeight: '100vh', maxWidth: '800px', margin: '0 auto' }}>
      <div className="glass-panel" style={{ padding: '3rem', background: 'white' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '2rem', borderBottom: '2px solid var(--border-color)', paddingBottom: '1rem' }}>特定商取引法に基づく表記</h1>

        <div style={{ lineHeight: 1.8, color: 'var(--text-main)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1.5rem' }}>
            <tbody>
              <tr>
                <th style={{ width: '30%', textAlign: 'left', padding: '1rem', borderBottom: '1px solid var(--border-color)', background: 'var(--bg-color)' }}>販売事業者（運営者）</th>
                <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>
                  アイマケラボ
                </td>
              </tr>
              <tr>
                <th style={{ width: '30%', textAlign: 'left', padding: '1rem', borderBottom: '1px solid var(--border-color)', background: 'var(--bg-color)' }}>運営責任者</th>
                <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>
                  アイマケラボ<br />
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>※運営責任者の氏名については、開示請求があった場合、法令に基づき遅滞なく開示します。</span>
                </td>
              </tr>
              <tr>
                <th style={{ width: '30%', textAlign: 'left', padding: '1rem', borderBottom: '1px solid var(--border-color)', background: 'var(--bg-color)' }}>所在地</th>
                <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>
                  請求があったら遅滞なく開示いたします。<br />
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>※事業者の所在地など、連絡先情報は開示請求があった場合、法令に基づき遅滞なく開示します。</span>
                </td>
              </tr>
              <tr>
                <th style={{ width: '30%', textAlign: 'left', padding: '1rem', borderBottom: '1px solid var(--border-color)', background: 'var(--bg-color)' }}>連絡先（お問い合わせ）</th>
                <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>
                  メール：aimarkelab@gmail.com<br />
                  お問い合わせはメールにてご連絡ください。<br />
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>※電話番号については、開示請求があった場合、法令に基づき遅滞なく開示します。</span>
                </td>
              </tr>
              <tr>
                <th style={{ width: '30%', textAlign: 'left', padding: '1rem', borderBottom: '1px solid var(--border-color)', background: 'var(--bg-color)' }}>利用料金</th>
                <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>
                  現在は全ての機能を無料で提供しております。<br />
                  将来的に有料プラン（月額・買い切り等）を提供する場合は、当サイト上の価格表等のご案内ページに表示します。
                </td>
              </tr>
              <tr>
                <th style={{ width: '30%', textAlign: 'left', padding: '1rem', borderBottom: '1px solid var(--border-color)', background: 'var(--bg-color)' }}>利用料金以外に必要な費用</th>
                <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>
                  インターネット接続料金、通信料金等はお客様のご負担となります。
                </td>
              </tr>
              <tr>
                <th style={{ width: '30%', textAlign: 'left', padding: '1rem', borderBottom: '1px solid var(--border-color)', background: 'var(--bg-color)' }}>支払方法・支払時期</th>
                <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>
                  現在は全て無料のため、お支払いは発生いたしません。<br />
                  （有料プラン提供開始時は、クレジットカード決済等の時期・方法をこちらに記載します）
                </td>
              </tr>
              <tr>
                <th style={{ width: '30%', textAlign: 'left', padding: '1rem', borderBottom: '1px solid var(--border-color)', background: 'var(--bg-color)' }}>サービス提供時期・引き渡し時期</th>
                <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>
                  ユーザー登録手続き後、即時にご利用可能となります。
                </td>
              </tr>
              <tr>
                <th style={{ width: '30%', textAlign: 'left', padding: '1rem', borderBottom: '1px solid var(--border-color)', background: 'var(--bg-color)' }}>返品・解約（退会）等について</th>
                <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>
                  デジタルサービスの性質上、返品・返金はお受けしておりません。<br />
                  解約（退会）は、本サービス上の設定画面からいつでも可能です。解約手続き完了後、アカウントは利用停止となります。
                </td>
              </tr>
              <tr>
                <th style={{ width: '30%', textAlign: 'left', padding: '1rem', borderBottom: '1px solid var(--border-color)', background: 'var(--bg-color)' }}>動作環境</th>
                <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>
                  当サイトを正常に閲覧・機能利用できる最新のWebブラウザ（Chrome, Safari, Edge等）。
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style={{ marginTop: '3rem', textAlign: 'center' }}>
          <Link href="/" className="btn btn-secondary" style={{ padding: '0.75rem 2rem' }}>
            トップページへ戻る
          </Link>
        </div>
      </div>
    </div>
  );
}
