export default function Summary({ goals }) {
    const completedGoals = goals.filter(goal => goal.current >= goal.target).length;
    const totalProgress = goals.reduce((acc, goal) => acc + (goal.current / goal.target), 0);
    const averageProgress = goals.length ? (totalProgress / goals.length) * 100 : 0;
  
    return (
      <div className="summary">
        <h2>Summary</h2>
        <div className="summary-cards">
          <div className="summary-card">
            <h3>Total Goals</h3>
            <p>{goals.length}</p>
          </div>
          <div className="summary-card">
            <h3>Completed</h3>
            <p>{completedGoals}</p>
          </div>
          <div className="summary-card">
            <h3>Avg. Progress</h3>
            <p>{averageProgress.toFixed(1)}%</p>
          </div>
        </div>
      </div>
    );
  }