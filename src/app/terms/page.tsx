import Link from 'next/link';

export const metadata = {
  title: '利用規約 - ShortLinkify',
  description: 'ShortLinkifyの利用規約です。',
};

export default function TermsPage() {
  return (
    <div className="container" style={{ padding: '4rem 1.5rem', minHeight: '100vh', maxWidth: '800px', margin: '0 auto' }}>
      <div className="glass-panel" style={{ padding: '3rem', background: 'white' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '2rem', borderBottom: '2px solid var(--border-color)', paddingBottom: '1rem' }}>利用規約</h1>

        <div style={{ lineHeight: 1.8, color: 'var(--text-main)' }}>
          <p style={{ marginBottom: '1.5rem' }}>
            この利用規約（以下、「本規約」）は、ShortLinkify（以下、「本サービス」）の提供条件および運用者とユーザーの皆様との間の権利義務関係を定めるものです。本サービスをご利用になる場合は、本規約に同意いただく必要があります。
          </p>

          <h2 style={{ fontSize: '1.25rem', marginTop: '2rem', marginBottom: '1rem', color: 'var(--text-main)' }}>第1条（適用）</h2>
          <p style={{ marginBottom: '1rem' }}>
            本規約は、ユーザーと運用者との間の本サービスの利用に関わる一切の関係に適用されるものとします。
          </p>

          <h2 style={{ fontSize: '1.25rem', marginTop: '2rem', marginBottom: '1rem', color: 'var(--text-main)' }}>第2条（ユーザー登録）</h2>
          <p style={{ marginBottom: '1rem' }}>
            登録希望者が当社の定める方法によってユーザー登録を申請し、運用者がこれを承認することによって、ユーザー登録が完了するものとします。<br />
            運用者は、ユーザー登録の申請者に以下の事由があると判断した場合、ユーザー登録の申請を承認しないことがあり、その理由については一切の開示義務を負わないものとします。
            <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
              <li>虚偽の事項を届け出た場合</li>
              <li>本規約に違反したことがある者からの申請である場合</li>
              <li>その他、運用者がユーザー登録を相当でないと判断した場合</li>
            </ul>
          </p>

          <h2 style={{ fontSize: '1.25rem', marginTop: '2rem', marginBottom: '1rem', color: 'var(--text-main)' }}>第3条（禁止事項）</h2>
          <p style={{ marginBottom: '1rem' }}>
            ユーザーは、本サービスの利用にあたり、以下の行為をしてはなりません。運用者は、以下の行為に該当すると判断した場合、事前の通知なく生成された短縮URLの削除およびアカウントの停止措置を行うことができます。
            <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
              <li>法令または公序良俗に違反する行為</li>
              <li>犯罪行為に関連する行為</li>
              <li>スパムメール、フィッシングサイト、マルウェア等への誘導を目的として短縮URLを利用する行為</li>
              <li>サーバーまたはネットワークの機能を破壊したり、妨害したりする行為</li>
              <li>本サービスの運営を妨害するおそれのある行為</li>
              <li>他のユーザーに関する個人情報等を収集または蓄積する行為</li>
              <li>他のユーザーに成りすます行為</li>
              <li>本サービスに関連して、反社会的勢力に対して直接または間接に利益を供与する行為</li>
              <li>その他、運用者が不適切と判断する行為</li>
            </ul>
          </p>

          <h2 style={{ fontSize: '1.25rem', marginTop: '2rem', marginBottom: '1rem', color: 'var(--text-main)' }}>第4条（本サービスの提供の停止等）</h2>
          <p style={{ marginBottom: '1rem' }}>
            運用者は、以下のいずれかの事由があると判断した場合、ユーザーに事前に通知することなく本サービスの全部または一部の提供を停止または中断することができるものとします。これによってユーザーに生じた不利益または損害について、運用者は一切の責任を負わないものとします。
            <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
              <li>本サービスにかかるコンピュータシステムの保守点検または更新を行う場合</li>
              <li>地震、落雷、火災、停電または天災などの不可抗力により、本サービスの提供が困難となった場合</li>
              <li>コンピュータまたは通信回線等が事故により停止した場合</li>
              <li>その他、運用者が本サービスの提供が困難と判断した場合</li>
            </ul>
          </p>

          <h2 style={{ fontSize: '1.25rem', marginTop: '2rem', marginBottom: '1rem', color: 'var(--text-main)' }}>第5条（免責事項）</h2>
          <p style={{ marginBottom: '1rem' }}>
            運用者は、本サービスに事実上または法律上の瑕疵（安全性、信頼性、正確性、完全性、有効性、特定の目的への適合性、セキュリティなどに関する欠陥、エラーやバグ、権利侵害などを含みます。）がないことを明示的にも黙示的にも保証しておりません。<br />
            運用者は、本サービスに起因してユーザーに生じたあらゆる損害について一切の責任を負いません。本サービスを利用したマーケティング活動やプロモーションの結果等に関して、運用者は保証を行いません。
          </p>

          <h2 style={{ fontSize: '1.25rem', marginTop: '2rem', marginBottom: '1rem', color: 'var(--text-main)' }}>第6条（サービス内容の変更等）</h2>
          <p style={{ marginBottom: '1rem' }}>
            運用者は、ユーザーに通知することなく、本サービスの内容を変更しまたは本サービスの提供を中止することができるものとし、これによってユーザーに生じた損害について一切の責任を負いません。
          </p>

          <h2 style={{ fontSize: '1.25rem', marginTop: '2rem', marginBottom: '1rem', color: 'var(--text-main)' }}>第7条（利用規約の変更）</h2>
          <p style={{ marginBottom: '1rem' }}>
            運用者は、必要と判断した場合には、ユーザーに通知することなくいつでも本規約を変更することができるものとします。なお、本規約の変更後、本サービスの利用を開始した場合には、当該ユーザーは変更後の規約に同意したものとみなします。
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
