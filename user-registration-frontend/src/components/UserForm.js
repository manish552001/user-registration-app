// UserForm.js
import React, { useState, useEffect } from 'react';
import { addUser , updateUser  } from '../services/userService';

const UserForm = ({ refreshUsers, editingUser , setEditingUser  }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');

  useEffect(() => {
    if (editingUser ) {
      setName(editingUser.name);
      setEmail(editingUser.email);
      const formattedDob = editingUser.dob.split("T")[0]; // Convert ISO date to 'yyyy-MM-dd'
      setDob(formattedDob);
    } else {
      setName('');
      setEmail('');
      setDob('');
    }
  }, [editingUser ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { name, email, dob };

    try {
      if (editingUser ) {
        if (!editingUser._id) {
          console.error("User  ID is undefined");
          return;
        }
        // Try to update the user
        await updateUser (editingUser._id, user);
        alert("User  updated successfully!"); // Show success alert
      } else {
        // Try to add the user
        await addUser (user);
        alert("User  added successfully!"); // Show success alert
      }
      refreshUsers();
      setEditingUser (null); // Clear editing state
      // Clear all fields after successful addition or update
      setName('');
      setEmail('');
      setDob('');
    } catch (error) {
      // Check if the error is due to duplicate email
      if (error.message.includes("duplicate key error")) {
        alert("This email is already in use. Please use a different email.");
      } else {
        console.error("Error updating user:", error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="date"
        value={dob}
        onChange={(e) => setDob(e.target.value)}
        required
      />
      <button type="submit" className="button-add">{editingUser  ? 'Update User' : 'Add User'}</button>
      {editingUser  && <button type="button" className="button-cancel" onClick={() => setEditingUser (null)}>Cancel</button>}
    </form>
  );
};

export default UserForm;