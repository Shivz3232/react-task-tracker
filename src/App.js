import Header from './components/Header'
import Footer from './components/Footer'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import About from './components/About'

import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

function App() {
  const [tasks, setTasks] = useState([]);

  const [showAddTask, setShowAddTask] = useState(false);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    }
    
    getTasks();
  }, []);

  async function fetchTasks() {
    const res = await fetch("http://localhost:5000/tasks");
    const data = await res.json();
    return data;
  }

  async function fetchTask(id) {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();
    return data;
  }

  // Toggle Reminder
  async function toggleReminder(id) {
    const taskToToggle = await fetchTask(id);
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder };
    const res = await fetch(`http://localhost:5000/tasks/${id}`, { method: "PUT", headers: {
      'Content-Type': "application/json"
      }, body: JSON.stringify(updTask)});
    const data = await res.json();
    setTasks(tasks.map((task) => task.id === id ? { ...task, reminder: data.reminder} : task));
  }

  // Add task
  async function addTask(task) {
    const res = await fetch("http://localhost:5000/tasks", { method: "POST", headers: {
      'Content-Type': "application/json"
    }, body: JSON.stringify(task)});

    const data = await res.json();

    setTasks([...tasks, data]);

    setShowAddTask(!showAddTask);
  }

  // Delete tasks
  async function deleteTask(id) {
    await fetch(`http://localhost:5000/tasks/${id}`, { method: 'DELETE'});
    setTasks(tasks.filter((task) => task.id !== id));
  }
  
  return (
    <Router >
      <div className="container">
        <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask}/>
        <Route path="/" exact render={(props) => (
          <>
            {showAddTask && <AddTask onAdd={addTask}/>}
            {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/> : "No Tasks To Show"}
          </>
        )} />
        <Route path="/about" component={About} />
        <Footer />
      </div>
    </Router>
  )
}

export default App;
