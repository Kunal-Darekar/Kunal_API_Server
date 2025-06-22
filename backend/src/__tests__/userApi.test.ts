import request from 'supertest';
import { getConnection, getRepository, Connection } from 'typeorm';
import { User } from '../models/userModel';
import app, { initializeDatabase } from '../app';

describe('User API Tests', () => {
    let connection: Connection;
    let testUser: User;

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
        // Clear the database and create a test user before each test
        const userRepository = getRepository(User);
        await userRepository.clear();

        // Create a test user
        const userData = {
            name: 'Test User',
            email: 'test@example.com',
            password: 'password123'
        };
        testUser = await userRepository.save(userRepository.create(userData));
    });

    describe('GET /api/users', () => {
        it('should return all users', async () => {
            const response = await request(app)
                .get('/api/users')
                .expect(200);

            expect(response.body).toBeInstanceOf(Array);
            expect(response.body).toHaveLength(1);
            expect(response.body[0].email).toBe(testUser.email);
            expect(response.body[0].password).toBeUndefined();
        });
    });

    describe('GET /api/users/:id', () => {
        it('should return a user by id', async () => {
            const response = await request(app)
                .get(`/api/users/${testUser.id}`)
                .expect(200);

            expect(response.body.email).toBe(testUser.email);
            expect(response.body.password).toBeUndefined();
        });

        it('should return 404 for non-existent user', async () => {
            await request(app)
                .get('/api/users/999')
                .expect(404);
        });
    });

    describe('POST /api/users', () => {
        it('should create a new user', async () => {
            const newUser = {
                name: 'New User',
                email: 'new@example.com',
                password: 'password123'
            };

            const response = await request(app)
                .post('/api/users')
                .send(newUser)
                .expect(201);

            expect(response.body.name).toBe(newUser.name);
            expect(response.body.email).toBe(newUser.email);
            expect(response.body.password).toBeUndefined();
            expect(response.body.id).toBeDefined();
        });

        it('should return 400 for duplicate email', async () => {
            const duplicateUser = {
                name: 'Duplicate User',
                email: testUser.email, // Using existing email
                password: 'password123'
            };

            await request(app)
                .post('/api/users')
                .send(duplicateUser)
                .expect(400);
        });
    });

    describe('PUT /api/users/:id', () => {
        it('should update an existing user', async () => {
            const updateData = {
                name: 'Updated Name'
            };

            const response = await request(app)
                .put(`/api/users/${testUser.id}`)
                .send(updateData)
                .expect(200);

            expect(response.body.name).toBe(updateData.name);
            expect(response.body.email).toBe(testUser.email);
        });

        it('should return 404 for updating non-existent user', async () => {
            await request(app)
                .put('/api/users/999')
                .send({ name: 'Updated Name' })
                .expect(404);
        });
    });

    describe('DELETE /api/users/:id', () => {
        it('should delete an existing user', async () => {
            await request(app)
                .delete(`/api/users/${testUser.id}`)
                .expect(200);

            // Verify user is deleted
            await request(app)
                .get(`/api/users/${testUser.id}`)
                .expect(404);
        });

        it('should return 404 for deleting non-existent user', async () => {
            await request(app)
                .delete('/api/users/999')
                .expect(404);
        });
    });
}); 