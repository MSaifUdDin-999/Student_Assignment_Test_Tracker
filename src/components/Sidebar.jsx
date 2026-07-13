import { getSubjectColor } from '../utils';

export default function Sidebar({ tasks }) {
  const subjects = [...new Set(tasks.map(t => t.subject))].sort();
  
  const upcoming = tasks
    .filter(t => t.status !== 'done')
    .map(t => {
      const today = new Date(); today.setHours(0, 0, 0, 0);
      const due = new Date(t.due + 'T00:00:00');
      return { ...t, days: Math.round((due - today) / 86400000) };
    })
    .sort((a, b) => a.days - b.days)
    .slice(0, 6);

  // Helper to bring back the dynamic urgency colors
  const getDeadlineStyles = (days) => {
    if (days < 0) return { dot: '#EF4444', bg: '#FEE2E2', txt: '#991B1B' }; // Red (Overdue)
    if (days <= 3) return { dot: '#F59E0B', bg: '#FEF3C7', txt: '#92400E' }; // Orange (Soon)
    return { dot: '#22C55E', bg: '#DCFCE7', txt: '#166534' }; // Green (Plenty of time)
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      
      {/* Deadlines Panel */}
      <div className="panel">
        <div className="panel-head"><span className="panel-title">⏰ Upcoming Deadlines</span></div>
        <div className="panel-body">
          <div className="deadline-list">
            {!upcoming.length ? (
              <p style={{ fontSize: '.82rem', color: 'var(--text-muted)', textAlign: 'center' }}>🎉 No pending deadlines!</p>
            ) : (
              upcoming.map(t => {
                const styles = getDeadlineStyles(t.days);
                return (
                  <div key={t.id} className="deadline-item">
                    
                    {/* 1. Restored the colored dot indicator */}
                    <div className="deadline-dot" style={{ background: styles.dot }}></div>
                    
                    <div className="deadline-info">
                      <div className="deadline-name">{t.title}</div>
                      <div className="deadline-subj">{t.subject}</div>
                    </div>
                    
                    {/* 2. Restored the dynamic background and text colors */}
                    <div className="deadline-days" style={{ background: styles.bg, color: styles.txt }}>
                      {t.days < 0 ? `${Math.abs(t.days)}d late` : t.days === 0 ? 'Today' : t.days === 1 ? 'Tmrw' : `${t.days}d`}
                    </div>
                    
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Progress Panel */}
      <div className="panel">
        <div className="panel-head"><span className="panel-title">📊 Progress by Subject</span></div>
        <div className="panel-body">
          <div className="progress-list">
            {!subjects.length ? (
              <p style={{ fontSize: '.82rem', color: 'var(--text-muted)' }}>No tasks yet.</p>
            ) : (
              subjects.map(s => {
                const subTasks = tasks.filter(t => t.subject === s);
                const done = subTasks.filter(t => t.status === 'done').length;
                const pct = Math.round((done / subTasks.length) * 100);
                const subjColor = getSubjectColor(s);

                return (
                  <div key={s} className="prog-item">
                    <div className="prog-head"><strong>{s}</strong><span>{done}/{subTasks.length} · {pct}%</span></div>
                    <div className="prog-bar-bg">
                      <div className="prog-bar-fill" style={{ width: `${pct}%`, background: subjColor }}></div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
      
    </div>
  );
}