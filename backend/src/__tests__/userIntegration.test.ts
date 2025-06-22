import { getConnection, getRepository, Connection } from 'typeorm';
import { User } from '../models/userModel';
import { initializeDatabase } from '../app';

describe('User Integration Tests', () => {
    let connection: Connection;

    beforeAll(async () => {
        // Set test environment
        process.env.NODE_ENV = 'test';
        // Initialize database connection
        connection = await initializeDatabase();
    });

    afterAll(async () => {
        // Close the connection after tests
        const conn = getConnection();
        if (conn.isConnected) {
            await conn.close();
        }
    });

    beforeEach(async () => {
        // Clear the database before each test
        const userRepository = getRepository(User);
        await userRepository.clear();
    });

    describe('User Repository Operations', () => {
        it('should create a new user', async () => {
            const userRepository = getRepository(User);
            const userData = {
                name: 'Test User',
                email: 'test@example.com',
                password: 'password123'
            };

            const user = userRepository.create(userData);
            const savedUser = await userRepository.save(user);

            expect(savedUser.id).toBeDefined();
            expect(savedUser.name).toBe(userData.name);
            expect(savedUser.email).toBe(userData.email);
            expect(savedUser.password).toBeDefined();
            expect(savedUser.createdAt).toBeDefined();
            expect(savedUser.updatedAt).toBeDefined();
        });

        it('should not allow duplicate emails', async () => {
            const userRepository = getRepository(User);
            const userData = {
                name: 'Test User',
                email: 'test@example.com',
                password: 'password123'
            };

            await userRepository.save(userRepository.create(userData));

            await expect(
                userRepository.save(userRepository.create(userData))
            ).rejects.toThrow();
        });

        it('should find user by id', async () => {
            const userRepository = getRepository(User);
            const userData = {
                name: 'Test User',
                email: 'test@example.com',
                password: 'password123'
            };

            const savedUser = await userRepository.save(userRepository.create(userData));
            const foundUser = await userRepository.findOne(savedUser.id);

            expect(foundUser).toBeDefined();
            expect(foundUser?.id).toBe(savedUser.id);
            expect(foundUser?.email).toBe(userData.email);
        });

        it('should update user', async () => {
            const userRepository = getRepository(User);
            const userData = {
                name: 'Test User',
                email: 'test@example.com',
                password: 'password123'
            };

            const savedUser = await userRepository.save(userRepository.create(userData));
            const updateData = {
                name: 'Updated Name'
            };

            await userRepository.update(savedUser.id, updateData);
            const updatedUser = await userRepository.findOne(savedUser.id);

            expect(updatedUser).toBeDefined();
            expect(updatedUser?.name).toBe(updateData.name);
            expect(updatedUser?.email).toBe(userData.email);
        });

        it('should delete user', async () => {
            const userRepository = getRepository(User);
            const userData = {
                name: 'Test User',
                email: 'test@example.com',
                password: 'password123'
            };

            const savedUser = await userRepository.save(userRepository.create(userData));
            await userRepository.delete(savedUser.id);

            const deletedUser = await userRepository.findOne(savedUser.id);
            expect(deletedUser).toBeUndefined();
        });

        it('should find all users', async () => {
            const userRepository = getRepository(User);
            const usersData = [
                {
                    name: 'User 1',
                    email: 'user1@example.com',
                    password: 'password123'
                },
                {
                    name: 'User 2',
                    email: 'user2@example.com',
                    password: 'password123'
                }
            ];

            const savedUsers = await Promise.all(
                usersData.map(userData => 
                    userRepository.save(userRepository.create(userData))
                )
            );

            const users = await userRepository.find();
            expect(users).toHaveLength(2);
            expect(users.map(u => u.email).sort()).toEqual(usersData.map(u => u.email).sort());
        });
    });
}); 