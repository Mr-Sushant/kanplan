import {useEffect, useRef, useState} from 'react'
import { Dialog, Typography, Stack, IconButton, Chip, OutlinedInput, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';


const AddTaskModal = ({tabName, onClose, addTask, loading}) => {
  const [task, setTask] = useState('');

  return (
    <Dialog open fullWidth maxWidth='xs' onClose={onClose}>
        <Stack p={2}>
        <Stack direction='row' alignItems='center' justifyContent='space-between' mb={3}>
            <Typography variant='h6'>Add Task</Typography>
            <IconButton onClick={onClose}><CloseIcon/></IconButton>
        </Stack>
        <Stack spacing={2}>
        <Stack direction='row' alignItems='center' spacing={1}>
            <Typography>Status: </Typography>
            <Chip size='small' label={tabName}></Chip>
        </Stack>
        <OutlinedInput value={task} onChange={(e) => setTask(e.target.value)} placeholder='Task'/>
        <Button disabled={loading || !task} variant='contained' onClick={() => addTask(task)}>Add Task</Button>
        </Stack>
        </Stack>
    </Dialog>
  )
}

export default AddTaskModal
