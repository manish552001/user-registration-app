import React from 'react';

const UserTable = ({ users, onDelete, onEdit }) => {

  const handleEditUser   = (user) => {
    if (!user._id) {
      console.error("User   ID is missing", user);
      return;
    }
    onEdit(user); // Call the onEdit function to set the editing user
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0'); // Get the day and pad with zero if needed
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Get the month (0-indexed) and pad with zero
    const year = date.getFullYear(); // Get the full year
    return `${day}-${month}-${year}`; // Return in DD-MM-YYYY format
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Date of Birth</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user._id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{formatDate(user.dob)}</td> 
            <td>
              <button className="button-edit" onClick={() => handleEditUser (user)}>Edit</button>
              <button className="button-delete" onClick={() => onDelete(user._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;