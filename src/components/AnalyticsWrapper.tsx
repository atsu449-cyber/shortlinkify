'use client';

import { useState, useEffect } from 'react';
import { GoogleTagManager } from '@next/third-parties/google';

export default function AnalyticsWrapper({ gtmId }: { gtmId?: string }) {
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
      {gtmId && <GoogleTagManager gtmId={gtmId} />}
    </>
  );
}
