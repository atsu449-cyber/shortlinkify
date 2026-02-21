export default function Logo({ className = '', style = {} }: { className?: string, style?: React.CSSProperties }) {
  return (
    <div className={`flex items-center gap-2 ${className}`} style={{ ...style, fontWeight: 700, fontSize: '1.25rem', letterSpacing: '-0.02em', color: 'var(--text-main)' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '32px',
        height: '32px',
        background: 'linear-gradient(135deg, var(--primary) 0%, #60a5fa 100%)',
        borderRadius: '8px',
        boxShadow: '0 4px 10px rgba(37, 99, 235, 0.3)',
        color: '#ffffff'
      }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
        </svg>
      </div>
      <span style={{
        background: 'linear-gradient(90deg, #1e293b, var(--primary))',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }}>
        ShortLinkify
      </span>
    </div>
  );
}
