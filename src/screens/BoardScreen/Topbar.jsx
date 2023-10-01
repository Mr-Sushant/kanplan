import {AppBar, Toolbar, IconButton, Stack, Typography} from '@mui/material';
import BackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';



const Topbar = () => {
  return (
    <AppBar position='static' sx={{
        borderBottom: '5px solid',
        borderColor: 'white'
    }}>
        <Toolbar sx={{justifyContent:'space-between'}}>
            <Stack alignItems='center' spacing={1} direction='row'>
                <IconButton size='small'><BackIcon/></IconButton>
                <Typography variant='h6'>Board</Typography>
            </Stack>

            <Stack alignItems='center' spacing={2} direction='row'>
            <Typography variant='body2'>Last Updated at: 01/10/2023:17:55</Typography>
            <IconButton size='small'><DeleteIcon/></IconButton>
            </Stack>
            
        </Toolbar>
        </AppBar>
  )
}

export default Topbar
