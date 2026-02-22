'use client';

import { useState, useEffect } from 'react';

export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // コンポーネントマウント時にlocalStorageを確認
    const consent = localStorage.getItem('cookieConsent');
    // まだ同意も拒否も選択されていない場合のみ表示
    if (consent === null) {
      setShow(true);
    }
  }, []);

  const handleConsent = (agreed: boolean) => {
    localStorage.setItem('cookieConsent', agreed ? 'true' : 'false');
    setShow(false);

    // 同意された場合は即座にGA4を発火させるためカスタムイベントをディスパッチ
    if (agreed) {
      window.dispatchEvent(new Event('cookieConsentUpdated'));
    }
  };

  if (!show) return null;

  return (
    <div className="animate-fade-in" style={{
      position: 'fixed',
      bottom: 0, left: 0, right: 0,
      backgroundColor: '#ffffff',
      padding: '1.5rem',
      borderTop: '1px solid var(--border-color)',
      zIndex: 9999,
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '1.5rem',
      boxShadow: '0 -10px 40px rgba(0,0,0,0.1)'
    }}>
      <div style={{ flex: '1 1 600px', maxWidth: '800px' }}>
        <p style={{ margin: '0 0 0.5rem 0', fontWeight: 'bold', color: 'var(--primary)' }}>サイトの利用について（Cookieの同意）</p>
        <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          当サイトでは、利便性の向上とアクセス解析（Google Analytics等）のためにCookieを使用します。「同意する」をクリックすると、これらの目的でのCookie使用に同意したことになります。詳細についてはプライバシーポリシーをご確認ください。
        </p>
      </div>
      <div style={{ display: 'flex', gap: '1rem', flexShrink: 0 }}>
        <button onClick={() => handleConsent(false)} className="btn btn-secondary" style={{ padding: '0.5rem 1.5rem', fontWeight: 'bold' }}>拒否する</button>
        <button onClick={() => handleConsent(true)} className="btn btn-primary" style={{ padding: '0.5rem 1.5rem', fontWeight: 'bold' }}>同意する</button>
      </div>
    </div>
  );
}
