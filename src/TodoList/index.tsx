import React, { useState, useEffect } from 'react'
import AddTodoForm from './AddTodoForm'
import { Alert, AlertProps, Container, Snackbar, Typography, styled, Box, Button, Tooltip, Divider } from '@mui/material'
import TodoTaskList from './TodoTaskList'
import TodoListFilter from './TodoListFilter'
import SearchTodoTask from './SearchTodoTask'
import ResetConfirmationDialog from './ResetConfirmationDialog'

const TodoListContainer = styled(Container)({
  width: "100%",
  maxWidth: "900px",
})

const TodoHeader = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
})

const TodoListHeading = styled(Typography)({
  fontSize: "20px",
  padding: "15px 0",
  textAlign: "center",
  fontWeight: 500
})

export interface TodoPropType {
  id: number,
  title: string,
  description: string,
  status: string,
  created: string | number,
}

const TodoList = () => {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editTask, setEditTask] = useState<TodoPropType | null>(null);
  const [todoList, setTodoList] = useState<TodoPropType[]>([]);
  const [filterTab, setFilterTab] = useState("Todo");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [alertData, setAlertData] = useState({
    type: "success",
    message: "New task added."
  });
  const [openResetDialog, setOpenResetDialog] = useState(false);


  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value, name } = e.target;
    if (name == "title") {
      setTitle(value ? value.trimStart() : "");
    } else {
      setDescription(value);
    }
  }

  const handleOnSubmit = (e: React.FormEvent<HTMLDivElement>) => {
    e.preventDefault();

    const todoItemId = todoList && todoList.length > 0 ? todoList[todoList.length - 1].id + 1 : 1
    const timestamp = new Date().getTime();
    const newTodoItem = {
      id: todoItemId,
      title: title?.trim(),
      description,
      status: "todo",
      created: timestamp,
    }

    if (!editTask) {
      const newTodoList = [...todoList, newTodoItem];
      saveTodoList(newTodoList)
      setAlertData({
        ...alertData, message: "New task added."
      })
    } else {
      const taskIndex = todoList.findIndex((item) => item.id === editTask.id)
      let updatedTodoList = [...todoList];
      updatedTodoList[taskIndex] = { ...editTask, title, description }
      saveTodoList(updatedTodoList)
      setAlertData({
        ...alertData, message: "Task updated."
      })
    }

    setOpenSnackBar(true);
  }

  const saveTodoList = (todoList: TodoPropType[]) => {
    setTodoList(todoList)
    localStorage.setItem('todoList', JSON.stringify(todoList));
    resetForm();
  }

  const resetForm = () => {
    setTitle("");
    setDescription("");
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
    const taskIndex = todoList.findIndex((obj) => obj.id === id)
    if (taskIndex > -1) {
      const newStatus = "deleted";
      let updatedTodoList = [...todoList];
      updatedTodoList[taskIndex] = { ...updatedTodoList[taskIndex], status: newStatus }
      saveTodoList(updatedTodoList)
    }

    setOpenSnackBar(true);
    setAlertData({
      ...alertData, message: "Task deleted."
    })
  }

  const handleOnEdit = (id: number) => {
    const foundTask = todoList.find((item) => item.id === id);
    if (foundTask) {
      setEditTask(foundTask);
      setTitle(foundTask.title)
      setDescription(foundTask.description)
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
      return todoList.filter((item) => item.title.includes(searchKeyword));
    }

    if (tab.toLowerCase() !== 'all') {
      return todoList.filter((item) => item.status === tab.toLowerCase());
    }

    return list;
  }

  const handleOnSearch = (keyword: string) => {
    setSearchKeyword(keyword)
  }

  const handleOnSnackbarClose = () => {
    setOpenSnackBar(!openSnackBar)
  }

  const resetTodoList = () => {
    localStorage.removeItem('todoList');
    resetForm();
    setOpenSnackBar(true);
    setAlertData({
      ...alertData, message: "All tasks has been removed permanently."
    })
    fetchTodoList()
    setOpenResetDialog(false);
  }

  const filteredTodoList = getFilteredTodoList(todoList, filterTab);

  return (
    <TodoListContainer>
      <TodoHeader>
        <TodoListHeading variant='h1'>Todo List </TodoListHeading>
        {todoList.length > 0 &&
          <Tooltip arrow title="It will remove all tasks permanently" placement="left">
            <Button size='small' onClick={() => setOpenResetDialog(true)} variant="outlined" color="error">
              Reset
            </Button>
          </Tooltip>
        }
      </TodoHeader>
      <Divider style={{ marginBottom: "15px" }} />

      <AddTodoForm
        handleOnChange={handleOnChange}
        handleOnSubmit={handleOnSubmit}
        title={title}
        description={description}
        buttonLabel={editTask ? "Update" : "Add"}
      />
      <Divider style={{ marginBottom: "15px" }} />
      {todoList.length > 0 &&
        <SearchTodoTask
          value={searchKeyword}
          onSearch={handleOnSearch}
        />
        &&
        <TodoListFilter
          onTabChange={handleOnTabChange}
          value={filterTab}
        />
      }
      <TodoTaskList
        onCheckClick={handleOnCheckClick}
        todoList={filteredTodoList}
        onDelete={handleOnDelete}
        onEdit={handleOnEdit}
      />
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={openSnackBar}
        autoHideDuration={1000}
        onClose={handleOnSnackbarClose}
      >
        <Alert onClose={handleOnSnackbarClose} severity={alertData?.type as AlertProps["severity"]}>
          {alertData.message}
        </Alert>
      </Snackbar>

      <ResetConfirmationDialog
        open={openResetDialog}
        onClose={() => setOpenResetDialog(false)}
        onConfirm={resetTodoList}
      />
    </TodoListContainer>
  )
}

export default TodoList;