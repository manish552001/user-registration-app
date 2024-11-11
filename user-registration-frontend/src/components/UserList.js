import React from "react";
import { deleteUser  } from "../services/userService";
import UserTable from "./UserTable";

const UserList = ({ users, refreshUsers, setEditingUser  }) => {
  const handleDelete = async (id) => {
    await deleteUser (id);
    alert("User  deleted successfully!"); // Popup for delete success
    refreshUsers();
  };

  return (
    <div>
      <UserTable users={users} onDelete={handleDelete} onEdit={setEditingUser } />
    </div>
  );
};

export default UserList;