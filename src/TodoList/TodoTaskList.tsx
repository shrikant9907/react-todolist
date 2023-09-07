import React from 'react'
import { Alert, Avatar, IconButton, Box, List, ListItem, ListItemAvatar, ListItemText, styled, Tooltip, Typography, Badge } from '@mui/material';
import { Check, DeleteOutline, EditOutlined } from '@mui/icons-material';
import { TodoPropType } from '.';

const TaskList = styled(List)({
  width: "100%",
  bgcolor: 'background.paper',
  maxHeight: "400px",
  overflow: 'auto',
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
  fontSize: "20px",
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
  color: "#00cc00",
  background: "#fff",
  borderRadius: "100%",
})

interface TodoListPropType {
  todoList: TodoPropType[],
  onDelete: Function,
  onEdit: Function,
  onCheckClick: Function,
}

const TodoTaskList = ({ todoList, onDelete, onEdit, onCheckClick }: TodoListPropType) => {

  return (
    <>
      <TodoListSubHeading variant='h2'>
        <Badge
          badgeContent={todoList.length}
          color="primary"
        >
          List
        </Badge>

      </TodoListSubHeading>

      <TaskList>
        {todoList.length > 0 ? todoList.map((item: any) => {
          return <ListItemStyled key={`list_item${item?.id}`}
            secondaryAction={
              <Box>
                {item.status === 'todo' &&
                  <EditButton onClick={() => onEdit(item.id)} edge="end" aria-label="edit">
                    <Tooltip placement="top" title={"Edit Task"}>
                      <EditOutlined />
                    </Tooltip>
                  </EditButton>
                }
                {item.status !== 'deleted' &&
                  <DeleteButton onClick={() => onDelete(item.id)} edge="end" aria-label="delete">
                    <Tooltip placement="top" title={"Delete Task"}>
                      <DeleteOutline />
                    </Tooltip>
                  </DeleteButton>
                }
              </Box>
            }
            style={{ opacity: item.status === 'deleted' ? "0.4" : 1 }}
          >
            <ListItemAvatar>
              <Tooltip placement="top" title={item.status === "completed" ? "Mark as Todo" : "Mark as completed"}>
                <Avatar24 onClick={() => onCheckClick(item)}>
                  {item.status === "completed" ? <Checked /> : <Check />}
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