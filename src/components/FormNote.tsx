import { Button, Grid, TextField } from '@mui/material';
import React, { useRef, useState } from 'react';
import { useAppSelector } from '../store/hooks';
import { NoteType } from '../types';

interface FormNoteProps {
  action: (note: NoteType) => void;
}

const FormNote: React.FC<FormNoteProps> = ({ action }) => {
  const [detail, setDetail] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const loginRedux = useAppSelector(state => state.login);
  const inputDetail = useRef<HTMLInputElement | undefined>();
  const inputDescription = useRef<HTMLInputElement | undefined>();

  const userLogged = loginRedux.userList.find(user => user.logged);

  const handleClear = () => {
    setDetail('');
    setDescription('');
  };

  const handleSubmit = () => {
    if (detail.length < 1) {
      alert('Fill in at least 1 character.');
      inputDetail.current?.focus();
      return;
    }
    action({ id: Math.floor(Date.now() / 1000), detail, description, user: userLogged!.email });
    handleClear();
  };

  return (
    <Grid container spacing={2} alignItems={'center'}>
      <Grid item xs={12} sm={4}>
        <TextField
          id="outlined-basic"
          onChange={ev => setDetail(ev.target.value)}
          label="Detalhe"
          value={detail || ''}
          variant="outlined"
          inputRef={inputDetail}
          inputProps={{ maxLength: 200 }}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          id="outlined-basic"
          onChange={ev => setDescription(ev.target.value)}
          label="Descrição"
          value={description || ''}
          variant="outlined"
          inputRef={inputDescription}
          inputProps={{ maxLength: 300 }}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <Grid container spacing={2}>
          <Grid item>
            <Button color="secondary" onClick={handleClear} variant="contained">
              Clean
            </Button>
          </Grid>
          <Grid item>
            <Button color="secondary" onClick={handleSubmit} variant="contained">
              Register
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default FormNote;
