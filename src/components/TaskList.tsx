import { PlusCircle } from '@phosphor-icons/react';
import { v4 as uuid} from 'uuid';
import clipboard from '../assets/Clipboard.svg';

import styles from './TaskList.module.css';
import { TaskItem } from './TaskItem';
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';

export function TaskList(){
    const [tasks, setTasks] = useState<TaskType[]>([]);
    const [newTaskText, setNewTaskText] = useState("");

    const tasksCompleted = tasks.filter(task => {
        return task.isCompleted;
    });

    function handleInvalidTaskInput(event: InvalidEvent<HTMLInputElement>){
        event.target.setCustomValidity("Esse campo é obrigatório");
    }

    function handleTaskInputChange(event: ChangeEvent<HTMLInputElement>){
        event.target.setCustomValidity("");

        setNewTaskText(event.target.value);
    }

    function handleCreateNewTask(event: FormEvent){
        event.preventDefault();

        const newTask: TaskType = {
            id: uuid(),
            content: newTaskText,
            isCompleted: false
        };

        setTasks([...tasks, newTask]);

        setNewTaskText('');
    }

    function deleteTask(taskToDelete: string){
        const taskListWithoutDeletedOne = tasks.filter(task => {
            return task.id !== taskToDelete
        });

        setTasks(taskListWithoutDeletedOne);
    }

    function handleTaskStatus(taskToHandle: string){
        const tasksUpdated = tasks.map(task => {

            if(task.id == taskToHandle){
                task.isCompleted = !task.isCompleted
            }

            return task;
        });

        setTasks(tasksUpdated)
    }

    return(
        <main className={styles.taskListBox}>
            <form className={styles.taskListForm} onSubmit={handleCreateNewTask}>
                <input 
                    type="text"
                    placeholder="Adicione uma nova tarefa"
                    value={newTaskText}
                    onChange={handleTaskInputChange}
                    onInvalid={handleInvalidTaskInput}
                    required
                />
                <button type="submit">
                    Criar <PlusCircle size={16}/>
                </button>
            </form>
            <div className={styles.taskListContent}>
                <header className={styles.taskListHeader}>
                    <div className={styles.countTasks}>
                        <strong>Tarefas criadas</strong>
                        <span className={styles.count}>{ tasks.length }</span>
                    </div>
                    <div className={styles.countCompleted}>
                        <strong>Concluídas</strong>
                        <span className={styles.count}>
                            { tasksCompleted.length > 0 ? tasksCompleted.length  + ' de '  + tasks.length : 0}
                        </span>
                    </div>
                </header>
                {
                    tasks.length > 0 ?
                        <div className={styles.taskList}>
                            {tasks.map(task => {
                                return(
                                    <TaskItem
                                        key={task.id}
                                        onHandleTaskStatus={handleTaskStatus}
                                        onDeleteTask={deleteTask}
                                        task={task} 
                                    />
                                )
                            })}

                        </div>
                    
                    :
                        <div className={styles.taskListEmpty}>
                            <img 
                                src={clipboard}
                                alt="Icone de uma prancheta." 
                            />
                            <p>
                                <strong>Você ainda não tem tarefas cadastradas</strong>
                                Crie tarefas e organize seus itens a fazer
                            </p>
                        </div>
                }
            </div>
        </main>
    );
}