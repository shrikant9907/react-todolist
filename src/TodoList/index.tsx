import React, { useState, useEffect } from 'react'
import AddTodoForm from './AddTodoForm'
import { Container, Typography, styled } from '@mui/material'
import TodoTaskList from './List'

const TodoListContainer = styled(Container)({
  width: "100%",
  maxWidth: "900px",
})

const TodoListHeading = styled(Typography)({
  fontSize: "30px",
  padding: "30px 0",
  textAlign: "center",
  fontWeight: 700
})

export interface TodoPropType {
  id: number,
  text: string,
  status: string
}

const TodoList = () => {

  const [text, setText] = useState("");
  const [todoList, setTodoList] = useState<TodoPropType[]>([]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value } = e.target;
    setText(value);
  }

  const handleOnSubmit = (e: React.FormEvent<HTMLDivElement>) => {
    e.preventDefault();

    const todoItemId = todoList && todoList.length > 0 ? todoList[todoList.length - 1].id + 1 : 1

    const newTodoItem = {
      id: todoItemId,
      text: text,
      status: "todo"
    }

    const newTodoList = [...todoList, newTodoItem];
    saveTodoList(newTodoList)

  }

  const saveTodoList = (todoList: TodoPropType[]) => {
    setTodoList(todoList)
    localStorage.setItem('todoList', JSON.stringify(todoList));
    resetForm();
  }

  const resetForm = () => {
    setText("");
  }

  const fetchTodoList = async () => {
    const list = localStorage.getItem('todoList');
    let listJson = [];
    if (list) {
      listJson = await JSON.parse(list);
    }
    setTodoList(listJson)
  }

  useEffect(() => {
    fetchTodoList()
  }, [])

  const handleOnDelete = (id: number) => {
    const updateTodoList = todoList.filter((item) => item.id !== id);
    console.log('updateTodoList', updateTodoList, id)
    saveTodoList(updateTodoList);
  }

  const handleOnEdit = (id: number) => {
    setText("");
  }

  return (
    <TodoListContainer>
      <TodoListHeading variant='h1'>Todo List</TodoListHeading>
      <AddTodoForm
        handleOnChange={handleOnChange}
        handleOnSubmit={handleOnSubmit}
        value={text}
      />
      <TodoTaskList
        todoList={todoList}
        onDelete={handleOnDelete}
        onEdit={handleOnEdit}
      />
    </TodoListContainer>
  )
}

export default TodoList;