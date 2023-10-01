import {AppBar, Toolbar, Button, Stack} from '@mui/material';
import ImageEl from '../../components/utils/ImageEl';
import LogoImg from '../../assets/logo.svg';
import LogoutIcon from '@mui/icons-material/ExitToApp';

const Topbar = ({handleClick}) => {
  return (
    <AppBar position='static'>
        <Toolbar sx={{justifyContent:'space-between'}}>
            <ImageEl sx={{
                height: '50px',
            }} src={LogoImg} alt="KanPlan"/>
            <Stack direction="row" spacing={2}>
                <Button onClick={handleClick} variant='contained'>Create Board</Button>
                <Button startIcon={<LogoutIcon/>} color='inherit'>Logout</Button>
            </Stack>
        </Toolbar>
        </AppBar>
  )
}

export default Topbar
