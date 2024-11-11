// userService.js
import axios from "axios";

const API_URL = "http://localhost:5000/api/users";

export const getUsers = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addUser  = async (user) => {
  try {
    const response = await axios.post(API_URL, user);
    return response.data; // Return the new user data
  } catch (error) {
    throw error.response.data; // Throw the error response for handling in UserForm
  }
};

export const updateUser  = async (id, user) => {
  try {
    await axios.put(`${API_URL}/${id}`, user);
  } catch (error) {
    throw error.response.data; // Throw the error response for handling in UserForm
  }
};

export const deleteUser  = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};