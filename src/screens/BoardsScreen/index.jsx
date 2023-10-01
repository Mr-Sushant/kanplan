import { useState, useEffect } from 'react';
import Topbar from './Topbar'
import CreateBoardModal from './CreateBoardModal';
import { Stack, Typography, Grid, IconButton, Box } from '@mui/material';
import NoBoards from './NoBoards';
import BoardCard from './BoardCard';
import useApp from '../../hooks/useApp';
import AppLoader from '../../components/layout/AppLoader';
import useStore from '../../store';

const BoardsScreen = () => {
    const {fetchBoards} = useApp();
    const {areBoardsFetched, boards} = useStore();
    const [showBoardModal, setShowBoardModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const handleClick = () => setShowBoardModal(prev => !prev);


    useEffect(() =>{
        if(!areBoardsFetched) fetchBoards(setLoading);
        else setLoading(false);
        
    },[]);

    if (loading) return <AppLoader/>
  return (
    <>
        <Topbar handleClick={handleClick}/>
        <CreateBoardModal open = {showBoardModal} handleClick={handleClick}/>
        {/* <NoBoards /> */}

        <Stack px={3} mt={5}>
        <Grid container spacing={4}>
            {boards.map((board) => (
                <BoardCard key = {board.id} {...board}/>
            ))}
        </Grid>
        </Stack>
    </>
  )
}

export default BoardsScreen
