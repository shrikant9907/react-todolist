import { Button, styled, Box } from '@mui/material'
import React from 'react'

const Tabs = styled(Box)({
  display: "flex",
  gap: "10px",
  marginBottom: "30px",
})

const Tab = styled(Button)({
  borderRadius: "8px",
})


const todoListOptions = [
  "All",
  "Todo",
  "Completed",
]

interface TodoListFilterPropType {
  onTabChange: Function,
  value: string,
}

const TodoListFilter = ({ onTabChange, value }: TodoListFilterPropType) => {
  return (
    <Tabs>
      {todoListOptions.map((tab) => {
        return <Tab
          onClick={() => onTabChange(tab)}
          size={"small"}
          variant="outlined"
          disabled={value === tab}
        >{tab
          }</Tab>
      })}
    </Tabs>
  )
}

export default TodoListFilter