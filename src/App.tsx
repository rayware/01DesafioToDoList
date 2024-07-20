
import styles from "./App.module.css"

import logo from "./assets/logo.png"
import clipBoard from "./assets/Clipboard.png"
import plus from "./assets/plus.png"
import { Check, Trash } from "@phosphor-icons/react";
import { useState } from "react";

export interface toDoList {
  id: number;
  check: boolean;
  content: string;
}

export function App() {
  const [isToDoList, setIsToDoList] = useState<toDoList[]>([])
  const [inputValue, setInputValue] = useState('')

  function addNewTask() {
    if(!inputValue){
      return
    }

    const newTask: toDoList = {
      id: new Date().getTime(),
      check: false,
      content: inputValue,
    }

    setIsToDoList((state) => [...state, newTask])
    setInputValue('')
  }

  function handleToggleTask(id: number){
    const updatedTaks = isToDoList.map((task) => {
      if (task.id === id) {
        return {...task, check: !task.check }
      }

      return {...task}
    })

    setIsToDoList(updatedTaks)
  }

  function removeTask(id: number){
    const filterTask = isToDoList.filter((task) => task.id !== id)

    setIsToDoList(filterTask)
  }

  const chekedTaksConclued = isToDoList.reduce((prev, current) => {
    if (current.check) {
      return prev + 1
    }

    return prev
  }, 0)

  return (
    <>
      <header className={styles.header}>
        <img src={logo} alt="" />
      </header>


      <div className={styles.content}>
        <div className={styles.newTask}>
          <input
            type="text"
            placeholder="Adicione uma nova tarefa"
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
          />
          <button onClick={addNewTask}>
            Criar
            <img src={plus} alt="" />
          </button>
        </div>


        <div className={styles.tasks}>
          <header>
            <div>
              <p>Tarefas criadas</p><span>{isToDoList.length}</span>
            </div>
            <div>
              <p>Concluídas</p><span>{chekedTaksConclued}</span>
            </div>
          </header>
          {
            (
              isToDoList.length
                ?
                <div className={styles.list}>
                  {
                    isToDoList.map(list => {
                      
                      const toggleCheck = list.check 
                      ? styles['checkboxTrue']
                      : styles['checkboxFalse']

                      return (
                        <>
                          <div className={`${styles.taskBox} ${toggleCheck}`}>
                            <label htmlFor="checkbox" onClick={() => handleToggleTask(list.id)}>
                              <input readOnly type="checkbox" checked={list.check}/>
                              <span className={styles.checkbox}>
                                {list.check && <Check size={12} />}
                              </span>
                              <p>{list.content}</p>
                            </label>
                            <button onClick={() => removeTask(list.id)} title="Deletar Tarefa" className={styles.trashTask}>
                              <Trash size={16} />
                            </button>
                          </div>
                        </>
                      )
                    }

                    )
                  }
                </div>
                :
                <div className={styles.empty}>
                  <img src={clipBoard} alt="" />
                  <p><strong>Você ainda não tem tarefas cadastradas</strong></p>
                  <p>Crie tarefas e organize seus itens a fazer</p>
                </div>
            )
          }
        </div>
      </div>
    </>
  )
}

