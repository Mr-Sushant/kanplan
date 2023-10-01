import React from 'react'
import { Dialog, Typography, Stack, IconButton, Chip, OutlinedInput, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';


const AddTaskModal = () => {
  return (
    <Dialog open fullWidth maxWidth='xs'>
        <Stack p={2}>
        <Stack direction='row' alignItems='center' justifyContent='space-between' mb={3}>
            <Typography variant='h6'>Add Task</Typography>
            <IconButton><CloseIcon/></IconButton>
        </Stack>
        <Stack spacing={2}>
        <Stack direction='row' alignItems='center' spacing={2}>
            <Typography>Status: </Typography>
            <Chip size='small' label='TODOs'></Chip>
        </Stack>
        <OutlinedInput placeholder='Task'/>
        <Button variant='contained'>Add Task</Button>
        </Stack>
        </Stack>
    </Dialog>
  )
}

export default AddTaskModal
