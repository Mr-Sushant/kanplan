import React from 'react'
import { Grid, Stack, Typography, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/AddCircle';
import Task from './Task';



const Tab = ({name, addTask, tasks}) => {
  return (
    <Grid item xs={4}>
                <Stack p={3} bgcolor='#000'>
                    <Stack direction='row' justifyContent='space-between' alignItems='center'>
                        <Typography fontWeight={400} variant='h6'>{name}</Typography>
                        <IconButton onClick={addTask}><AddIcon/></IconButton>
                    </Stack>
                    <Stack spacing={2} mt={3}>
                      {tasks.map((task) => (
                        <Task key={task.id} text={task.text} id={task.id} />
                      ))}
                    </Stack>
                </Stack>
            </Grid>
  )
}

export default Tab
