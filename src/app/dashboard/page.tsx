'use client';
import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Link2, Copy, BarChart2, Plus, Download, Trash2, List, Search, CheckCircle2, LogOut, QrCode } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import QRCode from 'qrcode';
import { fetchMetaTitle } from '../actions/fetchTitle';
import { verifyUrlsWithSafeBrowsing } from '../actions/url-security';
import { checkRateLimit } from '../actions/rate-limit';

type UrlItem = {
  id: string;
  shortUrl: string;
  longUrl: string;
  title: string;
  alias?: string;
  clicks: number;
  createdAt: string;
};

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'single' | 'bulk'>('single');
  const [longUrl, setLongUrl] = useState('');
  const [bulkUrls, setBulkUrls] = useState('');
  const [alias, setAlias] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [currentDomain, setCurrentDomain] = useState('ドメイン');

  useEffect(() => {
    setCurrentDomain(window.location.host);
  }, []);

  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'createdAt' | 'clicks'>('createdAt');
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');
  const [urlsList, setUrlsList] = useState<UrlItem[]>([]);
  const [isLoadingUrls, setIsLoadingUrls] = useState(true);

  // 新規追加ステート：コピー通知とQRモーダル用、一括生成結果用
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [qrModalUrl, setQrModalUrl] = useState<string | null>(null);
  const [qrModalDataUrl, setQrModalDataUrl] = useState<string | null>(null);
  const [bulkResultUrls, setBulkResultUrls] = useState<string[]>([]);

  const supabase = createClient();

  const generateShortId = () => Math.random().toString(36).substring(2, 7);

  const fetchUrls = async () => {
    setIsLoadingUrls(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from('urls')
      .select('id, long_url, short_id, alias, title, created_at, click_logs (count)')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (!error && data) {
      const formatted: UrlItem[] = data.map((item: any) => {
        const hostname = window.location.hostname;
        const port = window.location.port ? `:${window.location.port}` : '';

        // エイリアスをURLのディレクトリ（パス）として組み込む
        const shortUrl = item.alias ? `${hostname}${port}/${item.alias}/${item.short_id}` : `${hostname}${port}/${item.short_id}`;

        return {
          id: item.id,
          shortUrl,
          longUrl: item.long_url,
          title: item.title || item.long_url, // タイトルがDBにあれば表示、なければURLを代用
          alias: item.alias,
          clicks: item.click_logs[0]?.count || 0,
          createdAt: new Date(item.created_at).toLocaleDateString(),
        };
      });
      setUrlsList(formatted);
    }
    setIsLoadingUrls(false);
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setSuccessMessage('');

    // サインインユーザーの取得
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    // TODO: fetchMetaTitle 等でタイトルを取得する処理を将来的に追加
    const shortId = generateShortId();
    const finalAlias = alias.trim() !== '' ? alias.trim() : null;

    if (!finalAlias) {
      alert('エイリアス（組織・プロジェクト名など）を入力してください。');
      setIsGenerating(false);
      return;
    }

    // Google Safe Browsing 検証
    const urlsToCheck = activeTab === 'single' ? [longUrl] : bulkUrls.split(/\r?\n/).map(u => u.trim()).filter(u => u);

    if (urlsToCheck.length === 0) {
      setIsGenerating(false);
      return;
    }

    // レートリミット（スロットリング）検証: 1分間に1500件制限
    const rateLimitResult = await checkRateLimit(urlsToCheck.length);
    if (!rateLimitResult.allowed) {
      alert(`【制限エラー】\n${rateLimitResult.message}`);
      setIsGenerating(false);
      return;
    }

    if (urlsToCheck.length > 0) {
      try {
        const safetyResult = await verifyUrlsWithSafeBrowsing(urlsToCheck);
        if (!safetyResult.isSafe) {
          alert(`【警告】以下のURLがフィッシング・マルウェア等の危険サイトとして検知されました。\nシステムの安全のため登録はブロックされました。\n\n${safetyResult.threats?.join('\\n')}`);
          setIsGenerating(false);
          return;
        }
      } catch (e) {
        console.error("Safe Browsing Error:", e);
      }
    }

    if (activeTab === 'single') {
      const pageTitle = await fetchMetaTitle(longUrl);

      const { error } = await supabase.from('urls').insert({
        user_id: user.id,
        long_url: longUrl,
        short_id: shortId,
        alias: finalAlias,
        title: pageTitle || null
      });

      setIsGenerating(false);
      if (error) {
        console.error(`Supabase API Error: ${JSON.stringify(error)}`);
        alert(`エラーが発生しました: ${error.message || JSON.stringify(error)}`);
      } else {
        setSuccessMessage('短縮URLの生成が完了しました！');
        setLongUrl('');
        setAlias('');
        fetchUrls(); // リスト再取得
        setTimeout(() => setSuccessMessage(''), 3000);
      }
    } else {
      // bulkの改行分割: 正規表現を用いて様々な改行パターン(\r\n, \n)に対応
      const urlsArray = bulkUrls.split(/\r?\n/).map(u => u.trim()).filter(u => u);

      // 並列で全URLのMeta Titleを取得（Vercel等のタイムアウトに注意しつつ、今回はPromise.allで対応）
      const titles = await Promise.all(urlsArray.map(url => fetchMetaTitle(url)));

      const protocol = typeof window !== 'undefined' ? window.location.protocol : 'https:';
      const hostname = typeof window !== 'undefined' ? window.location.hostname : 'localhost';
      const port = window.location.port ? `:${window.location.port}` : '';

      const insertData = urlsArray.map((url, index) => {
        const sid = generateShortId();
        // ランダム文字列(sid)の前に必ずエイリアスディレクトリを挟む
        const displayShortUrl = `${hostname}${port}/${finalAlias}/${sid}`;

        return {
          user_id: user.id,
          long_url: url,
          short_id: sid,
          alias: finalAlias,
          title: titles[index] || null,
          // 後でモーダル表示するために一時的に保持
          _tempShortUrl: displayShortUrl
        };
      });

      // DBに挿入するデータからは_tempShortUrlを除外
      const dbInsertData = insertData.map(({ _tempShortUrl, ...rest }) => rest);

      const { error } = await supabase.from('urls').insert(dbInsertData);

      setIsGenerating(false);
      if (error) {
        console.error(`Supabase API Bulk Error: ${JSON.stringify(error)}`);
        alert(`一括生成中にエラーが発生しました: ${error.message || JSON.stringify(error)}`);
      } else {
        const generatedShortUrls = insertData.map(item => `${protocol}//${item._tempShortUrl}`);

        setBulkResultUrls(generatedShortUrls); // モーダル表示用ステートにセット
        setBulkUrls('');
        fetchUrls();
      }
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/login';
  };

  const handleCopy = (id: string, shortUrl: string) => {
    const protocol = typeof window !== 'undefined' ? window.location.protocol : 'https:';
    const fullUrl = `${protocol}//${shortUrl}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleShowQRModal = async (shortUrl: string) => {
    try {
      const protocol = typeof window !== 'undefined' ? window.location.protocol : 'https:';
      const fullUrl = `${protocol}//${shortUrl}`;
      // 余白やスケールを指定して高画質なQRコードを生成
      const url = await QRCode.toDataURL(fullUrl, {
        width: 1024,
        margin: 2,
        color: {
          dark: '#0f172a',
          light: '#ffffff'
        }
      });
      setQrModalUrl(fullUrl);
      setQrModalDataUrl(url);
    } catch (err) {
      console.error('QRコードの生成に失敗しました:', err);
      alert('QRコードの生成に失敗しました。');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('この短縮URLを削除しますか？\\n※関連するアクセスデータも同時に削除されます。')) return;

    const { error } = await supabase.from('urls').delete().eq('id', id);
    if (error) {
      console.error(error);
      alert('削除に失敗しました。');
    } else {
      fetchUrls();
    }
  };

  const filteredAndSortedUrls = useMemo(() => {
    let result = urlsList;

    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(item =>
        item.longUrl.toLowerCase().includes(lowerQuery) ||
        item.shortUrl.toLowerCase().includes(lowerQuery) ||
        (item.title && item.title.toLowerCase().includes(lowerQuery)) ||
        (item.alias && item.alias.toLowerCase().includes(lowerQuery))
      );
    }

    return result.sort((a, b) => {
      let comparison = 0;
      if (sortBy === 'createdAt') {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        comparison = dateA - dateB;
      } else if (sortBy === 'clicks') {
        comparison = a.clicks - b.clicks;
      }
      return sortOrder === 'desc' ? -comparison : comparison;
    });
  }, [urlsList, searchQuery, sortBy, sortOrder]);

  return (
    <div className="container" style={{ padding: '2rem 1.5rem' }}>

      {/* ページヘッダー */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>ダッシュボード</h1>
          <p style={{ color: 'var(--text-muted)' }}>新しいリンクの作成とパフォーマンスの確認</p>
        </div>
        <button onClick={handleLogout} className="btn btn-secondary" style={{ padding: '0.5rem 1rem' }} title="ログアウト">
          <LogOut size={16} /> ログアウト
        </button>
      </div>

      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        {/* メインアクションエリア（左側） */}
        <div style={{ flex: '1 1 400px' }}>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem' }}>短縮URLを作成</h2>

          <div className="glass-panel" style={{ padding: '2rem' }}>
            {/* タブ切り替え */}
            <div style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
              <button
                onClick={() => setActiveTab('single')}
                className={`btn ${activeTab === 'single' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ flex: 1, padding: '0.5rem' }}
              >
                <Link2 size={18} /> 1つ作成
              </button>
              <button
                onClick={() => setActiveTab('bulk')}
                className={`btn ${activeTab === 'bulk' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ flex: 1, padding: '0.5rem' }}
              >
                <List size={18} /> 一括作成 (最大300)
              </button>
            </div>

            <form onSubmit={handleGenerate} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* 冒頭URL設定 */}
              <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(59, 130, 246, 0.3)' }}>
                <label htmlFor="alias" style={{ color: 'var(--primary)', fontWeight: 'bold' }}>エイリアス（組織名・プロジェクト名など） <span style={{ color: 'var(--danger)' }}>*</span></label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>https://{currentDomain}/</span>
                  <input
                    type="text"
                    id="alias"
                    placeholder="companyname"
                    value={alias}
                    required
                    onChange={(e) => setAlias(e.target.value)}
                    style={{ flex: 1 }}
                  />
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>/ 個別の短縮ID</span>
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                  ※必須項目。英数字とハイフンのみ。入力した文字列の後にランダムな短い文字列が付与されます。
                </p>
              </div>

              {/* URL入力 */}
              {activeTab === 'single' ? (
                <div>
                  <label htmlFor="longUrl">元の長いURL</label>
                  <input
                    type="url"
                    id="longUrl"
                    placeholder="https://example.com/very/long/url..."
                    required
                    value={longUrl}
                    onChange={(e) => setLongUrl(e.target.value)}
                  />
                </div>
              ) : (
                <div>
                  <label htmlFor="bulkUrls">元の長いURL（改行区切りで最大300件まで）</label>
                  <textarea
                    id="bulkUrls"
                    rows={6}
                    placeholder="https://example.com/url1&#10;https://example.com/url2&#10;https://example.com/url3"
                    required
                    value={bulkUrls}
                    onChange={(e) => setBulkUrls(e.target.value)}
                    style={{ resize: 'vertical' }}
                  />
                  <div style={{ fontSize: '0.875rem', textAlign: 'right', marginTop: '0.5rem', color: 'var(--text-muted)' }}>
                    {bulkUrls.split('\n').filter(Boolean).length} 件 / 300 件
                  </div>
                </div>
              )}

              <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem', fontSize: '1.125rem' }} disabled={isGenerating}>
                {isGenerating ? '生成中...' : '短縮URLを生成する'}
              </button>

              {/* 生成成功メッセージ */}
              {successMessage && (
                <div className="animate-fade-in" style={{
                  background: 'rgba(16, 185, 129, 0.1)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  color: 'var(--success)',
                  padding: '1rem',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <CheckCircle2 size={20} />
                  {successMessage}
                </div>
              )}
            </form>
          </div>

          {/* 広告枠 */}
          <div className="glass-panel" style={{ padding: '1.5rem', marginTop: '2rem', textAlign: 'center', background: 'var(--card-bg)', border: '1px dashed var(--border-color)' }}>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>スポンサー広告</div>
            <div style={{ background: '#e2e8f0', width: '100%', height: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '8px', color: '#64748b' }}>
              ここに広告が表示されます
            </div>
          </div>
        </div>

        {/* 履歴・一覧エリア（右側） */}
        <div style={{ flex: '2 1 500px', minWidth: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2 style={{ fontSize: '1.5rem', margin: 0 }}>最近作成したリンク</h2>
          </div>

          {/* 検索・並び替えバー */}
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', flex: '1 1 250px' }}>
              <div style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
                <Search size={18} />
              </div>
              <input
                type="text"
                placeholder="タイトル、URL、エイリアスで検索..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ paddingLeft: '2.5rem', background: '#f8fafc', border: '1px solid var(--border-color)', borderRadius: '8px' }}
              />
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'createdAt' | 'clicks')}
                style={{ width: 'auto', background: '#f8fafc', border: '1px solid var(--border-color)', borderRadius: '8px', cursor: 'pointer' }}
              >
                <option value="createdAt">作成日</option>
                <option value="clicks">クリック数</option>
              </select>
              <button
                onClick={() => setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc')}
                className="btn btn-secondary"
                style={{ padding: '0 1rem' }}
                title="昇順/降順を切り替え"
              >
                {sortOrder === 'desc' ? '⬇ 降順' : '⬆ 昇順'}
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {filteredAndSortedUrls.length > 0 ? (
              filteredAndSortedUrls.map((item) => {
                const protocol = typeof window !== 'undefined' ? window.location.protocol : 'https:';
                const fullShortUrl = `${protocol}//${item.shortUrl}`;
                return (
                  <div key={item.id} className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1.5rem', flexWrap: 'wrap' }}>
                      <div style={{ flex: '1 1 300px', minWidth: 0 }}>
                        <h3 style={{ fontSize: '1.125rem', color: 'var(--primary)', marginBottom: '0.5rem', wordBreak: 'break-all' }}>
                          {fullShortUrl}
                        </h3>
                        <div style={{ fontWeight: 600, fontSize: '1rem', color: 'var(--text-main)', marginBottom: '0.25rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {item.title}
                        </div>
                        <a href={item.longUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.875rem', color: 'var(--text-muted)', display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {item.longUrl}
                        </a>
                      </div>
                      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
                        <button
                          className="btn btn-secondary"
                          title="URLをコピー"
                          style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', padding: '0.5rem 0.75rem', fontSize: '0.875rem', fontWeight: 500, color: copiedId === item.id ? 'var(--success)' : 'inherit', borderColor: copiedId === item.id ? 'var(--success)' : '' }}
                          onClick={() => handleCopy(item.id, item.shortUrl)}
                        >
                          {copiedId === item.id ? <><CheckCircle2 size={16} /> コピー済</> : <><Copy size={16} /> 短縮URL</>}
                        </button>
                        <button className="btn btn-secondary" title="QRコードを表示" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', padding: '0.5rem 0.75rem', fontSize: '0.875rem', fontWeight: 500 }} onClick={() => handleShowQRModal(item.shortUrl)}>
                          <QrCode size={16} /> QRコード
                        </button>
                        <Link href={`/analytics/${item.id}`} className="btn btn-secondary" title="分析を見る" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', padding: '0.5rem 0.75rem', fontSize: '0.875rem', fontWeight: 500, textDecoration: 'none' }}>
                          <BarChart2 size={16} /> アクセス解析
                        </Link>
                        <button className="btn btn-secondary" title="削除" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', padding: '0.5rem 0.75rem', fontSize: '0.875rem', fontWeight: 500, color: 'var(--danger)', borderColor: 'rgba(239, 68, 68, 0.3)' }} onClick={() => handleDelete(item.id)}>
                          <Trash2 size={16} /> 削除
                        </button>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.875rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <BarChart2 size={14} />
                        <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>{item.clicks.toLocaleString()}</span> クリック
                      </div>
                      <div>作成日: {item.createdAt}</div>
                      <div>エイリアス: {item.alias || 'なし'}</div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                検索条件に一致するリンクは見つかりませんでした。
              </div>
            )}
          </div>
        </div>
      </div>

      {/* QRコードモーダル */}
      {qrModalUrl && qrModalDataUrl && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backdropFilter: 'blur(4px)', zIndex: 50
        }} onClick={() => setQrModalUrl(null)}>
          <div className="glass-panel animate-fade-in" style={{ padding: '2rem', maxWidth: '400px', width: '90%', textAlign: 'center' }} onClick={e => e.stopPropagation()}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>QRコード</h3>
            <img src={qrModalDataUrl} alt="QR Code" style={{ width: '100%', height: 'auto', borderRadius: '8px', marginBottom: '1rem', border: '1px solid var(--border-color)' }} />
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.5rem', wordBreak: 'break-all' }}>{qrModalUrl}</p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button
                className="btn btn-secondary"
                onClick={() => setQrModalUrl(null)}
              >
                閉じる
              </button>
              <a
                href={qrModalDataUrl}
                download={`QR-${qrModalUrl.replace(/[^a-zA-Z0-9-]/g, '_')}.png`}
                className="btn btn-primary"
                style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                <Download size={16} /> 画像を保存
              </a>
            </div>
          </div>
        </div>
      )}

      {/* 一括生成結果表示モーダル */}
      {bulkResultUrls.length > 0 && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backdropFilter: 'blur(4px)', zIndex: 50
        }}>
          <div className="glass-panel animate-fade-in" style={{ padding: '2.5rem', maxWidth: '600px', width: '90%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'var(--success)' }}>
              <CheckCircle2 size={24} />
              <h3 style={{ fontSize: '1.25rem', margin: 0, color: 'var(--primary)' }}>一括生成が完了しました（{bulkResultUrls.length}件）</h3>
            </div>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
              すべての短縮URLが生成されました。下のボタンから一括でコピーし、スプレッドシート等に貼り付けることができます。
            </p>

            <textarea
              readOnly
              value={bulkResultUrls.join('\n')}
              style={{ width: '100%', height: '200px', resize: 'none', marginBottom: '1.5rem', whiteSpace: 'pre', overflowX: 'auto', fontSize: '0.875rem' }}
            />

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <button
                className="btn btn-secondary"
                onClick={() => setBulkResultUrls([])}
              >
                閉じる
              </button>
              <button
                className="btn btn-primary"
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                onClick={() => {
                  navigator.clipboard.writeText(bulkResultUrls.join('\n'));
                  alert('すべてのURLをクリップボードにコピーしました！');
                  setBulkResultUrls([]); // コピー後に自動で閉じる
                }}
              >
                <Copy size={16} /> すべてコピー
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
