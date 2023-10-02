import {AppBar, Toolbar, IconButton, Stack, Typography} from '@mui/material';
import BackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import {colors} from '../../theme';

const Topbar = ({name, lastUpdated, color}) => {
    const navigate = useNavigate();
  return (
    <AppBar position='static' sx={{
        borderBottom: '5px solid',
        borderColor: colors[color],
    }}>
        <Toolbar sx={{justifyContent:'space-between'}}>
            <Stack alignItems='center' spacing={1} direction='row'>
                <IconButton onClick={() => navigate(`/boards`)} size='small'><BackIcon/></IconButton>
                <Typography variant='h6'>{name}</Typography>
            </Stack>

            <Stack alignItems='center' spacing={2} direction='row'>
            <Typography variant='body2'>Last Updated at: {lastUpdated}</Typography>
            <IconButton size='small'><DeleteIcon/></IconButton>
            </Stack>
            
        </Toolbar>
        </AppBar>
  )
}

export default Topbar
