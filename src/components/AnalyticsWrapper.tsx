'use client';

import { useState, useEffect } from 'react';
import { GoogleAnalytics } from '@next/third-parties/google';

export default function AnalyticsWrapper({ gaId }: { gaId?: string }) {
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    // 初期ロード時の状態確認
    if (localStorage.getItem('cookieConsent') === 'true') {
      setHasConsent(true);
    }

    // バナーで「同意する」が押された際のイベントリスニング
    const handleConsentUpdate = () => {
      if (localStorage.getItem('cookieConsent') === 'true') {
        setHasConsent(true);
      }
    };

    window.addEventListener('cookieConsentUpdated', handleConsentUpdate);
    return () => window.removeEventListener('cookieConsentUpdated', handleConsentUpdate);
  }, []);

  // GA_IDが無いか、ユーザー同意が無い場合はタグを注入しない
  if (!gaId || !hasConsent) return null;

  return <GoogleAnalytics gaId={gaId} />;
}
