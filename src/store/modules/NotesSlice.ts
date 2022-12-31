import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import { NoteType } from '../../types/index';

const adapter = createEntityAdapter<NoteType>({
  selectId: item => item.id
});

export const { selectAll: selectNotes, selectById: selectNoteById } = adapter.getSelectors(
  (state: RootState) => state.notes
);

const notesSlice = createSlice({
  name: 'notes',
  initialState: adapter.getInitialState({}),
  reducers: {
    addNote: adapter.addOne,
    addMany: adapter.addMany,
    updateNote: adapter.updateOne,
    deleteNote: adapter.removeOne,
    deleteNotes: adapter.removeAll
  }
});

export const { addNote, addMany, deleteNote, updateNote, deleteNotes } = notesSlice.actions;
export default notesSlice.reducer;
