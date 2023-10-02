import {AppBar, Toolbar, Button, Stack, useMediaQuery, IconButton} from '@mui/material';
import ImageEl from '../../components/utils/ImageEl';
import LogoImg from '../../assets/logo.svg';
import LogoutIcon from '@mui/icons-material/ExitToApp';
import CreateBoardIcon from '@mui/icons-material/AddCircle';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';



const Topbar = ({handleClick}) => {
    const isXs = useMediaQuery(theme => theme.breakpoints.only('xs'));

  return (
    <AppBar position='static'>
        <Toolbar sx={{justifyContent:'space-between'}}>
            <ImageEl sx={{
                height: '50px',
            }} src={LogoImg} alt="KanPlan"/>
            <Stack direction="row" spacing={2}>
                { !isXs ?
                    <>
                        <Button onClick={handleClick} variant='contained'>Create Board</Button>
                        <Button onClick={() => signOut(auth)} startIcon={<LogoutIcon/>} color='inherit'>Logout</Button>
                    </>
                    :
                    <>
                    <IconButton onClick={handleClick} variant='contained' color='primary'><CreateBoardIcon/></IconButton>
                        <IconButton onClick={() => signOut(auth)} color='inherit'><LogoutIcon/></IconButton>
                    </>
                }
            </Stack>
        </Toolbar>
        </AppBar>
  )
}

export default Topbar
