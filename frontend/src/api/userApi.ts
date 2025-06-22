import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

export interface User {
    id: string;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
}

export interface UserInput {
    name: string;
    email: string;
    password: string;
}

// Get all users
export const getUsers = async (): Promise<User[]> => {
    const response = await axios.get(`${API_BASE_URL}/users`);
        return response.data;
};

// Get a single user by ID
export const getUserById = async (id: string): Promise<User> => {
    const response = await axios.get(`${API_BASE_URL}/users/${id}`);
        return response.data;
};

// Create a new user
export const createUser = async (userData: UserInput): Promise<User> => {
    const response = await axios.post(`${API_BASE_URL}/users`, userData);
        return response.data;
};

// Update a user
export const updateUser = async (id: string, userData: Partial<UserInput>): Promise<User> => {
    const response = await axios.put(`${API_BASE_URL}/users/${id}`, userData);
        return response.data;
};

// Delete a user
export const deleteUser = async (id: string): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/users/${id}`);
};