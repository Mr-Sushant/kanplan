import React, {useState} from 'react'
import { Grid, Stack, Typography, IconButton } from '@mui/material'
import Tab from './Tab'
import AddTaskModal from './AddTaskModal';

const tabs = {
  todos: 'TODOs',
  inProgress: 'In Progress',
  completed: 'Completed'
}

const BoardInterface = () => {
  const [addTaskTo, setAddTaskTo] = useState('');
  return (
    <>
        {!!addTaskTo && <AddTaskModal tabName={tabs[addTaskTo]} onClose={() => setAddTaskTo('')}/>}
        <Grid container px={4} mt={2} spacing={2}>
            {Object.keys(tabs).map(tab => (
              <Tab key={tab} name={tabs[tab]} addTask={() => setAddTaskTo(tab)}/>
            ))}
        </Grid>
    </>
  )
}

export default BoardInterface
