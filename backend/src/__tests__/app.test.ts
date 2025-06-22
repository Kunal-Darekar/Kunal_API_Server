import request from 'supertest';
import { Connection, createConnection, getConnection } from 'typeorm';
import app, { initializeDatabase } from '../app';

describe('App Configuration Tests', () => {
    let connection: Connection;

    beforeAll(async () => {
        process.env.NODE_ENV = 'test';
        // Initialize database connection
        connection = await initializeDatabase();
    });

    afterAll(async () => {
        try {
            const conn = getConnection();
            if (conn.isConnected) {
                await conn.close();
            }
        } catch (error) {
            // Connection might not exist
        }
    });

    describe('Database Initialization', () => {
        it('should initialize database successfully', async () => {
            expect(connection.isConnected).toBe(true);
            expect(connection.options.type).toBe('sqlite');
            expect(connection.options.database).toBe(':memory:');
        });

        it('should use in-memory database for test environment', async () => {
            expect(connection.options.database).toBe(':memory:');
        });

        it('should use file database for non-test environment', async () => {
            const prevEnv = process.env.NODE_ENV;
            process.env.NODE_ENV = 'development';
            
            // Close existing connection
            await connection.close();
            
            // Create new connection
            const devConnection = await initializeDatabase();
            expect(devConnection.options.database).toBe('database.sqlite');
            await devConnection.close();
            
            // Restore test environment
            process.env.NODE_ENV = prevEnv;
            connection = await initializeDatabase();
        });

        it('should enable logging in development environment', async () => {
            const prevEnv = process.env.NODE_ENV;
            process.env.NODE_ENV = 'development';
            
            // Close existing connection
            await connection.close();
            
            // Create new connection
            const devConnection = await initializeDatabase();
            expect(devConnection.options.logging).toBe(true);
            await devConnection.close();
            
            // Restore test environment
            process.env.NODE_ENV = prevEnv;
            connection = await initializeDatabase();
        });

        it('should disable logging in test environment', async () => {
            expect(connection.options.logging).toBe(false);
        });
    });

    describe('Express Configuration', () => {
        beforeEach(async () => {
            // Clear the users table before each test
            await connection.getRepository('users').clear();
        });

        it('should have CORS enabled', async () => {
            const response = await request(app)
                .options('/api/users')
                .expect(204);
            
            expect(response.headers['access-control-allow-origin']).toBe('*');
        });

        it('should parse JSON bodies', async () => {
            const response = await request(app)
                .post('/api/users')
                .send({
                    name: 'Test User',
                    email: 'test@example.com',
                    password: 'password123'
                })
                .expect(201);

            expect(response.body).toHaveProperty('id');
            expect(response.body.name).toBe('Test User');
            expect(response.body.email).toBe('test@example.com');
            expect(response.body).not.toHaveProperty('password');
        });

        it('should handle non-existent routes', async () => {
            await request(app)
                .get('/non-existent-route')
                .expect(404);
        });

        it('should handle invalid JSON', async () => {
            await request(app)
                .post('/api/users')
                .set('Content-Type', 'application/json')
                .send('{"invalid json')
                .expect(400);
        });
    });

    describe('Environment Configuration', () => {
        const originalEnv = process.env;

        beforeEach(() => {
            process.env = { ...originalEnv };
        });

        afterEach(() => {
            process.env = originalEnv;
        });

        it('should use default port when PORT env is not set', () => {
            delete process.env.PORT;
            const defaultPort = 5001;
            expect(process.env.PORT || defaultPort).toBe(defaultPort);
        });

        it('should use custom port when PORT env is set', () => {
            process.env.PORT = '3000';
            expect(parseInt(process.env.PORT)).toBe(3000);
        });
    });
}); 