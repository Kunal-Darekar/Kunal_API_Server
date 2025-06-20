import { MongoClient } from 'mongodb';

const uri = 'your_mongodb_connection_string'; // Replace with your MongoDB connection string
const client = new MongoClient(uri);

export const connectToDatabase = async () => {
    try {
        await client.connect();
        console.log('Connected to the database');
    } catch (error) {
        console.error('Database connection error:', error);
        throw error;
    }
};

export const getDatabase = () => {
    return client.db('your_database_name'); // Replace with your database name
};