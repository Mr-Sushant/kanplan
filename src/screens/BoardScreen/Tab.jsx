import {memo} from 'react'
import { Grid, Stack, Typography, IconButton, useMediaQuery } from '@mui/material';
import AddIcon from '@mui/icons-material/AddCircle';
import Task from './Task';
import Droppable from '../../components/utils/StrictModeDroppable';


const Tab = ({name, tasks, openAddTaskModal, status, removeTask, openShiftTaskModal}) => {
  const isXs = useMediaQuery((theme) => theme.breakpoints.only("xs"));
  return (
   <Droppable droppableId={status}>
       {(provided) => <Grid {...provided.droppableProps} ref={provided.innerRef} item  xs={12} sm={4}>
                <Stack p={3} bgcolor='#000'>
                    <Stack direction='row' justifyContent='space-between' alignItems='center'>
                        <Typography fontWeight={400} variant='h6'>{name}</Typography>
                        <IconButton onClick={() => openAddTaskModal(status)}><AddIcon/></IconButton>
                    </Stack>
                    <Stack spacing={2} mt={3}>
                      {tasks.map((task, index) => (
                        <Task key={task.id} onClick={
                          isXs
                            ? () =>
                                openShiftTaskModal({
                                  text: task.text,
                                  index: index,
                                  status: status,
                                })
                            : null
                        } index={index} text={task.text} id={task.id} removeTask={() => removeTask(status, task.id)}/>
                      ))}
                    </Stack>
                    {provided.placeholder}
                </Stack>
            </Grid>}
   </Droppable>
  )
}

export default memo(Tab)
