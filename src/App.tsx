import React, { useState } from "react"
import "./App.css"
import InputField from "./components/InputField"
import TodoList from "./components/TodoList"
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd"
import { Todo } from "./models"

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("")
  const [todos, setTodos] = useState<Todo[]>([])
  const [financialTodos, setFinancialTodos] = useState<Todo[]>([]) // add new todo
  const [personalImprovementTodos, setPersonalImprovementTodos] = useState<
    Todo[]
  >([])
  const [healthTodos, setHealthTodos] = useState<Todo[]>([])
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([])

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()

    if (todo) {
      setTodos([
        ...todos,
        { id: Date.now(), todo: todo, isDone: false }, // add new todo
      ])
      // Add to local storage
      localStorage.setItem("todos", JSON.stringify(todos))

      setTodo("") // clear input field
    }
  }

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result

    if (!destination) return
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return
    let add,
      active = todos,
      complete = completedTodos,
      financial = financialTodos, // add new todo
      personalImprovement = personalImprovementTodos,
      health = healthTodos

    if (source.droppableId === "TodosList") {
      add = active[source.index]
      active.splice(source.index, 1)
    } else if (source.droppableId === "TodosRemove") {
      add = complete[source.index]
      complete.splice(source.index, 1)
    } else if (source.droppableId === "TodosFinancial") {
      // add new todo
      add = financial[source.index]
      financial.splice(source.index, 1)
    } else if (source.droppableId === "TodosPersonalImprovement") {
      add = personalImprovement[source.index]
      personalImprovement.splice(source.index, 1)
    } else {
      add = health[source.index]
      health.splice(source.index, 1)
    }

    if (destination.droppableId === "TodosList") {
      active.splice(destination.index, 0, add)
    } else if (destination.droppableId === "TodosRemove") {
      complete.splice(destination.index, 0, add)
    } else if (destination.droppableId === "TodosFinancial") {
      // add new todo
      financial.splice(destination.index, 0, add)
    } else if (destination.droppableId === "TodosPersonalImprovement") {
      personalImprovement.splice(destination.index, 0, add)
    } else {
      health.splice(destination.index, 0, add)
    }

    setFinancialTodos(financial) // add new todo
    setPersonalImprovementTodos(personalImprovement)
    setHealthTodos(health)
    setCompletedTodos(complete)
    setTodos(active)
  }
  console.log(todos)
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className="heading">Taskify</span>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <TodoList
          todos={todos}
          setTodos={setTodos}
          completedTodos={completedTodos}
          setCompletedTodos={setCompletedTodos}
          financialTodos={financialTodos}
          setFinancialTodos={setFinancialTodos}
          personalImprovementTodos={personalImprovementTodos}
          setPersonalImprovementTodos={setPersonalImprovementTodos}
          healthTodos={healthTodos}
          setHealthTodos={setHealthTodos}
        />
      </div>
    </DragDropContext>
  )
}

export default App
