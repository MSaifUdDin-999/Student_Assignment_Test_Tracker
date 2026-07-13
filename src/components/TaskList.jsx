import TaskCard from './TaskCard';

export default function TaskList({ tasks, filters, activeTab, onToggle, onDelete, onEdit }) {
  const PRIORITY_ORDER = { high: 0, medium: 1, low: 2 };

  const getComputedStatus = (task) => {
    if (task.status === 'done') return 'done';
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const due = new Date(task.due + 'T00:00:00');
    return due < today ? 'overdue' : task.status;
  };

  let filtered = tasks.filter(t => {
    const cs = getComputedStatus(t);
    const search = filters.search.toLowerCase();
    
    if (activeTab === 'upcoming' && (cs === 'done' || cs === 'overdue')) return false;
    if (activeTab === 'overdue' && cs !== 'overdue') return false;
    if (activeTab === 'done' && cs !== 'done') return false;
    
    if (filters.subject && t.subject !== filters.subject) return false;
    if (filters.status && cs !== filters.status) return false;
    if (filters.priority && t.priority !== filters.priority) return false;
    if (search && !t.title.toLowerCase().includes(search) && !t.subject.toLowerCase().includes(search)) return false;
    
    return true;
  });

  filtered.sort((a, b) => {
    if (filters.sort === 'priority') return PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority];
    if (filters.sort === 'subject') return a.subject.localeCompare(b.subject);
    if (filters.sort === 'title') return a.title.localeCompare(b.title);
    return new Date(a.due) - new Date(b.due);
  });

  if (!filtered.length) {
    return (
      <div className="empty-state">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <rect x="3" y="3" width="18" height="18" rx="3"></rect><line x1="9" y1="9" x2="15" y2="9"></line><line x1="9" y1="13" x2="13" y2="13"></line>
      </svg>
        <p>No tasks match the current filter.</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {filtered.map(t => (
        <TaskCard 
          key={t.id} 
          task={t} 
          computedStatus={getComputedStatus(t)} 
          isOverdue={getComputedStatus(t) === 'overdue'}
          onToggle={onToggle} 
          onDelete={onDelete} 
          onEdit={onEdit} 
        />
      ))}
    </div>
  );
}

// TaskList's job is data management. Its entire purpose is to figure out which tasks to show (filtering) and in what order (sorting).

// TaskCard's job is purely visual presentation. It only cares about how a single task looks (colors, badges, due date formatting).