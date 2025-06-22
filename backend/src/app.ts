import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { createConnection, Connection } from 'typeorm';
import { User } from './models/userModel';
import userRoutes from './routes/userRoutes';

const app = express();
const port = process.env.PORT ? parseInt(process.env.PORT) : 5001;

app.use(cors());
app.use(express.json());
app.use('/api/users', userRoutes);

export const initializeDatabase = async (): Promise<Connection> => {
    return createConnection({
        type: "sqlite",
        database: process.env.NODE_ENV === 'test' ? ':memory:' : "database.sqlite",
        entities: [User],
        synchronize: true,
        logging: process.env.NODE_ENV !== 'test'
    });
};

if (process.env.NODE_ENV !== 'test') {
    initializeDatabase()
        .then(() => {
            console.log("Connected to SQLite database!");
            app.listen(port, () => {
                console.log(`Server is running on http://localhost:${port}`);
            });
        })
        .catch((err: Error) => {
            console.error("Error during database connection:", err);
        });
}

export default app;