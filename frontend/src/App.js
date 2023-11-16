import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import UserList from './components/UserList/UserList';
import UserForm from './components/UserForm/UserForm';
import { fetchUsers } from './utils/api';

const App = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedUsers = await fetchUsers();
        setUsers(fetchedUsers);
        setFilteredUsers(fetchedUsers);
      } catch (error) {
        console.log("An error has occured");
      }
    };

    fetchData();
  }, []);

  const handleSearch = (searchTerm) => {
    const trimmedSearchTerm = searchTerm.trim().toLowerCase();

    if (trimmedSearchTerm === '') {
      setFilteredUsers(users);
    } else {
      const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(trimmedSearchTerm)
      );
      setFilteredUsers(filteredUsers);
    }
  };

  const addUser = (user) => {
    setUsers([...users, { id: users.length + 1, ...user }]);
    setFilteredUsers([...filteredUsers, { id: users.length + 1, ...user }]);
  };

  return (
    <div className="app">
      <SearchBar users={users} onSearch={handleSearch} />
      <div className="user-section">
        <UserList users={filteredUsers} />
        <UserForm addUser={addUser} />
      </div>
    </div>
  );
};

export default App;