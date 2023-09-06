import React, { useState, useEffect } from 'react'
import AddTodoForm from './AddTodoForm'
import { Container, Typography, styled } from '@mui/material'
import TodoTaskList from './TodoTaskList'
import TodoListFilter from './TodoListFilter'
import SearchTodoTask from './SearchTodoTask'

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
  const [editTask, setEditTask] = useState<TodoPropType | null>(null);
  const [todoList, setTodoList] = useState<TodoPropType[]>([]);
  const [filterTab, setFilterTab] = useState("Todo");
  const [searchKeyword, setSearchKeyword] = useState("");

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

    if (!editTask) {
      const newTodoList = [...todoList, newTodoItem];
      saveTodoList(newTodoList)
    } else {
      const taskIndex = todoList.findIndex((item) => item.id === editTask.id)
      let updatedTodoList = [...todoList];
      updatedTodoList[taskIndex] = { ...editTask, text: text }
      saveTodoList(updatedTodoList)
    }

  }

  const saveTodoList = (todoList: TodoPropType[]) => {
    setTodoList(todoList)
    localStorage.setItem('todoList', JSON.stringify(todoList));
    resetForm();
  }

  const resetForm = () => {
    setText("");
    setEditTask(null);
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
    saveTodoList(updateTodoList);
  }

  const handleOnEdit = (id: number) => {
    const foundTask = todoList.find((item) => item.id === id);
    if (foundTask) {
      setEditTask(foundTask);
      setText(foundTask.text)
    }
  }

  const handleOnTabChange = (tab: string) => {
    setFilterTab(tab)
  }

  const handleOnCheckClick = (item: TodoPropType) => {
    const taskIndex = todoList.findIndex((obj) => obj.id === item.id)
    if (taskIndex > -1) {
      const newStatus = item.status === "todo" ? "completed" : "todo";
      let updatedTodoList = [...todoList];
      updatedTodoList[taskIndex] = { ...updatedTodoList[taskIndex], status: newStatus }
      saveTodoList(updatedTodoList)
    }
  }

  const getFilteredTodoList = (list: any, tab: string) => {

    if (searchKeyword.length > 0) {
      return todoList.filter((item) => item.text.includes(searchKeyword));
    }

    if (tab.toLowerCase() !== 'all') {
      return todoList.filter((item) => item.status === tab.toLowerCase());
    }

    return list;
  }

  const handleOnSearch = (keyword: string) => {
    setSearchKeyword(keyword)
  }

  const filteredTodoList = getFilteredTodoList(todoList, filterTab);

  return (
    <TodoListContainer>
      <TodoListHeading variant='h1'>Todo List</TodoListHeading>
      <AddTodoForm
        handleOnChange={handleOnChange}
        handleOnSubmit={handleOnSubmit}
        value={text}
        buttonLabel={editTask ? "Update" : "Add"}
      />
      <SearchTodoTask
        value={searchKeyword}
        onSearch={handleOnSearch}
      />
      <TodoListFilter
        onTabChange={handleOnTabChange}
        value={filterTab}
      />
      <TodoTaskList
        onCheckClick={handleOnCheckClick}
        todoList={filteredTodoList}
        onDelete={handleOnDelete}
        onEdit={handleOnEdit}
      />
    </TodoListContainer>
  )
}

export default TodoList;