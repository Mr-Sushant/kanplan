import {memo} from 'react'
import { Grid, Stack, Typography, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/AddCircle';
import Task from './Task';
import Droppable from '../../components/utils/StrictModeDroppable';



const Tab = ({name, tasks, openAddTaskModal, status, removeTask}) => {
  return (
   <Droppable droppableId={status}>
       {(provided) => <Grid {...provided.droppableProps} ref={provided.innerRef} item xs={4}>
                <Stack p={3} bgcolor='#000'>
                    <Stack direction='row' justifyContent='space-between' alignItems='center'>
                        <Typography fontWeight={400} variant='h6'>{name}</Typography>
                        <IconButton onClick={() => openAddTaskModal(status)}><AddIcon/></IconButton>
                    </Stack>
                    <Stack spacing={2} mt={3}>
                      {tasks.map((task, index) => (
                        <Task key={task.id} index={index} text={task.text} id={task.id} removeTask={() => removeTask(status, task.id)}/>
                      ))}
                    </Stack>
                    {provided.placeholder}
                </Stack>
            </Grid>}
   </Droppable>
  )
}

export default memo(Tab)
