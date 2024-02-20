import React from 'react'
import { Alert, Avatar, IconButton, Box, List, ListItem, ListItemAvatar, ListItemText, styled, Tooltip, Typography, Badge } from '@mui/material';
import { Check, DeleteOutline, EditOutlined, Undo } from '@mui/icons-material';
import { TodoPropType } from '.';

const TaskList = styled(List)({
  width: "100%", 
  maxHeight: "calc(100vh - 256px)",
  overflow: 'auto',
  "*": {
    fontSize: "12px"
  }
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
  fontSize: "16px",
  marginBottom: "5px"
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

const Checked = styled(Undo)({
  color: "#00cc00",
  background: "#ffffff",
  border: "1px solid #fff",
  borderRadius: "100%", 
  fontSize: "14px !important"
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
            <ListItemText primary={<Box>
              <Typography fontWeight={'bold'}>{item?.status === 'todo' ? <small>{item?.title}</small> : <del>{item?.title}</del>}</Typography>
              <Typography>{item?.status === 'todo' ? <small>{item?.description}</small> : <del>{item?.description}</del>}</Typography>
            </Box>} />
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