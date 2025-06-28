import { createConnection, Connection } from 'typeorm';
import { User } from '../models/userModel';

export const initializeDatabase = async (): Promise<Connection> => {
    return createConnection({
        type: "sqlite",
        database: process.env.NODE_ENV === 'test' ? ':memory:' : "database.sqlite",
        entities: [User],
        synchronize: true,
        logging: process.env.NODE_ENV !== 'test'
    });
};

export const getDatabase = () => {
    return null; // Not needed for SQLite/TypeORM setup
};