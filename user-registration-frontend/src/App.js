import React, { useState, useEffect } from "react";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";
import { getUsers } from "./services/userService";
import "./App.css";

const App = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const users = await getUsers();
    setUsers(users);
  };

  return (
    <div className="App">
      <h1>User Registration</h1>
      <UserForm refreshUsers={fetchUsers} editingUser={editingUser} setEditingUser={setEditingUser} />
      <UserList users={users} refreshUsers={fetchUsers} setEditingUser={setEditingUser} />
    </div>
  );
};

export default App;
