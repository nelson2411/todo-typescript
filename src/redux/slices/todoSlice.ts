import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Todo } from "../../models"
import { RootState } from "../store"

interface TodoState {
  todos: Todo[]
  financialTodos: Todo[]
  personalImprovementTodos: Todo[]
  healthTodos: Todo[]
}

const initialState: TodoState = {
  todos: [],
  financialTodos: [],
  personalImprovementTodos: [],
  healthTodos: [],
}

// Define the slice

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    // we will deine the todos created, however they won't be completed yet
    addTodo: (state, action: PayloadAction<Todo>) => {
      // we need the entire todo object
      state.todos.push(action.payload)
    },
    // we will define the todos that are completed
    doneTodo: (state, action: PayloadAction<number>) => {
      state.todos.map((todo) =>
        todo.id !== action.payload ? { ...todo, isDone: !todo.isDone } : todo
      )
    },
    // we will define the todos that are removed
    removeTodo: (state, action: PayloadAction<number>) => {
      state.todos.filter((todo) => todo.id !== action.payload)
    },
  },
})

// Export the actions
export const selectTodos = (state: RootState) => state.todos.todos
export const { addTodo, doneTodo, removeTodo } = todoSlice.actions

// Export the reducer

export default todoSlice.reducer
