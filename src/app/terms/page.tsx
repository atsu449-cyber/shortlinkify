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

          <h2 style={{ fontSize: '1.25rem', marginTop: '2rem', marginBottom: '1rem', color: 'var(--text-main)' }}>第4条（著作権・知的財産権）</h2>
          <p style={{ marginBottom: '1rem' }}>
            本サービスに関する一切の著作権その他の知的財産権（システム、ソフトウェア、デザイン、テキスト、画像、ロゴマーク等を含みますがこれらに限られません）は、運用者または正当な権限を有する第三者に帰属します。<br />
            ユーザーは、本サービスを利用することにより得られる情報を、運用者の事前の承諾なく、自らの私的利用または自社の社内利用の範囲を超えて、複製、改変、公衆送信等の行為をしてはならないものとします。
          </p>

          <h2 style={{ fontSize: '1.25rem', marginTop: '2rem', marginBottom: '1rem', color: 'var(--text-main)' }}>第5条（本サービスの提供の停止等）</h2>
          <p style={{ marginBottom: '1rem' }}>
            運用者は、以下のいずれかの事由があると判断した場合、ユーザーに事前に通知することなく本サービスの全部または一部の提供を停止または中断することができるものとします。これによってユーザーに生じた不利益または損害について、運用者は一切の責任を負わないものとします。
            <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
              <li>本サービスにかかるコンピュータシステムの保守点検または更新を行う場合</li>
              <li>地震、落雷、火災、停電または天災などの不可抗力により、本サービスの提供が困難となった場合</li>
              <li>コンピュータまたは通信回線等が事故により停止した場合</li>
              <li>その他、運用者が本サービスの提供が困難と判断した場合</li>
            </ul>
          </p>

          <h2 style={{ fontSize: '1.25rem', marginTop: '2rem', marginBottom: '1rem', color: 'var(--text-main)' }}>第6条（免責条項および損害賠償の制限）</h2>
          <p style={{ marginBottom: '1rem' }}>
            運用者は、本サービスに事実上または法律上の瑕疵（安全性、信頼性、正確性、完全性、有効性、特定の目的への適合性、セキュリティなどに関する欠陥、エラーやバグ、権利侵害などを含みます。）がないことを明示的にも黙示的にも保証しておりません。<br />
            運用者は、本サービスに起因してユーザーに生じたあらゆる損害について、運用者の故意または重過失による場合を除き、一切の責任を負いません。<br />
            なお、消費者契約法の適用その他の理由により、運用者がユーザーに対して損害賠償責任を負う場合であっても、運用者の賠償責任の範囲は、ユーザーに直接かつ現実に生じた通常の損害に限定されるものとし、逸失利益その他の特別損害については賠償の責任を負わないものとします。また、その場合における損害賠償の額は、当該損害が発生した月にユーザーが運用者に支払った利用料（無料の場合は1,000円）を上限とします。<br />
            本サービスを利用したマーケティング活動やプロモーションの結果等に関して、運用者は保証を行いません。
          </p>

          <h2 style={{ fontSize: '1.25rem', marginTop: '2rem', marginBottom: '1rem', color: 'var(--text-main)' }}>第7条（サービス内容の変更等）</h2>
          <p style={{ marginBottom: '1rem' }}>
            運用者は、ユーザーに通知することなく、本サービスの内容を変更しまたは本サービスの提供を中止することができるものとし、これによってユーザーに生じた損害について一切の責任を負いません。
          </p>

          <h2 style={{ fontSize: '1.25rem', marginTop: '2rem', marginBottom: '1rem', color: 'var(--text-main)' }}>第8条（反社会的勢力の排除）</h2>
          <p style={{ marginBottom: '1rem' }}>
            ユーザーは、現在、暴力団、暴力団員、暴力団員でなくなった時から5年を経過しない者、暴力団準構成員、暴力団関係企業、総会屋等、社会運動等標ぼうゴロまたは特殊知能暴力集団等、その他これらに準ずる者（以下これらを「暴力団員等」といいます。）に該当しないこと、および次の各号のいずれにも該当しないことを表明し、かつ将来にわたっても該当しないことを確約するものとします。
            <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
              <li>暴力団員等が経営を支配していると認められる関係を有すること</li>
              <li>暴力団員等が経営に実質的に関与していると認められる関係を有すること</li>
              <li>自己、自社もしくは第三者の不正の利益を図る目的または第三者に損害を加える目的をもってするなど、不当に暴力団員等を利用していると認められる関係を有すること</li>
              <li>暴力団員等に対して資金等を提供し、または便宜を供与するなどの関与をしていると認められる関係を有すること</li>
              <li>役員または経営に実質的に関与している者が暴力団員等と社会的に非難されるべき関係を有すること</li>
            </ul>
            運用者は、ユーザーが前項の確約に反して、不当な要求や脅迫行為を行った場合、何らの催告を要せず本サービスの利用を停止し、登録を解除することができるものとします。<br />
            運用者自身もまた、前項各号に定める暴力団員等に該当しないこと、および暴力団員等とのいかなる関係も有していないことを表明し、将来にわたって該当しないことを確約します。
          </p>

          <h2 style={{ fontSize: '1.25rem', marginTop: '2rem', marginBottom: '1rem', color: 'var(--text-main)' }}>第9条（分離可能性）</h2>
          <p style={{ marginBottom: '1rem' }}>
            本規約のいずれかの条項またはその一部が、法令等により無効または執行不能と判断された場合であっても、本規約の残りの規定は、継続して完全に効力を有するものとします。
          </p>

          <h2 style={{ fontSize: '1.25rem', marginTop: '2rem', marginBottom: '1rem', color: 'var(--text-main)' }}>第10条（利用規約の変更）</h2>
          <p style={{ marginBottom: '1rem' }}>
            運用者は、必要と判断した場合には、ユーザーに通知することなくいつでも本規約を変更することができるものとします。なお、本規約の変更後、本サービスの利用を開始した場合には、当該ユーザーは変更後の規約に同意したものとみなします。
          </p>

          <h2 style={{ fontSize: '1.25rem', marginTop: '2rem', marginBottom: '1rem', color: 'var(--text-main)' }}>第11条（準拠法・裁判管轄）</h2>
          <p style={{ marginBottom: '1rem' }}>
            本規約の解釈にあたっては、日本法を準拠法とします。<br />
            本サービスに関して紛争が生じた場合には、運用者の本店（または住所）所在地を管轄する地方裁判所を専属的合意管轄とします。
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
