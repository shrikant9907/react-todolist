import React from 'react'
import { Box, TextField, styled, Button, Stack, TextareaAutosize } from '@mui/material';

const TodoForm = styled(Box)({
  marginBottom: "15px",
})

const TextFieldStyled = styled(TextField)({
  "*": {
    fontSize: "14px", 
  }
})
const TextAreaStyled = styled(TextareaAutosize)({
  border: "1px solid rgba(0, 0, 0, 0.23)",
  borderRadius: "4px",
  height: "50px",
  padding: "15px",
  fontFamily: "Roboto",
  fontSize: "14px",
})

interface AddTodoFormPropTypes {
  title: string,
  description: string,
  buttonLabel: string,
  handleOnChange: Function,
  handleOnSubmit: Function
}

const AddTodoForm = ({ handleOnChange, handleOnSubmit, title, description, buttonLabel }: AddTodoFormPropTypes) => {

  return (
    <TodoForm
      component={'form'}
      onSubmit={(e) => handleOnSubmit(e)}
    >
      <Stack gap={"10px"}>
        <TextFieldStyled
          fullWidth
          required
          size="small"
          name={'title'}
          placeholder='Add your task here.'
          id="add-task-title"
          onChange={(e) => handleOnChange(e)}
          value={title}
        />
        <TextAreaStyled
          name="description"
          placeholder='Add description'
          id="add-task-description"
          onChange={(e) => handleOnChange(e)}
          value={description}
        ></TextAreaStyled>
        <Button
          type={"submit"}
          disabled={title.length === 0}
          variant="contained"
          style={{ textTransform: 'unset' }}
          color="primary">
          {buttonLabel}
        </Button>
      </Stack>
    </TodoForm>
  )
}

export default AddTodoForm;