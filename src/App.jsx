import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import StatsRow from './components/StatsRow';
import TaskControls from './components/TaskControls';
import TaskList from './components/TaskList';
import Sidebar from './components/Sidebar';
import TaskModal from './components/TaskModal';
import './index.css';

const STORAGE_KEY = 'satt_tasks_data';

export default function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });
  const [darkMode, setDarkMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  // Filter & Tab State
  const [activeTab, setActiveTab] = useState('all');
  const [filters, setFilters] = useState({ search: '', subject: '', status: '', priority: '', sort: 'due' });

  // Sync to Local Storage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    if (darkMode) document.body.classList.add('dark');
    else document.body.classList.remove('dark');
  }, [darkMode]);

  const toggleTaskStatus = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, status: t.status === 'done' ? 'pending' : 'done' } : t));
  };

  const deleteTask = (id) => {
    if (window.confirm('Delete this task?')) {
      setTasks(tasks.filter(t => t.id !== id));
    }
  };

  const saveTask = (taskData) => {
    if (editingTask) {
      setTasks(tasks.map(t => t.id === editingTask.id ? { ...t, ...taskData } : t));
    } else {
      setTasks([...tasks, { ...taskData, id: crypto.randomUUID(), created: Date.now() }]);
    }
    setIsModalOpen(false);
  };

  const openAddModal = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  useEffect(() => {   // Purpose : Create a starry background effect
    const canvas = document.getElementById('stars-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let stars = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      stars = Array.from({ length: 160 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.4 + 0.3,
        a: Math.random(),
        da: (Math.random() - 0.5) * 0.005
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach(s => {
        s.a += s.da;
        if (s.a > 1 || s.a < 0.1) s.da *= -1;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200,220,255,${s.a})`;
        ctx.fill();
      });
      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    resize();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []); // Empty dependency array so it only runs on mount

  return (
    <>
      <canvas id="stars-canvas"></canvas>
      {/* Decorative Background */}
      <div className="bg-deco">
        <div className="orbit orbit-1"></div>
        <div className="orbit orbit-2"></div>
        <div className="orbit orbit-3"></div>
        <div className="planet p1"></div>
        <div className="planet p2"></div>
        <div className="planet p3"></div>
      </div>

      <Navbar darkMode={darkMode} toggleTheme={() => setDarkMode(!darkMode)} />

      <div className="app-wrap">
        <div className="app-inner">
          <div className="dash-header">
            <div>
              <div className="dash-title">{darkMode ? '🌌 Your Study Universe' : 'Have a nice day, Saif ☀️'}</div>
              <div className="dash-date">{new Date().toLocaleDateString('en-PK', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
            </div>
            <button className="btn-primary" style={{ width: 'auto', padding: '8px 18px', display: 'flex', alignItems: 'center', gap: '6px' }} onClick={openAddModal}>
              <span style={{ fontSize: '1.1rem' }}>+</span> Add Task
            </button>
          </div>

          <StatsRow tasks={tasks} />

          <div className="two-col">
            <div>
              <TaskControls tasks={tasks} filters={filters} setFilters={setFilters} activeTab={activeTab} setActiveTab={setActiveTab} />
              <TaskList tasks={tasks} filters={filters} activeTab={activeTab} onToggle={toggleTaskStatus} onDelete={deleteTask} onEdit={(t) => { setEditingTask(t); setIsModalOpen(true); }} />
            </div>
            <Sidebar tasks={tasks} />
          </div>
        </div>
      </div>

      {isModalOpen && <TaskModal initialData={editingTask} onSave={saveTask} onClose={() => setIsModalOpen(false)} existingSubjects={[...new Set(tasks.map(t => t.subject))]} />}
    </>
  );
}