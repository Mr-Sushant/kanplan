import { useState } from 'react';
import Topbar from './Topbar'
import CreateBoardModal from './CreateBoardModal';
import { Stack, Typography } from '@mui/material';

const BoardsScreen = () => {
    const [showBoardModal, setShowBoardModal] = useState(false);
    const handleClick = () => setShowBoardModal(prev => !prev);
  return (
    <>
        <Topbar handleClick={handleClick}/>
        <CreateBoardModal open = {showBoardModal} handleClick={handleClick}/>
        <Stack mt={10} spacing={1} textAlign='center'>
            <Typography variant='h5'>No boards created</Typography>
            <Typography>Create your first board today!</Typography>
        </Stack>
    </>
  )
}

export default BoardsScreen
