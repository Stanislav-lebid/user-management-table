import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store';
import { filterUsers } from '../features/users/userSlice';
import { User } from '../types/userTypes'; // Імпортуйте тип User, якщо він у вас у файлі userTypes.ts

const UserTable: React.FC = () => {
  const users = useSelector((state: RootState) => state.users.filteredUsers);
  const dispatch = useDispatch();

  // Оголошуємо handleFilter з правильним типом для key
  const handleFilter = (key: keyof User, value: string) => {
    dispatch(filterUsers({ key, value }));
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search by name"
        onChange={(e) => handleFilter('name', e.target.value)}
      />
      <input
        type="text"
        placeholder="Search by username"
        onChange={(e) => handleFilter('username', e.target.value)}
      />
      <input
        type="text"
        placeholder="Search by email"
        onChange={(e) => handleFilter('email', e.target.value)}
      />
      <input
        type="text"
        placeholder="Search by phone"
        onChange={(e) => handleFilter('phone', e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
