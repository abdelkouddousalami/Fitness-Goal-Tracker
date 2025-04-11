export default function GoalList({ goals, deleteGoal, setEditingGoal }) {
    return (
      <div className="goal-list">
        <h2>Your Goals</h2>
        {goals.map(goal => (
          <div key={goal.id} className="goal-item">
            <div className="goal-header">
              <h3>{goal.title}</h3>
              <div className="goal-actions">
                <button onClick={() => setEditingGoal(goal)}>Edit</button>
                <button onClick={() => deleteGoal(goal.id)}>Delete</button>
              </div>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${(goal.current / goal.target) * 100}%` }}
              ></div>
            </div>
            <p>{goal.current} / {goal.target}</p>
          </div>
        ))}
      </div>
    );
  }