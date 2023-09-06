import React from 'react'
import { Alert, Avatar, IconButton, Box, List, ListItem, ListItemAvatar, ListItemText, styled, Tooltip, Typography } from '@mui/material';
import { Check, DeleteOutline, EditOutlined } from '@mui/icons-material';
import { TodoPropType } from '.';

const TaskList = styled(List)({
  width: "100%",
  bgcolor: 'background.paper'
})

const ListItemStyled = styled(ListItem)({
  background: "#efefef",
  borderRadius: "8px",
  marginBottom: "5px",
})

const Avatar24 = styled(Avatar)({
  width: "28px",
  height: "28px",
  opacity: "0.5",
  cursor: "pointer",
  "&:hover": {
    opacity: "1",
  }
})

const TodoListSubHeading = styled(Typography)({
  fontSize: "30px",
  marginBottom: "10px"
})

const EditButton = styled(IconButton)({
  marginRight: '8px',
  background: "#ffffff",
  "& *": {
    fontSize: "18px",
  }
})

const DeleteButton = styled(EditButton)({
  marginRight: '0px',
  color: '#ff0000'
})

const Checked = styled(Check)({
  color: "#00ff00"
})

interface TodoListPropType {
  todoList: TodoPropType[],
  onDelete: Function,
  onEdit: Function,
}

const TodoTaskList = ({ todoList, onDelete, onEdit }: TodoListPropType) => {

  return (
    <>
      <TodoListSubHeading variant='h2'>List</TodoListSubHeading>

      <TaskList>
        {todoList.length > 0 ? todoList.map((item: any) => {
          return <ListItemStyled key={`list_item${item?.id}`}
            secondaryAction={
              <Box>
                <EditButton onClick={() => onDelete(item.id)} edge="end" aria-label="edit">
                  <Tooltip placement="top" title={"Edit Task"}>
                    <EditOutlined />
                  </Tooltip>
                </EditButton>
                <DeleteButton onClick={() => onDelete(item.id)} edge="end" aria-label="delete">
                  <Tooltip placement="top" title={"Delete Task"}>
                    <DeleteOutline />
                  </Tooltip>
                </DeleteButton>
              </Box>
            }
          >
            <ListItemAvatar>
              <Tooltip placement="top" title={item.done ? "Mark as Todo" : "Mark as completed."}>
                <Avatar24>
                  {item.done ? <Checked /> : <Check />}
                </Avatar24>
              </Tooltip>
            </ListItemAvatar>
            <ListItemText primary={item?.text} />
          </ListItemStyled >
        }) :
          <Alert variant="outlined" severity="info">
            No task available.
          </Alert>
        }

      </TaskList ></>
  )
}

export default TodoTaskList;