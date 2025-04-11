import { useState, useEffect } from 'react';

export default function GoalForm({ addGoal, updateGoal, editingGoal }) {
  const [title, setTitle] = useState('');
  const [target, setTarget] = useState('');

  useEffect(() => {
    if (editingGoal) {
      setTitle(editingGoal.title);
      setTarget(editingGoal.target);
    }
  }, [editingGoal]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !target) return;

    const goal = { title, target: Number(target) };
    if (editingGoal) {
      updateGoal({ ...editingGoal, ...goal });
    } else {
      addGoal(goal);
    }
    
    setTitle('');
    setTarget('');
  };

  return (
    <form onSubmit={handleSubmit} className="goal-form">
      <h2>{editingGoal ? 'Edit Goal' : 'Add New Goal'}</h2>
      <input
        type="text"
        placeholder="Goal title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="number"
        placeholder="Target"
        value={target}
        onChange={(e) => setTarget(e.target.value)}
      />
      <button type="submit">
        {editingGoal ? 'Update Goal' : 'Add Goal'}
      </button>
    </form>
  );
}