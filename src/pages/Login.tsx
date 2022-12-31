import React, { useEffect, useState } from 'react';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { useNavigate } from 'react-router-dom';
import AppRegistrationRoundedIcon from '@mui/icons-material/AppRegistrationRounded';
import SendIcon from '@mui/icons-material/Send';
import { login } from '../store/modules/LoginSlice';

const Login: React.FC = () => {
  const [email, setMail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const loginRedux = useAppSelector(state => state.login);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const userLogged = loginRedux.userList.findIndex(user => user.logged);
    if (userLogged !== -1) {
      navigate('/');
    }
  }, [loginRedux, navigate]);

  const handleLogin = () => {
    if (email.length < 6 || password.length < 6) {
      alert('Fill in the fields correctly!');
    } else {
      const userExist = loginRedux.userList.findIndex(user => user.email === email);
      if (userExist === -1) return alert('User not found! x(');
      const isPasswordOk = loginRedux.userList[userExist].password === password;
      if (!isPasswordOk) return alert('Incorrect password!Try again! =D');
      dispatch(login(email));
      navigate('/');
    }
  };
  const handleToRegister = () => {
    navigate('/register');
  };

  return (      <Grid container sx={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#c18edd'
  }}><Grid container spacing={2} sx={{ height: '100vh', padding: '0 20px' }} justifyContent="start" alignItems="center">
      <Grid item xs={12} sm={6}>
        <Grid container spacing={2}>
          <Grid item xs={12} display="flex" justifyContent="start">
          <AppRegistrationRoundedIcon fontSize="large" /> <Typography variant="h4">Register Notes</Typography>
          </Grid>
          <Grid item xs={12} alignItems="center">
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-email"
              onChange={ev => setMail(ev.target.value)}
              label="Login"
              type="email"
              value={email || ''}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-Password"
              onChange={ev => setPassword(ev.target.value)}
              label="Password"
              type="password"
              value={password || ''}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Grid container spacing={2}>
              <Grid xs={12} item display="flex" justifyContent="space-evenly">
                <Button onClick={handleLogin} variant="outlined" color="secondary" endIcon={<SendIcon/>}>
                  Login
                </Button>
                <Button variant="text" color="secondary" onClick={handleToRegister}>
                Don t have an account?
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
    </Grid>
  );
};

export default Login;
