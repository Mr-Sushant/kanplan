import React from 'react'
import { Dialog, Stack, Chip, Typography, Button } from '@mui/material'
import ModalHeader from '../../components/layout/ModalHeader'


const ShiftTaskModal = ({onClose, statuses}) => {
  return (
    <Dialog open fullWidth maxWidth='xs'>
        <Stack p={2} spacing={3}>
            <ModalHeader title='Shift Task' onClose={onClose}/>
            <Stack mt={3} spacing={1}>
                <Typography>Status</Typography>
                <Stack direction='row' spacing={1}>
                    {Object.keys(statuses).map(status => <Chip key={status} label={statuses[status]}></Chip>)}
                </Stack>
            </Stack>
            <Button variant='contained'>Shift Task</Button>
        </Stack>
    </Dialog>
  )
}

export default ShiftTaskModal
