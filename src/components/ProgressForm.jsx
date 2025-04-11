import { useState } from 'react';

export default function ProgressForm({ goals, addProgress }) {
  const [selectedGoal, setSelectedGoal] = useState('');
  const [progress, setProgress] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedGoal || !progress) return;
    addProgress(selectedGoal, progress);
    setProgress('');
  };

  return (
    <form onSubmit={handleSubmit} className="progress-form">
      <h2>Add Daily Progress</h2>
      <select 
        value={selectedGoal} 
        onChange={(e) => setSelectedGoal(e.target.value)}
      >
        <option value="">Select a Goal</option>
        {goals.map(goal => (
          <option key={goal.id} value={goal.id}>
            {goal.title}
          </option>
        ))}
      </select>
      <input
        type="number"
        placeholder="Progress amount"
        value={progress}
        onChange={(e) => setProgress(e.target.value)}
      />
      <button type="submit">Add Progress</button>
    </form>
  );
}