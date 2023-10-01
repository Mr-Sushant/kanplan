import React from 'react'
import { Grid, Stack, Typography, IconButton } from '@mui/material'
import AddIcon from '@mui/icons-material/AddCircle';


const BoardInterface = () => {
  return (
    <>
        <Grid container px={4} mt={2} spacing={2}>
            <Grid item xs={4}>
                <Stack p={3} bgcolor='#000'>
                    <Stack direction='row' justifyContent='space-between' alignItems='center'>
                        <Typography fontWeight={400} variant='h6'>TODOs</Typography>
                        <IconButton><AddIcon/></IconButton>
                    </Stack>
                    <Stack></Stack>
                </Stack>
            </Grid>
            <Grid item xs={4}>
                <Stack p={3} bgcolor='#000'>
                    <Stack direction='row' justifyContent='space-between' alignItems='center'>
                        <Typography fontWeight={400} variant='h6'>TODOs</Typography>
                        <IconButton><AddIcon/></IconButton>
                    </Stack>
                    <Stack></Stack>
                </Stack>
            </Grid>
            <Grid item xs={4}>
                <Stack p={3} bgcolor='#000'>
                    <Stack direction='row' justifyContent='space-between' alignItems='center'>
                        <Typography fontWeight={400} variant='h6'>TODOs</Typography>
                        <IconButton><AddIcon/></IconButton>
                    </Stack>
                    <Stack></Stack>
                </Stack>
            </Grid>
        </Grid>
    </>
  )
}

export default BoardInterface
