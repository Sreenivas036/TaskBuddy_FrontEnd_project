import React, { useState } from 'react';

function Home() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState({ todo: [], ongoing: [], completed: [] });
  const [activeTask, setActiveTask] = useState(null); // Track active task

  const handleInputChange = (e) => {
    setTask(e.target.value);
  };

  const addTask = () => {
    if (task.trim() !== '') {
      setTasks((prevTasks) => ({
        ...prevTasks,
        todo: [...prevTasks.todo, task],
      }));
      setActiveTask(task); // Set active task
      setTask('');
    }
  };

  const moveTask = (currentCategory, targetCategory, taskToMove) => {
    setTasks((prevTasks) => {
      const updatedCurrent = prevTasks[currentCategory].filter((t) => t !== taskToMove);
      const updatedTarget = [...prevTasks[targetCategory], taskToMove];
      return { ...prevTasks, [currentCategory]: updatedCurrent, [targetCategory]: updatedTarget };
    });
    setActiveTask(taskToMove); // Set newly moved task as active
  };

  return (
    <div className="home">
      <form
        className="task-form"
        onSubmit={(e) => {
          e.preventDefault();
          addTask();
        }}
      >
        <input type="text" placeholder="Enter task..." className="task-input" value={task} onChange={handleInputChange} />
        <button type="button" className="add-task-button" onClick={addTask}>
          ADD TASK
        </button>
      </form>

      <div className="task-sections">
        {['todo', 'ongoing', 'completed'].map((category) => (
          <div key={category} className="task-section">
            <h2>{category.charAt(0).toUpperCase() + category.slice(1)} Tasks</h2>
            <ul>
              {tasks[category].map((t, index) => (
                <li key={index} className={t === activeTask ? 'active-task' : ''}>
                  {t}
                  {category !== 'completed' && (
                    <button onClick={() => moveTask(category, 'completed', t)}>Move to Completed</button>
                  )}
                  {category !== 'ongoing' && (
                    <button onClick={() => moveTask(category, 'ongoing', t)}>Move to Ongoing</button>
                  )}
                  {category !== 'todo' && (
                    <button onClick={() => moveTask(category, 'todo', t)}>Move to To-Do</button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;