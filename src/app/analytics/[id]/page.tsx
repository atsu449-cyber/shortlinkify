'use client';
import { useState, useEffect, useMemo, use } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, Globe, Smartphone, Copy, Download } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import { createClient } from '@/utils/supabase/client';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function AnalyticsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [timeRange, setTimeRange] = useState<'hourly' | 'daily' | 'weekly' | 'monthly'>('daily');
  const [urlData, setUrlData] = useState<any>(null);
  const [clickLogs, setClickLogs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isExporting, setIsExporting] = useState(false);

  const supabase = createClient();

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);

      // params.id は urls テーブルの UUID を想定
      const { data: urlResp, error } = await supabase
        .from('urls')
        .select('*')
        .eq('id', id)
        .single();

      if (urlResp) {
        setUrlData(urlResp);
        // クリックログ取得
        const { data: logsData } = await supabase
          .from('click_logs')
          .select('*')
          .eq('url_id', urlResp.id)
          .order('clicked_at', { ascending: true });

        if (logsData) {
          setClickLogs(logsData);
        }
      }
      setIsLoading(false);
    }
    fetchData();
  }, [id, supabase]);

  const handleExportCsv = async () => {
    try {
      setIsExporting(true);
      const res = await fetch(`/api/export-csv?id=${id}`);
      if (!res.ok) {
        throw new Error('CSVのエクスポートに失敗しました。');
      }
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `click_logs_${id}.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert('エラー: CSVのダウンロードに失敗しました。');
      console.error(err);
    } finally {
      setIsExporting(false);
    }
  };

  const { lineChartData, barChartData, referersList } = useMemo(() => {
    // 期間（timeRange）に応じた集計
    let labels: string[] = [];
    let data: number[] = [];

    const now = new Date();

    if (timeRange === 'hourly') {
      for (let i = 23; i >= 0; i--) {
        const d = new Date(now.getTime() - i * 60 * 60 * 1000);
        labels.push(`${d.getHours()}:00`);
        data.push(0);
      }
    } else if (timeRange === 'daily') {
      // 過去30日
      for (let i = 29; i >= 0; i--) {
        const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
        labels.push(`${d.getMonth() + 1}/${d.getDate()}`);
        data.push(0);
      }
    } else if (timeRange === 'weekly') {
      // 過去12週
      for (let i = 11; i >= 0; i--) {
        const d = new Date(now.getTime() - i * 7 * 24 * 60 * 60 * 1000);
        // 週の始まりの日付などをラベルにする簡易実装
        labels.push(`${d.getMonth() + 1}/${d.getDate()}週`);
        data.push(0);
      }
    } else {
      // monthly: 月別 (過去12ヶ月)
      for (let i = 11; i >= 0; i--) {
        const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
        labels.push(`${d.getFullYear()}/${d.getMonth() + 1}`);
        data.push(0);
      }
    }

    let mobile = 0;
    let desktop = 0;
    let tablet = 0;
    const refMap: Record<string, number> = {};

    // timeRangeに基づくフィルタリング基準日時
    const cutoffDate = new Date();
    if (timeRange === 'hourly') cutoffDate.setHours(cutoffDate.getHours() - 24);
    else if (timeRange === 'daily') cutoffDate.setDate(cutoffDate.getDate() - 30);
    else if (timeRange === 'weekly') cutoffDate.setDate(cutoffDate.getDate() - (12 * 7));
    else cutoffDate.setFullYear(now.getFullYear() - 1); // 過去1年

    const filteredLogs = clickLogs.filter(log => new Date(log.clicked_at) >= cutoffDate);

    filteredLogs.forEach(log => {
      const d = new Date(log.clicked_at);
      let label = '';
      if (timeRange === 'hourly') {
        label = `${d.getHours()}:00`;
      } else if (timeRange === 'daily') {
        label = `${d.getMonth() + 1}/${d.getDate()}`;
      } else if (timeRange === 'weekly') {
        // 所属する週のラベルを探すのは複雑なため、直近の該当週ラベルに当てはめる簡易ロジック
        // ここでは簡単に一番近い過去の週ラベルに合致させる
        const daysAgo = Math.floor((now.getTime() - d.getTime()) / (24 * 60 * 60 * 1000));
        const weeksAgo = Math.floor(daysAgo / 7);
        if (weeksAgo <= 11) {
          const wd = new Date(now.getTime() - weeksAgo * 7 * 24 * 60 * 60 * 1000);
          label = `${wd.getMonth() + 1}/${wd.getDate()}週`;
        }
      } else {
        label = `${d.getFullYear()}/${d.getMonth() + 1}`;
      }

      const index = labels.indexOf(label);
      if (index !== -1) {
        data[index]++;
      }

      // デバイス集計
      if (log.device_type === 'mobile') mobile++;
      else if (log.device_type === 'tablet') tablet++;
      else desktop++;

      // リファラー集計
      let referer = 'Direct';
      if (log.referer && log.referer !== 'direct') {
        try {
          const url = new URL(log.referer);
          referer = url.hostname;
        } catch {
          referer = log.referer;
        }
      }
      refMap[referer] = (refMap[referer] || 0) + 1;
    });

    const processedReferers = Object.keys(refMap).map(key => ({
      name: key,
      count: refMap[key],
      percent: filteredLogs.length > 0 ? Math.round((refMap[key] / filteredLogs.length) * 100) : 0
    })).sort((a, b) => b.count - a.count).slice(0, 5); // 上位5件

    return {
      lineChartData: {
        labels,
        datasets: [{
          label: 'クリック数',
          data,
          borderColor: '#3b82f6',
          backgroundColor: 'rgba(59, 130, 246, 0.2)',
          fill: true,
          tension: 0.4,
        }],
      },
      barChartData: {
        labels: ['モバイル', 'デスクトップ', 'タブレット'],
        datasets: [{
          label: 'デバイス別',
          data: [mobile, desktop, tablet],
          backgroundColor: ['#60a5fa', '#34d399', '#a78bfa'],
          borderRadius: 6,
        }]
      },
      referersList: processedReferers
    };
  }, [clickLogs, timeRange]);

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { mode: 'index' as const, intersect: false },
    },
    scales: {
      y: { beginAtZero: true, grid: { color: 'var(--border-color)' }, ticks: { color: '#64748b' } },
      x: { grid: { display: false }, ticks: { color: '#64748b' } },
    },
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      y: { beginAtZero: true, grid: { color: 'var(--border-color)' }, ticks: { color: '#64748b' } },
      x: { grid: { display: false }, ticks: { color: '#64748b' } },
    }
  };

  if (isLoading) {
    return <div className="container" style={{ padding: '4rem', textAlign: 'center' }}>読み込み中...</div>;
  }

  if (!urlData) {
    return <div className="container" style={{ padding: '4rem', textAlign: 'center' }}>データが見つかりません</div>;
  }

  const shortUrlToDisplay = `${window.location.host}/${urlData.alias || urlData.short_id}`;

  return (
    <div className="container" style={{ padding: '2rem 1.5rem', paddingBottom: '4rem' }}>

      {/* 🔙 ヘッダーナビ & URL情報 */}
      <div style={{ marginBottom: '2rem' }}>
        <Link href="/dashboard" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
          <ArrowLeft size={16} /> ダッシュボードに戻る
        </Link>
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <h1 style={{ fontSize: '1.5rem', color: 'var(--primary)', margin: 0, wordBreak: 'break-all' }}>https://{shortUrlToDisplay}</h1>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <button className="btn btn-secondary" style={{ padding: '0.5rem 1rem' }} onClick={() => navigator.clipboard.writeText(`https://${shortUrlToDisplay}`)}>
                <Copy size={16} /> コピー
              </button>
              <button
                className="btn btn-primary"
                style={{ padding: '0.5rem 1rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', opacity: isExporting ? 0.7 : 1 }}
                onClick={handleExportCsv}
                disabled={isExporting || clickLogs.length === 0}
              >
                <Download size={16} /> {isExporting ? '処理中...' : 'CSVダウンロード (直近30日)'}
              </button>
            </div>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{urlData.long_url}</p>
        </div>
      </div>

      {/* 📈 概要数値（KPI） */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ background: 'rgba(59, 130, 246, 0.2)', padding: '1rem', borderRadius: '12px' }}>
            <Globe size={28} color="var(--primary)" />
          </div>
          <div>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>総クリック数</div>
            <div style={{ fontSize: '1.75rem', fontWeight: 700 }}>{clickLogs.length.toLocaleString()}</div>
          </div>
        </div>

        {/* 自社広告枠 */}
        <div className="glass-panel" style={{ padding: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc', border: '1px dashed var(--border-color)' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', textAlign: 'center' }}>[広告枠] プレミアムプランでより詳細な機能をご提供</p>
        </div>
      </div>

      {/* 📊 メインチャートエリア */}
      <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <h2 style={{ fontSize: '1.25rem', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Calendar size={20} color="var(--primary)" /> アクセス推移
          </h2>
          <div style={{ display: 'flex', gap: '0.5rem', background: '#f1f5f9', padding: '0.25rem', borderRadius: '8px' }}>
            {['hourly', 'daily', 'weekly', 'monthly'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range as any)}
                style={{
                  background: timeRange === range ? 'var(--primary)' : 'transparent',
                  color: timeRange === range ? 'white' : 'var(--text-muted)',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '6px',
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  fontWeight: timeRange === range ? 600 : 400,
                  transition: 'all 0.2s',
                }}
              >
                {range === 'hourly' ? '時間別' : range === 'daily' ? '日別' : range === 'weekly' ? '週別' : '月別'}
              </button>
            ))}
          </div>
        </div>

        <div style={{ position: 'relative', height: '350px', width: '100%' }}>
          <Line data={lineChartData} options={lineChartOptions} />
        </div>
      </div>

      {/* 📱 内訳分析（デバイス等） */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Smartphone size={20} color="var(--primary)" /> デバイス別割合
          </h2>
          <div style={{ position: 'relative', height: '250px', width: '100%' }}>
            <Bar data={barChartData} options={barChartOptions} />
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Clock size={20} color="var(--primary)" /> リファラー（参照元）
          </h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {referersList.length > 0 ? referersList.map((ref, idx) => (
              <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '40%', fontSize: '0.875rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{ref.name}</div>
                <div style={{ flex: 1, background: '#e2e8f0', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${ref.percent}%`, background: 'var(--primary)', height: '100%' }} />
                </div>
                <div style={{ width: '20%', textAlign: 'right', fontSize: '0.875rem', color: 'var(--text-muted)' }}>{ref.count}</div>
              </li>
            )) : (
              <li style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>データがありません</li>
            )}
          </ul>
        </div>
      </div>

    </div>
  );
}
