import {useEffect, useRef, useState} from 'react'
import { Dialog, Typography, Stack, IconButton, Chip, OutlinedInput, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ModalHeader from '../../components/layout/ModalHeader';


const AddTaskModal = ({tabName, onClose, addTask}) => {
  const [task, setTask] = useState('');

  return (
    <Dialog open fullWidth maxWidth='xs' onClose={onClose}>
        <Stack p={2}>
        <ModalHeader title='Add Task' onClose={onClose}/>
        <Stack mt={3} spacing={2}>
        <Stack direction='row' alignItems='center' spacing={1}>
            <Typography>Status: </Typography>
            <Chip size='small' label={tabName}></Chip>
        </Stack>
        <OutlinedInput value={task} onChange={(e) => setTask(e.target.value)} placeholder='Task'/>
        <Button disabled={!task} variant='contained' onClick={() => addTask(task)}>Add Task</Button>
        </Stack>
        </Stack>
    </Dialog>
  )
}

export default AddTaskModal
