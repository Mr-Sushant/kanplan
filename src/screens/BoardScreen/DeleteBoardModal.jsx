import React, {useState} from 'react'
import { Dialog, Stack, Typography, Box, Button, TextField } from '@mui/material';
import ModalHeader from '../../components/layout/ModalHeader';
import { colors } from '../../theme';
import useApp from '../../hooks/useApp';


const DeleteBoardModal = ({handleConfirmDelete, handleDeleteButton, handleCancelButton}) => {

   
  return (
    <Dialog open={open} onClose={handleDeleteButton} fullWidth maxWidth="xs">
       <Stack p={2}>
        Are you sure you want to delete this board ? This action is irreversible.
        <Stack direction='row' alignItems='center' justifyContent='space-between'>
        <Button onClick={handleCancelButton}>Cancel</Button>
        <Button onClick={handleConfirmDelete}>Delete</Button>
        </Stack>
       </Stack>
    </Dialog>
  )
}

export default DeleteBoardModal
