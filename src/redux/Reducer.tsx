import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {userList} from "../Data"; 
interface User {
  id: number;
  name: string;
  email: string;
  age:number | string;
  address:string;
}
export interface UserState {
  users: User[];
}
const initialState: UserState = {
  users: userList,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
      console.log(action);
    },
    removeUser: (state, action: PayloadAction<number>) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },

    updateUser: (state, action: PayloadAction<User>) => {
      const index = state.users.findIndex(
        (user) => user.id === action.payload.id
      );
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },
  },
});

export const {addUser, removeUser, updateUser} = userSlice.actions;
export default userSlice.reducer;
