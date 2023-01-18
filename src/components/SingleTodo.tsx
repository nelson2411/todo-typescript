import React, { useEffect } from "react"
import { AiFillEdit } from "react-icons/ai"
import { RiDeleteBin5Fill } from "react-icons/ri"
import { Draggable } from "react-beautiful-dnd"
import { useDispatch, useSelector } from "react-redux"
import { addTodo, selectTodos } from "../redux/slices/todoSlice"
import { MdDone } from "react-icons/md"
import { Todo } from "../models"
import "./styles.css"

type Props = {
  index: number
  todo: Todo
  todos: Todo[] // this is the state of the todos
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

const SingleTodo: React.FC<Props> = ({
  index,
  todos,
  todo,
  setTodos,
}: Props) => {
  const [edit, setEdit] = React.useState<boolean>(false)
  const [editTodo, setEditTodo] = React.useState<string>(todo.todo)
  const dispatch = useDispatch()
  const todosState = useSelector(selectTodos)

  const handleDone = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    )
  }
  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault()

    setTodos(
      todosState.map((todo: any) =>
        todo.id === id ? { ...todo, todo: editTodo } : todo
      )
    )
    setEdit(false)
  }
  React.useEffect(() => {
    inputRef.current?.focus()
  }, [edit])

  const inputRef = React.useRef<HTMLInputElement>(null)
  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided, snapshot) => (
        <form
          className={`todos__single ${snapshot.isDragging ? "drag" : ""}`}
          onSubmit={(e) => handleEdit(e, todo.id)}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {edit ? (
            <input
              ref={inputRef}
              value={editTodo}
              onChange={(e) => setEditTodo(e.target.value)}
              className="todos__single--text"
            />
          ) : todo.isDone ? (
            <s className="todos__single--text">{todo.todo}</s>
          ) : (
            <span className="todos__single--text">{todo.todo}</span>
          )}
          <div>
            <span
              className="icon"
              onClick={() => {
                if (!edit && !todo.isDone) {
                  setEdit(!edit)
                }
              }}
            >
              <AiFillEdit />
            </span>
            <span className="icon" onClick={() => handleDelete(todo.id)}>
              <RiDeleteBin5Fill />
            </span>
            <span className="icon" onClick={() => handleDone(todo.id)}>
              <MdDone />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  )
}

export default SingleTodo
