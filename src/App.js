import { useState, useEffect } from 'react'
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'

function App() {
  const [showAddTask, setShowAddTask]= useState(false)
  const [tasks, setTasks]=useState([])

  useEffect(()  => {
   const getTasks = async () => {
     const taskFromServer = await fetchTasks()
     setTasks(taskFromServer)
   }
    getTasks()
  }, [])
  //fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:6000/tasks')
    const data = await res.json()

    return data
  }
//Add task
const addtask = (task) => {
  const id=Math.floor(Math.random()*10000)+1
  const newTask = { id,...task}
  setTasks([...tasks,newTask])
}
//delete task
const deleteTask = (id) => {
  setTasks(tasks.filter((task) => tasks.id !== id))
}
//toggle reminder
const toggleReminder = (id) => {
  setTasks(
    tasks.map((task) =>
    task.id === id ? {...task,reminder:
    !task.reminder}:task
    )
    )
}
  return (
    <div className='container'>
      <Header onAdd={() => setShowAddTask
        (!showAddTask)} 
        showAdd={showAddTask} />
      {showAddTask &&<AddTask onAdd={addtask} />}
     { tasks.length > 0 ? (
     <Tasks tasks={tasks} onDelete= 
     {deleteTask} onToggle={toggleReminder}/>
      ): (
        'No Tasks To Show' )}
      </div> 
 )
}

export default App;
