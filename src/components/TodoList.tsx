import React, { useState } from "react"
import { Todo } from "../models"
import "./styles.css"
import { Droppable } from "react-beautiful-dnd"
import { useSelector, useDispatch } from "react-redux"
import { addTodo, selectTodos } from "../redux/slices/todoSlice"

import SingleTodo from "./SingleTodo"

interface Props {
  todos: Todo[]
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
  completedTodos: Todo[]
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>
  financialTodos: Todo[]
  setFinancialTodos: React.Dispatch<React.SetStateAction<Todo[]>>
  personalImprovementTodos: Todo[]
  setPersonalImprovementTodos: React.Dispatch<React.SetStateAction<Todo[]>>
  healthTodos: Todo[]
  setHealthTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

const TodoList: React.FC<Props> = ({
  todos,
  setTodos,
  completedTodos,
  setCompletedTodos,
  financialTodos,
  setFinancialTodos,
  personalImprovementTodos,
  setPersonalImprovementTodos,
  healthTodos,
  setHealthTodos,
}: Props) => {
  return (
    <div className="container">
      <Droppable droppableId="TodosList">
        {(provided, snapshot) => (
          <div
            className={`todos ${snapshot.isDraggingOver ? "dragactive" : ""}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos__heading">Active Tasks</span>
            {todos.map((todo, index) => (
              <SingleTodo
                index={index}
                todo={todo}
                todos={todos}
                key={todo.id}
                setTodos={setTodos}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId="TodosRemove">
        {(provided, snapshot) => (
          <div
            className={`todos remove ${
              snapshot.isDraggingOver ? "dragcomplete" : ""
            }`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos__heading">Completed Tasks</span>
            {completedTodos.map((todo, index) => (
              <SingleTodo
                index={index}
                todo={todo}
                todos={todos}
                key={todo.id}
                setTodos={setCompletedTodos}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId="TodosFinancial">
        {(provided, snapshot) => (
          <div
            className="todos financial"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos__heading">Financial</span>
            {financialTodos?.map((todo, index) => (
              <SingleTodo
                index={index}
                todo={todo}
                todos={todos}
                key={todo.id}
                setTodos={setFinancialTodos}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId="TodosPersonalImprovement">
        {(provided, snapshot) => (
          <div
            className="todos personalImprovement"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos__heading">Personal Improvement</span>
            {personalImprovementTodos?.map((todo, index) => (
              <SingleTodo
                index={index}
                todo={todo}
                todos={todos}
                key={todo.id}
                setTodos={setPersonalImprovementTodos}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId="TodosHealth">
        {(provided, snapshot) => (
          <div
            className="todos health"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos__heading">Health</span>
            {healthTodos?.map((todo, index) => (
              <SingleTodo
                index={index}
                todo={todo}
                todos={todos}
                key={todo.id}
                setTodos={setHealthTodos}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )
}

export default TodoList
