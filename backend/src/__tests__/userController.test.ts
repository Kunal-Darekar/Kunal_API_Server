import { Request, Response } from 'express';
import { getUsers, getUserById, createUser, updateUser, deleteUser } from '../controllers/userController';

// Mock the User model and TypeORM
jest.mock('../models/userModel', () => ({
    User: class MockUser {
        id: string;
        name: string;
        email: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
    }
}));

jest.mock('typeorm', () => {
    const mockRepository = {
        find: jest.fn(),
        findOne: jest.fn(),
        create: jest.fn(),
        save: jest.fn(),
        delete: jest.fn()
    };
    return {
        getRepository: jest.fn().mockReturnValue(mockRepository),
        Entity: () => jest.fn(),
        PrimaryGeneratedColumn: () => jest.fn(),
        Column: () => jest.fn(),
        CreateDateColumn: () => jest.fn(),
        UpdateDateColumn: () => jest.fn()
    };
});

describe('User Controller Unit Tests', () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let mockUserRepository: any;

    beforeEach(() => {
        // Reset mocks before each test
        mockRequest = {};
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        mockUserRepository = require('typeorm').getRepository();
        jest.clearAllMocks();
    });

    describe('getUsers', () => {
        it('should return all users successfully', async () => {
            const mockUsers = [
                { id: '1', name: 'Test User', email: 'test@example.com' }
            ];
            mockUserRepository.find.mockResolvedValue(mockUsers);

            await getUsers(mockRequest as Request, mockResponse as Response);

            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(mockResponse.json).toHaveBeenCalledWith(mockUsers);
        });

        it('should handle errors', async () => {
            mockUserRepository.find.mockRejectedValue(new Error('Database error'));

            await getUsers(mockRequest as Request, mockResponse as Response);

            expect(mockResponse.status).toHaveBeenCalledWith(500);
            expect(mockResponse.json).toHaveBeenCalledWith({
                message: 'Error fetching users',
                error: 'Database error'
            });
        });

        it('should handle database connection errors', async () => {
            mockUserRepository.find.mockRejectedValue(new Error('Connection refused'));

            await getUsers(mockRequest as Request, mockResponse as Response);

            expect(mockResponse.status).toHaveBeenCalledWith(500);
            expect(mockResponse.json).toHaveBeenCalledWith({
                message: 'Error fetching users',
                error: 'Connection refused'
            });
        });
    });

    describe('getUserById', () => {
        it('should return a user when found', async () => {
            const mockUser = { id: '1', name: 'Test User', email: 'test@example.com' };
            mockRequest.params = { id: '1' };
            mockUserRepository.findOne.mockResolvedValue(mockUser);

            await getUserById(mockRequest as Request, mockResponse as Response);

            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(mockResponse.json).toHaveBeenCalledWith(mockUser);
        });

        it('should return 404 when user not found', async () => {
            mockRequest.params = { id: '999' };
            mockUserRepository.findOne.mockResolvedValue(null);

            await getUserById(mockRequest as Request, mockResponse as Response);

            expect(mockResponse.status).toHaveBeenCalledWith(404);
            expect(mockResponse.json).toHaveBeenCalledWith({ message: 'User not found' });
        });

        it('should handle invalid UUID format', async () => {
            mockRequest.params = { id: 'invalid-uuid' };
            mockUserRepository.findOne.mockRejectedValue(new Error('Invalid UUID format'));

            await getUserById(mockRequest as Request, mockResponse as Response);

            expect(mockResponse.status).toHaveBeenCalledWith(500);
            expect(mockResponse.json).toHaveBeenCalledWith({
                message: 'Error fetching user',
                error: 'Invalid UUID format'
            });
        });

        it('should handle missing id parameter', async () => {
            mockRequest.params = {};

            await getUserById(mockRequest as Request, mockResponse as Response);

            expect(mockResponse.status).toHaveBeenCalledWith(500);
        });
    });

    describe('createUser', () => {
        it('should create a user successfully', async () => {
            const userData = { name: 'New User', email: 'new@example.com', password: 'password123' };
            const savedUser = { ...userData, id: '1' };
            mockRequest.body = userData;
            mockUserRepository.create.mockReturnValue(userData);
            mockUserRepository.save.mockResolvedValue(savedUser);

            await createUser(mockRequest as Request, mockResponse as Response);

            expect(mockResponse.status).toHaveBeenCalledWith(201);
            expect(mockResponse.json).toHaveBeenCalledWith(expect.objectContaining({
                id: '1',
                name: 'New User',
                email: 'new@example.com'
            }));
        });

        it('should handle duplicate email error', async () => {
            mockRequest.body = { name: 'New User', email: 'existing@example.com', password: 'password123' };
            mockUserRepository.save.mockRejectedValue(new Error('UNIQUE constraint failed'));

            await createUser(mockRequest as Request, mockResponse as Response);

            expect(mockResponse.status).toHaveBeenCalledWith(400);
            expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Email already exists' });
        });

        it('should handle missing required fields', async () => {
            mockRequest.body = { name: 'Test User' }; // Missing email and password
            mockUserRepository.findOne.mockResolvedValue(null);
            mockUserRepository.save.mockRejectedValue(new Error('Missing required fields'));

            await createUser(mockRequest as Request, mockResponse as Response);

            expect(mockResponse.status).toHaveBeenCalledWith(500);
            expect(mockResponse.json).toHaveBeenCalledWith({
                message: 'Error creating user',
                error: 'Missing required fields'
            });
        });

        it('should handle invalid email format', async () => {
            mockRequest.body = {
                name: 'Test User',
                email: 'invalid-email',
                password: 'password123'
            };
            mockUserRepository.save.mockRejectedValue(new Error('Invalid email format'));

            await createUser(mockRequest as Request, mockResponse as Response);

            expect(mockResponse.status).toHaveBeenCalledWith(500);
        });

        it('should handle database constraint violations', async () => {
            mockRequest.body = {
                name: 'Test User',
                email: 'test@example.com',
                password: 'password123'
            };
            mockUserRepository.save.mockRejectedValue(new Error('CHECK constraint failed'));

            await createUser(mockRequest as Request, mockResponse as Response);

            expect(mockResponse.status).toHaveBeenCalledWith(500);
        });
    });

    describe('updateUser', () => {
        it('should update a user successfully', async () => {
            const updateData = { name: 'Updated Name' };
            const existingUser = { id: '1', name: 'Old Name', email: 'test@example.com' };
            const updatedUser = { ...existingUser, ...updateData };
            
            mockRequest.params = { id: '1' };
            mockRequest.body = updateData;
            mockUserRepository.findOne.mockResolvedValue(existingUser);
            mockUserRepository.save.mockResolvedValue(updatedUser);

            await updateUser(mockRequest as Request, mockResponse as Response);

            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(mockResponse.json).toHaveBeenCalledWith(updatedUser);
        });

        it('should return 404 when updating non-existent user', async () => {
            mockRequest.params = { id: '999' };
            mockRequest.body = { name: 'Updated Name' };
            mockUserRepository.findOne.mockResolvedValue(null);

            await updateUser(mockRequest as Request, mockResponse as Response);

            expect(mockResponse.status).toHaveBeenCalledWith(404);
            expect(mockResponse.json).toHaveBeenCalledWith({ message: 'User not found' });
        });

        it('should handle empty update data', async () => {
            mockRequest.params = { id: '1' };
            mockRequest.body = {};
            mockUserRepository.findOne.mockResolvedValue({ id: '1', name: 'Old Name' });

            await updateUser(mockRequest as Request, mockResponse as Response);

            expect(mockUserRepository.save).toHaveBeenCalled();
        });

        it('should handle invalid update fields', async () => {
            mockRequest.params = { id: '1' };
            mockRequest.body = { invalidField: 'value' };
            mockUserRepository.findOne.mockResolvedValue({ id: '1', name: 'Old Name' });
            mockUserRepository.save.mockRejectedValue(new Error('Invalid field'));

            await updateUser(mockRequest as Request, mockResponse as Response);

            expect(mockResponse.status).toHaveBeenCalledWith(500);
        });
    });

    describe('deleteUser', () => {
        it('should delete a user successfully', async () => {
            mockRequest.params = { id: '1' };
            mockUserRepository.delete.mockResolvedValue({ affected: 1 });

            await deleteUser(mockRequest as Request, mockResponse as Response);

            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(mockResponse.json).toHaveBeenCalledWith({ message: 'User deleted successfully' });
        });

        it('should return 404 when deleting non-existent user', async () => {
            mockRequest.params = { id: '999' };
            mockUserRepository.delete.mockResolvedValue({ affected: 0 });

            await deleteUser(mockRequest as Request, mockResponse as Response);

            expect(mockResponse.status).toHaveBeenCalledWith(404);
            expect(mockResponse.json).toHaveBeenCalledWith({ message: 'User not found' });
        });

        it('should handle database errors during deletion', async () => {
            mockRequest.params = { id: '1' };
            mockUserRepository.delete.mockRejectedValue(new Error('Database error'));

            await deleteUser(mockRequest as Request, mockResponse as Response);

            expect(mockResponse.status).toHaveBeenCalledWith(500);
            expect(mockResponse.json).toHaveBeenCalledWith({
                message: 'Error deleting user',
                error: 'Database error'
            });
        });

        it('should handle foreign key constraint violations', async () => {
            mockRequest.params = { id: '1' };
            mockUserRepository.delete.mockRejectedValue(new Error('FOREIGN KEY constraint failed'));

            await deleteUser(mockRequest as Request, mockResponse as Response);

            expect(mockResponse.status).toHaveBeenCalledWith(500);
        });
    });
}); 