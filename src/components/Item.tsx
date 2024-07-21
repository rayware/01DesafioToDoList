import { Check, Trash } from "@phosphor-icons/react"
import { toDoList } from "../App"
import styles from "./Item.module.css"

interface Props {
    data: toDoList
    removeTask: (id: number) => void
    toggleTaskStatus: ({ id, value }: { id: number; value: boolean }) => void
}

export function Item({ data, removeTask, toggleTaskStatus }: Props) {
    function handleTaskToggle() {
        toggleTaskStatus({ id: data.id, value: !data.check })
    }

    function handleRemove() {
        removeTask(data.id)
      }

    const toggleCheck = data.check
        ? styles['checkboxTrue']
        : styles['checkboxFalse']

    return (
        <div className={`${styles.taskBox} ${toggleCheck}`}>
            <label htmlFor="checkbox" onClick={handleTaskToggle}>
                <input readOnly type="checkbox" checked={data.check} />
                <span className={styles.checkbox}>
                    {data.check && <Check size={12} />}
                </span>
                <p>{data.content}</p>
            </label>
            <button onClick={handleRemove} title="Deletar Tarefa" className={styles.trashTask}>
                <Trash size={16} />
            </button>
        </div>
    )
} 