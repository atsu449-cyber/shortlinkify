import Link from 'next/link';

export const metadata = {
  title: 'プライバシーポリシー - ShortLinkify',
  description: 'ShortLinkifyのプライバシーポリシーです。',
};

export default function PrivacyPage() {
  return (
    <div className="container" style={{ padding: '4rem 1.5rem', minHeight: '100vh', maxWidth: '800px', margin: '0 auto' }}>
      <div className="glass-panel" style={{ padding: '3rem', background: 'white' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '2rem', borderBottom: '2px solid var(--border-color)', paddingBottom: '1rem' }}>プライバシーポリシー</h1>

        <div style={{ lineHeight: 1.8, color: 'var(--text-main)' }}>
          <p style={{ marginBottom: '1.5rem' }}>
            ShortLinkify（以下、「本サービス」）は、本サービスを利用する皆様（以下、「ユーザー」）の個人情報の取扱いについて、以下のとおりプライバシーポリシー（以下、「本ポリシー」）を定めます。
          </p>

          <h2 style={{ fontSize: '1.25rem', marginTop: '2rem', marginBottom: '1rem', color: 'var(--text-main)' }}>第1条（収集する個人情報）</h2>
          <p style={{ marginBottom: '1rem' }}>
            本サービスは、ユーザーが利用登録をする際に以下の個人情報をお尋ねすることがあります。
            <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
              <li>氏名、メールアドレス等の連絡先情報</li>
              <li>会社名、部署名、役職、職種等の所属に関する情報</li>
              <li>本サービスの利用履歴、生成された短縮URLおよびアクセス解析データ</li>
              <li>その他、本サービスの提供にあたり必要な情報</li>
            </ul>
          </p>

          <h2 style={{ fontSize: '1.25rem', marginTop: '2rem', marginBottom: '1rem', color: 'var(--text-main)' }}>第2条（個人情報を収集・利用する目的）</h2>
          <p style={{ marginBottom: '1rem' }}>
            本サービスが個人情報を収集・利用する目的は以下のとおりです。
            <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
              <li>本サービスの提供および運営のため</li>
              <li>ユーザーからのお問い合わせに回答するため</li>
              <li>ユーザーが利用中の本サービスの新機能、更新情報、キャンペーン等および運用者が提供する他のサービスの案内のメールを送付するため（マーケティング活動、広告配信への利用を含みます）</li>
              <li>メンテナンス、重要なお知らせなど必要に応じたご連絡のため</li>
              <li>利用規約に違反したユーザーや、不正・不当な目的で本サービスを利用しようとするユーザーの特定をし、ご利用をお断りするため</li>
              <li>登録情報の閲覧や変更、削除、ご利用状況の閲覧を行っていただくため</li>
              <li>本サービスの機能改善、新規サービスの開発などに役立てるため</li>
              <li>上記の利用目的に付随する目的</li>
            </ul>
          </p>

          <h2 style={{ fontSize: '1.25rem', marginTop: '2rem', marginBottom: '1rem', color: 'var(--text-main)' }}>第3条（個人情報の第三者提供）</h2>
          <p style={{ marginBottom: '1rem' }}>
            本サービスは、次に掲げる場合を除いて、あらかじめユーザーの同意を得ることなく第三者に個人情報を提供することはありません。ただし、個人情報保護法その他の法令で認められる場合を除きます。
            <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
              <li>人の生命、身体または財産の保護のために必要がある場合であって、本人の同意を得ることが困難であるとき</li>
              <li>公衆衛生の向上または児童の健全な育成の推進のために特に必要がある場合であって、本人の同意を得ることが困難であるとき</li>
              <li>国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合であって、本人の同意を得ることにより当該事務の遂行に支障を及ぼすおそれがあるとき</li>
            </ul>
          </p>

          <h2 style={{ fontSize: '1.25rem', marginTop: '2rem', marginBottom: '1rem', color: 'var(--text-main)' }}>第4条（Cookie・アクセスログ等の取得）</h2>
          <p style={{ marginBottom: '1rem' }}>
            本サービスは、サービスの利便性向上、統計データの取得、および適切な広告配信等を目的として、Cookie（クッキー）やIPアドレス、アクセスログ等の情報を取得し、利用する場合があります。これら自体に個人を特定する情報は含まれません。
          </p>

          <h2 style={{ fontSize: '1.25rem', marginTop: '2rem', marginBottom: '1rem', color: 'var(--text-main)' }}>第5条（個人情報の訂正および削除）</h2>
          <p style={{ marginBottom: '1rem' }}>
            ユーザーは、自らの個人情報に誤りがある場合には、運用者が定める手続きにより、個人情報の訂正、追加または削除を請求することができます。
          </p>

          <h2 style={{ fontSize: '1.25rem', marginTop: '2rem', marginBottom: '1rem', color: 'var(--text-main)' }}>第6条（プライバシーポリシーの変更）</h2>
          <p style={{ marginBottom: '1rem' }}>
            本ポリシーの内容は、法令その他本ポリシーに別段の定めのある事項を除いて、ユーザーに通知することなく変更することができるものとします。変更後のプライバシーポリシーは、本サービス上に掲載したときから効力を生じるものとします。
          </p>

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
