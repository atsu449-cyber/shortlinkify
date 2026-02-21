'use client';
import { useState } from 'react';
import Link from 'next/link';
import { KeyRound, ArrowLeft } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');

    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?next=/reset-password`,
    });

    if (error) {
      setErrorMsg(`エラー: ${error.message}`);
      setIsSubmitting(false);
    } else {
      setIsSubmitting(false);
      setIsSuccess(true);
    }
  };

  return (
    <div className="container flex items-center justify-center" style={{ minHeight: 'calc(100vh - 120px)' }}>
      <div className="glass-panel animate-fade-in" style={{ width: '100%', maxWidth: '400px', padding: '2.5rem' }}>
        <div className="mb-4">
          <Link href="/login" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', color: 'var(--text-muted)', fontSize: '0.875rem', textDecoration: 'none', marginBottom: '1rem' }}>
            <ArrowLeft size={16} /> ログインに戻る
          </Link>
        </div>

        <div className="text-center mb-4">
          <div style={{ background: 'var(--primary-glow)', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
            <KeyRound size={32} color="var(--primary)" />
          </div>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>パスワードの再設定</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            ご登録のメールアドレスを入力してください。<br />
            パスワード再設定用のリンクをお送りします。
          </p>
        </div>

        {isSuccess ? (
          <div style={{ textAlign: 'center', padding: '1.25rem', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '8px', color: 'var(--success)' }}>
            パスワード再設定メールを送信しました。<br />
            メール内のリンクから新しいパスワードを設定してください。
            <div style={{ display: 'block', marginTop: '1rem', fontSize: '0.8rem', opacity: 0.85, background: 'rgba(0,0,0,0.03)', padding: '0.5rem', borderRadius: '4px' }}>
              ※メールが届かない場合は、<strong>迷惑メールフォルダ</strong>などに振り分けられている可能性がありますので、念のためご確認ください。
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {errorMsg && (
              <div style={{ color: 'var(--danger)', fontSize: '0.875rem', background: 'rgba(239, 68, 68, 0.1)', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
                {errorMsg}
              </div>
            )}
            <div>
              <label htmlFor="email">メールアドレス</label>
              <input
                type="email"
                id="email"
                placeholder="name@company.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem' }} disabled={isSubmitting}>
              {isSubmitting ? '送信中...' : '再設定メールを送信する'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
