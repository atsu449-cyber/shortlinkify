'use client';

import { useState, useEffect } from 'react';
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';

export default function AnalyticsWrapper({ gaId, gtmId }: { gaId?: string, gtmId?: string }) {
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('cookieConsent') === 'true') {
      setHasConsent(true);
    }

    const handleConsentUpdate = () => {
      if (localStorage.getItem('cookieConsent') === 'true') {
        setHasConsent(true);
      }
    };

    window.addEventListener('cookieConsentUpdated', handleConsentUpdate);
    return () => window.removeEventListener('cookieConsentUpdated', handleConsentUpdate);
  }, []);

  if (!hasConsent) return null;

  return (
    <>
      {gaId && <GoogleAnalytics gaId={gaId} />}
      {gtmId && <GoogleTagManager gtmId={gtmId} />}
    </>
  );
}
