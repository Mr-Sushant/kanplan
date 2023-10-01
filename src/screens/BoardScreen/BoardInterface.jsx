import React from 'react'
import { Grid, Stack, Typography, IconButton } from '@mui/material'
import Tab from './Tab'
import AddTaskModal from './AddTaskModal'
const BoardInterface = () => {
  return (
    <>
        <AddTaskModal/>
        <Grid container px={4} mt={2} spacing={2}>
            <Tab />
        </Grid>
    </>
  )
}

export default BoardInterface
