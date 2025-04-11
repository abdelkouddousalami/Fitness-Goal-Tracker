import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import GoalForm from './components/GoalForm';
import GoalList from './components/GoalList';
import ProgressForm from './components/ProgressForm';
import Summary from './components/Summary';
import './App.css';

function App() {
  const [goals, setGoals] = useState([]);
  const [editingGoal, setEditingGoal] = useState(null);  

useEffect(() => {
  
  const savedGoals = localStorage.getItem('fitnessGoals');
  if (savedGoals) setGoals(JSON.parse(savedGoals));
}, []);

useEffect(() => {
  localStorage.setItem('fitnessGoals', JSON.stringify(goals));
}, [goals]);

  const addGoal = (goal) => {
    setGoals([...goals, { ...goal, id: uuidv4(), current: 0 }]);
  };

  const updateGoal = (updatedGoal) => {
    setGoals(goals.map(goal => goal.id === updatedGoal.id ? updatedGoal : goal));
    setEditingGoal(null);
  };

  const deleteGoal = (id) => {
    setGoals(goals.filter(goal => goal.id !== id));
  };

const addProgress = (goalId, amount) => {
  setGoals(goals.map(goal => {
    if (goal.id === goalId) {
      const newCurrent = Math.min(goal.current + Number(amount), goal.target);
      const progressHistory = [...(goal.progressHistory || []), {
        date: new Date().toISOString().split('T')[0],
        amount: Number(amount)
      }];
      
      return { 
        ...goal, 
        current: newCurrent,
        progressHistory 
      };
    }
    return goal;
  }));
};

  return (
    <div className="container">
      <h1>Fitness Goal Tracker</h1>
      <div className="main-content">
        <div className="forms-section">
          <GoalForm 
            addGoal={addGoal} 
            updateGoal={updateGoal} 
            editingGoal={editingGoal} 
          />
          <ProgressForm goals={goals} addProgress={addProgress} />
        </div>
        <GoalList 
          goals={goals} 
          deleteGoal={deleteGoal} 
          setEditingGoal={setEditingGoal} 
        />
        <Summary goals={goals} />
      </div>
    </div>
  );
}

export default App;