import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Описуємо структуру даних для користувача
interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
}

// Структура стану (state) Redux slice
interface UserState {
  users: User[];
  filteredUsers: User[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

// Початковий стан
const initialState: UserState = {
  users: [],
  filteredUsers: [],
  status: 'idle',
};

// Асинхронний thunk для отримання користувачів
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/users');
  return response.data as User[];  // Указуємо, що дані мають тип User[]
});

// Створення Redux slice
const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // Додавання типізації для filterUsers
    filterUsers: (state, action: PayloadAction<{ key: keyof User; value: string }>) => {
        const { key, value } = action.payload;
        state.filteredUsers = state.users.filter(user => {
          const userValue = user[key];
          
          if (typeof userValue === 'string') {
            return userValue.toLowerCase().includes(value.toLowerCase());
          }
      
          if (typeof userValue === 'number') {
            return userValue.toString().includes(value);
          }
      
          return false;
        });
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
        state.filteredUsers = action.payload;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

// Експорт дій та редюсера
export const { filterUsers } = userSlice.actions;
export default userSlice.reducer;
