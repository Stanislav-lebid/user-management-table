import React, { useEffect } from 'react';
import './App.css';

import { useDispatch } from 'react-redux';
import { fetchUsers } from '../features/users/userSlice';
import UserTable from '../components/UserTable';
import { AppDispatch } from '../app/store';

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>(); // Типізація dispatch

  useEffect(() => {
    dispatch(fetchUsers()); // Виклик асинхронного thunk'а
  }, [dispatch]);

  return (
    <div>
      <h1>User Management</h1>
      <UserTable />
    </div>
  );
};

export default App;
