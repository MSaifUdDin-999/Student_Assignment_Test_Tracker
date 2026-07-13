import { getSubjectColor } from '../utils';

export default function TaskCard({ task, isOverdue, computedStatus, onToggle, onDelete, onEdit }) {
  const pBadge = task.priority === 'high' ? 'badge-high' : task.priority === 'low' ? 'badge-low' : 'badge-med';
  const sBadge = computedStatus === 'done' ? 'badge-done' : computedStatus === 'overdue' ? 'badge-over' : computedStatus === 'in-progress' ? 'badge-ip' : 'badge-pend';
  const sLabel = computedStatus === 'in-progress' ? 'In Progress' : computedStatus.charAt(0).toUpperCase() + computedStatus.slice(1);

  // Get the color for this specific task's subject
  const subjColor = getSubjectColor(task.subject);
  
  const formatDue = (dueStr) => {
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const due = new Date(dueStr + 'T00:00:00');
    const d = Math.round((due - today) / 86400000);
    if (d < 0) return `${Math.abs(d)}d overdue`;
    if (d === 0) return 'Due today';
    if (d === 1) return 'Due tomorrow';
    return `Due in ${d}d`;
  };

  return (
    <div className={`task-card ${computedStatus}`}>
      <div className={`task-checkbox ${task.status === 'done' ? 'checked' : ''}`} onClick={() => onToggle(task.id)}></div>
      <div className="task-main">
        <div className="task-title">{task.title}</div>
        <div className="task-meta">
          <span className="badge badge-subj" style={{ background: `${subjColor}22`, color: subjColor }}>
            {task.subject}
          </span>
          <span className={`badge ${pBadge}`}>{task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}</span>
          <span className={`badge ${sBadge}`}>{sLabel}</span>
          <span className={`task-due ${isOverdue ? 'overdue-due' : ''}`}>📅 {formatDue(task.due)}</span>
        </div>
        {task.notes && <div style={{ fontSize: '.77rem', color: 'var(--text-muted)', marginTop: '4px' }}>{task.notes}</div>}
      </div>
      <div className="task-actions">
        <button className="icon-btn" onClick={() => onEdit(task)}>✏️</button>
        <button className="icon-btn del" onClick={() => onDelete(task.id)}>🗑️</button>
      </div>
    </div>
  );
}


// TaskList's job is data management. Its entire purpose is to figure out which tasks to show (filtering) and in what order (sorting).

// TaskCard's job is purely visual presentation. It only cares about how a single task looks (colors, badges, due date formatting).