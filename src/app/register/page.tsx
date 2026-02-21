'use client';
import { useState } from 'react';
import Link from 'next/link';
import { UserPlus, Eye, EyeOff } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    organization: '',
    department: '',
    jobType: '',
    role: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isAgreed, setIsAgreed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAgreed) {
      setErrorMsg('利用規約およびプライバシーポリシーへの同意が必要です。');
      return;
    }
    setIsLoading(true);
    setErrorMsg('');

    const supabase = createClient();

    // 1. ユーザーのサインアップ (Auth)
    const { data: authData, error: signUpError } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
    });

    if (signUpError) {
      setErrorMsg(`登録エラー: ${signUpError.message}`);
      setIsLoading(false);
      return;
    }

    if (authData.user) {
      // 2. attributesデータをprofilesテーブルに挿入
      const { error: profileError } = await supabase.from('profiles').insert({
        id: authData.user.id,
        email: formData.email,
        organization: formData.organization,
        department: formData.department,
        job_type: formData.jobType,
        role: formData.role
      });

      if (profileError) {
        setErrorMsg(`プロフィール保存エラー: ${profileError.message}`);
        setIsLoading(false);
        return;
      }

      // 成功したらダッシュボードへ遷移
      window.location.href = '/dashboard';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container flex items-center justify-center" style={{ minHeight: 'calc(100vh - 120px)', padding: '2rem 0' }}>
      <div className="glass-panel animate-fade-in" style={{ width: '100%', maxWidth: '500px', padding: '2.5rem' }}>
        <div className="text-center mb-4">
          <div style={{ background: 'var(--primary-glow)', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
            <UserPlus size={32} color="var(--primary)" />
          </div>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>無料アカウント作成</h1>
          <p style={{ color: 'var(--text-muted)' }}>ビジネスに役立つ短縮URLツールを始めましょう</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {errorMsg && (
            <div style={{ color: 'var(--danger)', fontSize: '0.875rem', background: 'rgba(239, 68, 68, 0.1)', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
              {errorMsg}
            </div>
          )}
          <div>
            <label htmlFor="email">メールアドレス</label>
            <input type="email" id="email" name="email" placeholder="name@company.com" required value={formData.email} onChange={handleChange} />
          </div>

          <div>
            <label htmlFor="password">パスワード</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="8文字以上"
                required
                minLength={8}
                value={formData.password}
                onChange={handleChange}
                style={{ width: '100%', paddingRight: '2.5rem' }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '0.75rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  padding: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <hr style={{ borderColor: 'var(--border-color)', margin: '0.5rem 0' }} />

          <div>
            <label htmlFor="organization">所属組織 / 会社名</label>
            <input type="text" id="organization" name="organization" placeholder="株式会社〇〇" required value={formData.organization} onChange={handleChange} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label htmlFor="department">部署</label>
              <input type="text" id="department" name="department" placeholder="営業部" required value={formData.department} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="jobType">職種</label>
              <select id="jobType" name="jobType" required value={formData.jobType} onChange={handleChange}>
                <option value="">選択してください</option>
                <optgroup label="経営関連">
                  <option value="代表取締役・社長・CEO">代表取締役・社長・CEO</option>
                  <option value="COO（最高執行責任者）">COO（最高執行責任者）</option>
                  <option value="CFO（最高財務責任者）">CFO（最高財務責任者）</option>
                  <option value="CMO（最高マーケティング責任者）">CMO（最高マーケティング責任者）</option>
                  <option value="CTO・CIO（最高技術・情報責任者）">CTO・CIO（最高技術・情報責任者）</option>
                  <option value="CHRO（最高人事責任者）">CHRO（最高人事責任者）</option>
                  <option value="取締役・執行役員・その他役員">取締役・執行役員・その他役員</option>
                </optgroup>
                <optgroup label="営業関連">
                  <option value="法人営業">法人営業</option>
                  <option value="個人営業">個人営業</option>
                  <option value="インサイドセールス">インサイドセールス</option>
                  <option value="カスタマーサクセス">カスタマーサクセス</option>
                </optgroup>
                <optgroup label="企画・事務・マーケティング関連">
                  <option value="経営企画・事業企画">経営企画・事業企画</option>
                  <option value="マーケティング・商品企画">マーケティング・商品企画</option>
                  <option value="広報・PR">広報・PR</option>
                  <option value="人事・労務">人事・労務</option>
                  <option value="総務・法務・知財">総務・法務・知財</option>
                  <option value="経理・財務・会計">経理・財務・会計</option>
                  <option value="一般事務・アシスタント">一般事務・アシスタント</option>
                </optgroup>
                <optgroup label="IT・エンジニア関連">
                  <option value="Web・アプリ開発エンジニア">Web・アプリ開発エンジニア</option>
                  <option value="インフラ・セキュリティエンジニア">インフラ・セキュリティエンジニア</option>
                  <option value="データサイエンティスト・AI">データサイエンティスト・AI</option>
                  <option value="PM・Webディレクター">PM・Webディレクター</option>
                </optgroup>
                <optgroup label="クリエイティブ関連">
                  <option value="Webデザイナー・UI/UX">Webデザイナー・UI/UX</option>
                  <option value="ライター・編集者">ライター・編集者</option>
                </optgroup>
                <optgroup label="その他">
                  <option value="コンサルタント">コンサルタント</option>
                  <option value="販売・サービス・飲食">販売・サービス・飲食</option>
                  <option value="専門職（士業・医療・福祉等）">専門職（士業・医療・福祉等）</option>
                  <option value="その他">その他</option>
                </optgroup>
              </select>
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label htmlFor="role">役職</label>
              <select id="role" name="role" required value={formData.role} onChange={handleChange}>
                <option value="">選択してください</option>
                <option value="経営者・役員クラス">経営者・役員クラス</option>
                <option value="本部長・事業部長クラス">本部長・事業部長クラス</option>
                <option value="部長・次長クラス">部長・次長クラス</option>
                <option value="課長・マネージャー・室長クラス">課長・マネージャー・室長クラス</option>
                <option value="係長・主任・リーダー職クラス">係長・主任・リーダー職クラス</option>
                <option value="一般社員・職員">一般社員・職員</option>
                <option value="派遣・契約社員">派遣・契約社員</option>
                <option value="アルバイト・パート">アルバイト・パート</option>
                <option value="インターン">インターン</option>
                <option value="その他">その他</option>
              </select>
            </div>
          </div>

          <div style={{ marginTop: '1.5rem', marginBottom: '1rem', display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
            <input
              type="checkbox"
              id="agreement"
              checked={isAgreed}
              onChange={(e) => setIsAgreed(e.target.checked)}
              style={{ marginTop: '0.25rem', width: '1.25rem', height: '1.25rem', cursor: 'pointer' }}
            />
            <label htmlFor="agreement" style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: '1.5', cursor: 'pointer', fontWeight: 'normal' }}>
              <Link href="#" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>利用規約</Link> および <Link href="#" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>プライバシーポリシー</Link> に同意します。<br />
              ※ご入力いただいた情報は、各種サービスのご案内等に利用させていただく場合があります。
            </label>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={isLoading || !isAgreed}>
            {isLoading ? 'アカウント作成中...' : '無料で登録する'}
          </button>
        </form>

        <div className="text-center mt-4" style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          すでにアカウントをお持ちですか？ <Link href="/login" style={{ fontWeight: 600 }}>ログイン</Link>
        </div>
      </div>
    </div>
  );
}
