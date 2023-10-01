import React from 'react'
import { Grid, Stack, Typography, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/AddCircle';



const Tab = ({name, addTask}) => {
  return (
    <Grid item xs={4}>
                <Stack p={3} bgcolor='#000'>
                    <Stack direction='row' justifyContent='space-between' alignItems='center'>
                        <Typography fontWeight={400} variant='h6'>{name}</Typography>
                        <IconButton onClick={addTask}><AddIcon/></IconButton>
                    </Stack>
                    <Stack></Stack>
                </Stack>
            </Grid>
  )
}

export default Tab
