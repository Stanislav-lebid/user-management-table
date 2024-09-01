import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/users/userSlice';

// Налаштування store
export const store = configureStore({
  reducer: {
    users: userReducer,
  },
});

// Виведення типу RootState на основі store
export type RootState = ReturnType<typeof store.getState>;

// Виведення типу AppDispatch на основі store
export type AppDispatch = typeof store.dispatch;
