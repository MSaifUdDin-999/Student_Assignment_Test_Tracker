import { useState, useEffect } from 'react';

export default function TaskModal({ initialData, onSave, onClose, existingSubjects }) {
  const [formData, setFormData] = useState({
    title: '', subject: '', due: '', priority: 'medium', status: 'pending', notes: ''
  });

  useEffect(() => {
    if (initialData) setFormData(initialData);
  }, [initialData]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    if (!formData.title || !formData.subject || !formData.due) {
      alert('Title, subject, and due date are required!');
      return;
    }
    onSave(formData);
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target.className === 'modal-overlay' && onClose()}>
      <div className="modal-box">
        <div className="modal-head">
          <span className="modal-title">{initialData ? 'Edit Task' : 'Add Task'}</span>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          <div className="form-row">
            <label>Task Title *</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="e.g. Submit Lab Report" />
          </div>
          <div className="form-row">
            <label>Subject *</label>
            <input type="text" name="subject" value={formData.subject} onChange={handleChange} list="subject-list" placeholder="e.g. Data Structures" />
            <datalist id="subject-list">
              {existingSubjects.map(s => <option key={s} value={s} />)}
            </datalist>
          </div>
          <div className="form-2col">
            <div className="form-row">
              <label>Due Date *</label>
              <input type="date" name="due" value={formData.due} onChange={handleChange} />
            </div>
            <div className="form-row">
              <label>Priority</label>
              <select name="priority" value={formData.priority} onChange={handleChange}>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>
          <div className="form-row">
            <label>Status</label>
            <select name="status" value={formData.status} onChange={handleChange}>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>
          <div className="form-row">
            <label>Notes (optional)</label>
            <textarea name="notes" value={formData.notes} onChange={handleChange} placeholder="Additional details…"></textarea>
          </div>
          <button className="btn-primary" onClick={handleSubmit}>{initialData ? 'Save Changes' : 'Save Task'}</button>
        </div>
      </div>
    </div>
  );
}