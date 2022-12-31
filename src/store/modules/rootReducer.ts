import { combineReducers } from '@reduxjs/toolkit';

import login from './LoginSlice';
import notes from './NotesSlice';

export default combineReducers({
  login,
  notes
});
