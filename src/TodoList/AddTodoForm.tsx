import React from 'react'
import { Box, TextField, styled, Button, Stack } from '@mui/material';

const TodoForm = styled(Box)({
  marginBottom: "15px",
})

const TextFieldStyled = styled(TextField)({
  borderRadius: "8px", 
  "*" : {
    fontSize: "14px",
  }
})

interface AddTodoFormPropTypes {
  value: string,
  buttonLabel: string,
  handleOnChange: Function,
  handleOnSubmit: Function
}

const AddTodoForm = ({ handleOnChange, handleOnSubmit, value, buttonLabel }: AddTodoFormPropTypes) => {

  return (
      <TodoForm
        component={'form'}
        onSubmit={(e) => handleOnSubmit(e)}
      >
       <Stack gap={"10px"} direction={"row"}>
       <TextFieldStyled
          fullWidth
          required
          size="small"
          placeholder='Add your task here.'
          id="add-todo-required"
          onChange={(e) => handleOnChange(e)}
          value={value}
        />
        <Button
          type={"submit"}
          disabled={value.length === 0}
          variant="contained"
          style={{textTransform: 'unset'}}
          color="primary">
          {buttonLabel}
        </Button>
       </Stack>
      </TodoForm>
  )
}

export default AddTodoForm;