export default function TaskControls({ tasks, filters, setFilters, activeTab, setActiveTab }) {
  const subjects = [...new Set(tasks.map(t => t.subject).filter(Boolean))].sort();

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="filter-bar">
        <input type="text" name="search" placeholder="🔍  Search tasks…" value={filters.search} onChange={handleFilterChange} />
        <select name="subject" value={filters.subject} onChange={handleFilterChange}>
          <option value="">All Subjects</option>
          {subjects.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <select name="status" value={filters.status} onChange={handleFilterChange}>
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
          <option value="overdue">Overdue</option>
        </select>
        <select name="priority" value={filters.priority} onChange={handleFilterChange}>
          <option value="">All Priority</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <select name="sort" value={filters.sort} onChange={handleFilterChange}>
          <option value="due">Sort: Due Date</option>
          <option value="priority">Sort: Priority</option>
          <option value="subject">Sort: Subject</option>
          <option value="title">Sort: Title</option>
        </select>
      </div>

      <div className="tab-bar">
        {['all', 'upcoming', 'overdue', 'done'].map(tab => (
          <button key={tab} className={`tab-btn ${activeTab === tab ? 'active' : ''}`} onClick={() => setActiveTab(tab)}>
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>
    </>
  );
}