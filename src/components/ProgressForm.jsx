import { useState, useEffect } from 'react';

export default function ProgressForm({ goals, addProgress }) {
  const [selectedGoal, setSelectedGoal] = useState('');
  const [progress, setProgress] = useState('');

  useEffect(() => {
    if (!goals.find(goal => goal.id === selectedGoal)) {
      setSelectedGoal('');
      setProgress('');
    }
  }, [goals, selectedGoal]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedGoal || !progress) return;
    addProgress(selectedGoal, progress);
    setProgress('');
    setSelectedGoal(''); 
  };

  return (
    <form onSubmit={handleSubmit} className="progress-form">
      <h2>Add Daily Progress</h2>
      <select 
        value={selectedGoal} 
        onChange={(e) => setSelectedGoal(e.target.value)}
        disabled={goals.length === 0}
      >
        <option value="">Select a Goal</option>
        {goals.map(goal => (
          <option key={goal.id} value={goal.id}>
            {goal.title} ({goal.current}/{goal.target})
          </option>
        ))}
      </select>
      
      <input
        type="number"
        placeholder="Progress amount"
        value={progress}
        onChange={(e) => setProgress(e.target.value)}
        disabled={!selectedGoal}
        min="1"
        max={goals.find(goal => goal.id === selectedGoal)?.target || 1000000}
      />
      
      <button 
        type="submit"
        disabled={!selectedGoal || !progress}
      >
        Add Progress
      </button>
    </form>
  );
}