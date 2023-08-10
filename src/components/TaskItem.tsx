import { Circle, CheckCircle, Trash } from '@phosphor-icons/react';

import styles from './TaskItem.module.css';

interface Props{
    task: TaskType;
    onDeleteTask: (id: string) => void;
    onHandleTaskStatus: (id: string) => void;
}

export function TaskItem({ task, onDeleteTask, onHandleTaskStatus } : Props ){

    function handleDeleteTask(){
        onDeleteTask(task.id)
    }

    function handleTaskStatus(){
        onHandleTaskStatus(task.id)
    }

    return(
        <div className={styles.taskItem}>
            {
                !task.isCompleted ? 
                <button
                    onClick={handleTaskStatus}
                    title="Concluir tarefa" 
                    className={styles.completeTask}>
                    <Circle />
                </button>
                :
                <button
                    onClick={handleTaskStatus}
                    title="Abrir tarefa" 
                    className={styles.uncompleteTask}>
                    <CheckCircle weight="fill" />
                </button>
            }
            
            <p className={task.isCompleted ? styles.completed : ''}>{task.content}</p>
            <button 
                className={styles.deleteButton} 
                title="Excluir tarefa"
                onClick={handleDeleteTask}>
                <Trash />
            </button>
        </div>
    );
}