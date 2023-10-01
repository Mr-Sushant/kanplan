import {Container, Stack, TextField, Button, Typography} from '@mui/material'
import LogoImg from '../../assets/logo.svg';
import ImageEl from '../../components/utils/ImageEl';
import { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import useStore from '../../store';


const initForm = {
  email: '',
  password: ''
}

function isValidEmail(email) {
  // Regular expression for a valid email address
  const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;

  // Test the email against the regex
  return emailRegex.test(email);
}


const AuthScreen = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState(initForm);
  const [loading, setLoading] = useState(false);
  const {setToastr} = useStore();
  
  const authText = isLogin ? 'Do not have an account ? Click Here.' : 'Already have an account.';

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name] : e.target.value
    });
  };
  
  const handleAuth = async () => {
    setLoading(true);
    try{
      if(isLogin) {
        await signInWithEmailAndPassword(auth, form.email, form.password);
      } else {
        await createUserWithEmailAndPassword(auth, form.email, form.password);
      }
    } catch(e){
      const  msg = e.code.split('auth/')[1].split('-').join(' ');
      setToastr(msg);
      setLoading(false);
    }
  };

  return (
    <Container maxWidth='xs' sx={{
      mt: 10
    }}>
        <Stack mb={6} spacing={4} alignItems='center' textAlign='center'>
          <ImageEl src={LogoImg} alt="KanPlan" />
          <Typography color='rgba(255,255,255,0.6)'>
            Access your tasks anytime, anywhere.
          </Typography>
        </Stack>
        <Stack spacing={2}>
          <TextField value={form.email}    name='email'     onChange={handleChange} label='Email'/>
          <TextField type='password' value={form.password} name='password'  onChange={handleChange} label='Password'/>
          <Button disabled={loading || !form.email.trim() || !form.password.trim() || !isValidEmail(form.email)} size='large' variant='contained' onClick={handleAuth}>{isLogin ? "Login" : "Register"}</Button>
        </Stack>
        <Typography sx={{cursor:'pointer'}} onClick={() => setIsLogin(prev => !prev)} mt={3} textAlign='center'>{authText}</Typography>
    </Container>
  )
}

export default AuthScreen
