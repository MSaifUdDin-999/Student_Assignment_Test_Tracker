export default function StatsRow({ tasks }) {
  const total = tasks.length;
  const done = tasks.filter(t => t.status === 'done').length;
  
  const getComputedStatus = (task) => {     // Purpose : Automatically mark tasks overdue.
    if (task.status === 'done') return 'done';
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const due = new Date(task.due + 'T00:00:00');
    return due < today ? 'overdue' : task.status;
  };

  const overdue = tasks.filter(t => getComputedStatus(t) === 'overdue').length;
  const upcoming = tasks.filter(t => {            // Purpose : Count tasks due in the next 7 days.
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const due = new Date(t.due + 'T00:00:00');
    const days = Math.round((due - today) / 86400000);
    return t.status !== 'done' && days >= 0 && days <= 7;
  }).length;
  
  const pct = total ? Math.round((done / total) * 100) : 0;

  return (
    <div className="stats-row">
      <div className="stat-card">
        <div className="stat-label">Total Tasks</div>
        <div className="stat-num">{total}</div>
        <div className="stat-sub">All assignments</div>
      </div>
      <div className="stat-card accent-card">
        <div className="stat-label">Completed</div>
        <div className="stat-num">{done}</div>
        <div className="stat-sub">{pct}% done</div>
      </div>
      <div className="stat-card">
        <div className="stat-label">Overdue</div>
        <div className="stat-num" style={{ color: overdue ? '#EF4444' : 'inherit' }}>{overdue}</div>
        <div className="stat-sub">Need attention</div>
      </div>
      <div className="stat-card">
        <div className="stat-label">This Week</div>
        <div className="stat-num">{upcoming}</div>
        <div className="stat-sub">Due in 7 days</div>
      </div>
    </div>
  );
}