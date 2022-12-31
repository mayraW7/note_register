import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  ListItem,
  ListItemText,
  TextField
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import React, { useCallback, useState } from 'react';
import { NoteType } from '../types';
import { deleteNote, selectNotes, updateNote } from '../store/modules/NotesSlice';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
interface ItemNoteProps {
  note: NoteType;
}

const ItemNote: React.FC<ItemNoteProps> = ({ note }) => {
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const notesRedux = useAppSelector(selectNotes);
  const loginRedux = useAppSelector(state => state.login);
  const [editDetail, setDetail] = useState<string>('');
  const [editDescription, setDescription] = useState<string>('');
  const dispatch = useAppDispatch();

  const handleDeleteNote = useCallback((note: NoteType) => {
    const deleted = confirm('Do you want to delete this note?');
    if (deleted) {
      dispatch(deleteNote(note.id));
      alert('Note deleted!');
    }
  }, []);

  const openEditModal = useCallback((note: NoteType) => {
    setOpenEdit(true);
    setDetail(note.detail);
    setDescription(note.description);
  }, []);

  const handleEditNote = () => {
    dispatch(
      updateNote({
        id: note.id,
        changes: {
          detail: editDetail,
          description: editDescription
        }
      })
    );
    alert('Note edited!');
    setOpenEdit(false);
  };

  const handleClose = () => {
    setOpenEdit(false);
  };
  return (
    <>
      <ListItem
        alignItems="flex-start"
        secondaryAction={
          <>
            <IconButton onClick={() => openEditModal(note)} edge="end" aria-label="edit" sx={{ paddingRight: '20px' }}>
              <EditIcon color="secondary"/>
            </IconButton>
            <IconButton onClick={() => handleDeleteNote(note)} edge="end" aria-label="delete">
              <DeleteIcon color='error' />
            </IconButton>
          </>
        }
      >
        <ListItemText primary={note.detail} secondary={note.description} />
      </ListItem>
      <Divider variant="inset" />
      <Dialog open={openEdit} onClose={handleClose}>
    
      <DialogTitle>  <LibraryBooksIcon/>Edit your message:</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="detail"
            label="detail"
            type="text"
            value={editDetail || ''}
            onChange={ev => setDetail(ev.target.value)}
            inputProps={{ maxLength: 200 }}
            fullWidth
            variant="outlined"
          />
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="description"
            type="text"
            value={editDescription || ''}
            onChange={ev => setDescription(ev.target.value)}
            inputProps={{ maxLength: 300 }}
            fullWidth
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button color="secondary" variant="outlined" onClick={handleClose}>  
            Cancel
          </Button>
          <Button color="secondary" variant="contained" onClick={() => handleEditNote()}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ItemNote;
