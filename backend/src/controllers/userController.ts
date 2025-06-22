import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User, UserInput } from '../models/userModel';

// Get all users
export const getUsers = async (req: Request, res: Response): Promise<void> => {
        try {
        const userRepository = getRepository(User);
        const users = await userRepository.find({
            select: ['id', 'name', 'email', 'createdAt', 'updatedAt']
        });
        res.status(200).json(users);
        } catch (error) {
        const err = error as Error;
        res.status(500).json({ message: 'Error fetching users', error: err.message });
        }
};

// Get a single user by ID
export const getUserById = async (req: Request, res: Response): Promise<void> => {
        try {
        const userRepository = getRepository(User);
        const user = await userRepository.findOne(req.params.id, {
            select: ['id', 'name', 'email', 'createdAt', 'updatedAt']
        });
        
            if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
            }
            res.status(200).json(user);
        } catch (error) {
        const err = error as Error;
        res.status(500).json({ message: 'Error fetching user', error: err.message });
        }
};

// Create a new user
export const createUser = async (req: Request, res: Response): Promise<void> => {
        try {
        const userRepository = getRepository(User);
        const userData: UserInput = req.body;
        const user = userRepository.create(userData);
        const savedUser = await userRepository.save(user);
        
        const { password: _, ...userResponse } = savedUser;
        res.status(201).json(userResponse);
    } catch (error) {
        const err = error as Error;
        if (err.message.includes('UNIQUE constraint failed')) {
            res.status(400).json({ message: 'Email already exists' });
            return;
        }
        res.status(500).json({ message: 'Error creating user', error: err.message });
    }
};

// Update a user
export const updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const userRepository = getRepository(User);
        const user = await userRepository.findOne(req.params.id);
            if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        const updateData: Partial<UserInput> = req.body;
        Object.assign(user, updateData);
        
        const updatedUser = await userRepository.save(user);
        const { password: _, ...userResponse } = updatedUser;
        
        res.status(200).json(userResponse);
        } catch (error) {
        const err = error as Error;
        if (err.message.includes('UNIQUE constraint failed')) {
            res.status(400).json({ message: 'Email already exists' });
            return;
        }
        res.status(500).json({ message: 'Error updating user', error: err.message });
        }
};

// Delete a user
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
        try {
        const userRepository = getRepository(User);
        const result = await userRepository.delete(req.params.id);
        if (result.affected === 0) {
            res.status(404).json({ message: 'User not found' });
            return;
            }
        res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
        const err = error as Error;
        res.status(500).json({ message: 'Error deleting user', error: err.message });
        }
};