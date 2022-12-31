import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import LoginType from '../../types/LoginType';

interface Users {
  userList: LoginType[];
}

const initialState: Users = {
  userList: []
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    register(state, action: PayloadAction<LoginType>) {
      const index = state.userList.findIndex(item => item.email === action.payload.email);
      if (index === -1) {
        state.userList.push(action.payload);
        alert('Usuário cadastrado');
        return state;
      } else {
        alert('Usuário já existe');
        return state;
      }
    },
    login(state, action: PayloadAction<string>) {
      const user = state.userList.findIndex(user => user.email === action.payload);
      if (user !== -1) {
        state.userList[user].logged = true;
      }
    },
    logoff(state) {
      const user = state.userList.findIndex(user => user.logged);
      if (user !== -1) {
        state.userList[user].logged = false;
      }
    }
  }
});

export const { register, login, logoff } = loginSlice.actions;
export default loginSlice.reducer;
