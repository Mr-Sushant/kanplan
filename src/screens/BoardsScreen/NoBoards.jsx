import { Stack, Typography } from "@mui/material"
const NoBoards = () => {
  return (
    <Stack mt={10} spacing={1} textAlign='center'>
            <Typography variant='h5'>No boards created</Typography>
            <Typography>Create your first board today!</Typography>
        </Stack>
  )
}

export default NoBoards
