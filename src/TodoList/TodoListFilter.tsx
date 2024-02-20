import React from 'react'
import { Button, styled, Box } from '@mui/material'

const Tabs = styled(Box)({
  display: "flex",
  gap: "10px",
  marginBottom: "15px",
})

const Tab = styled(Button)({
  borderRadius: "8px",
})

const todoListOptions = [
  "All",
  "Todo",
  "Completed",
  "Deleted",
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