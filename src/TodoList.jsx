import { useState } from "react"
import styles from "./TodoList.module.css"


function TodoList() {

    const [tasks, setTasks] = useState([])
    const [newTask, setNewTask] = useState('')

    function handleAddTask() {

        if (newTask.trim() !== '') {
            const newTodo = {
                id: Date.now(),
                text: newTask,
                completed: false
            }

            setTasks(prevTasks => [...prevTasks, newTodo])
            setNewTask('')
        }
    }

    function handleRemoveTask(id) {
        setTasks(tasks => tasks.filter(task => task.id !== id))
    }

    function handleToggleCompletion(id) {
        setTasks(tasks =>
            tasks.map(task => 
                task.id == id
                ? {...task, completed: !task.completed}
                : task
            )
        )
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Todo List</h1>

            <section className={styles.inputContainer}>
                <input type="text" value={newTask} onChange={(e) => setNewTask(e.target.value)} className={styles.input} placeholder="Add Task"/>
                <button onClick={handleAddTask} className={styles.button} >Add Task</button>
            </section>
            

            <ul className={styles.listContainer}>
                {tasks.map(task => (
                    <div className={styles.divLisContainer}>
                        <input type="checkbox" className={styles.inputCheck} checked={task.completed} onChange={() => handleToggleCompletion(task.id)}/>
                        <li className={styles.liContainer} key={task.id} onClick={() => handleToggleCompletion(task.id)} style={{textDecoration: task.completed ? 'line-through' : 'none'}}>
                        {task.text}</li>
                        <button onClick={() => handleRemoveTask(task.id)} className={styles.buttonRemove}>Remove</button>
                    </div>
                    
                ))}
            </ul>
        </div>
    )
}

export default TodoList
