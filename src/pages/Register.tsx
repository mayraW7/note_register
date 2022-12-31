import React, { useEffect, useState } from 'react';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { useNavigate } from 'react-router-dom';
import AppRegistrationRoundedIcon from '@mui/icons-material/AppRegistrationRounded';
import { register } from '../store/modules/LoginSlice';
import SendIcon from '@mui/icons-material/Send';

const Register: React.FC = () => {
  const [email, setMail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setconfirmPassword] = useState<string>('');
  const loginRedux = useAppSelector(state => state.login);
  const userLogged = loginRedux.userList.findIndex(user => user.logged);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (userLogged !== -1) {
      navigate('/');
    }
  }, [loginRedux, navigate]);

  const handleRegister = () => {
    if (email.length >= 6 && password.length >= 6 && password === confirmPassword) {
      dispatch(
        register({
          email,
          password,
          confirmPassword,
          logged: false
        })
      );
      navigate('/login');
    } else {
      alert('Email and password must be at least 6 characters long!');
    }
  };
  const handleToLogin = () => {
    navigate('/login');
  };

  return (
    <Grid container spacing={2} sx={{ height: '100vh', padding: '0 20px' }} justifyContent="start" alignItems="center">
      <Grid item xs={12} sm={6}>
        <Grid container spacing={2}>
        <Grid item xs={12} display="flex" justifyContent="start">
          <AppRegistrationRoundedIcon fontSize="large" /> <Typography variant="h4">Register Notes</Typography>
          </Grid>
          <Grid item xs={12} alignItems="center">
            <Typography variant="h6" >  
            Register your email and password!
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="email-basic"
              onChange={ev => setMail(ev.target.value)}
              label="Email"
              value={email || ''}
              type="email"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="password-basic"
              onChange={ev => setPassword(ev.target.value)}
              label="password"
              value={password || ''}
              type="password"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="confirmPassword-basic"
              onChange={ev => setconfirmPassword(ev.target.value)}
              label="Confirm your password"
              value={confirmPassword || ''}
              type="password"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Grid container spacing={2}>
              <Grid xs={12} item display="flex" justifyContent="space-evenly">
                <Button onClick={handleRegister} variant="outlined" color="success" endIcon={<SendIcon/>}>
                Register
                </Button>
                <Button variant="outlined" color="success" onClick={handleToLogin}>          
                Have an account? Click here.
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Register;
