import React from 'react'
import { Box, TextField, styled } from '@mui/material';

const TodoForm = styled(Box)({
  marginBottom: "15px",
})

const TextFieldStyled = styled(TextField)({
  borderRadius: "8px",
  marginBottom: "5px",
})

interface SearchTodoTaskPropTypes {
  value: string,
  onSearch: Function,
}

const SearchTodoTask = ({ onSearch, value }: SearchTodoTaskPropTypes) => {

  return (
    <div>
      <TodoForm
      >
        <TextFieldStyled
          fullWidth
          placeholder='Search task here...'
          onChange={(e) => onSearch(e.target.value)}
          value={value}
        />
      </TodoForm>
    </div>
  )
}

export default SearchTodoTask;