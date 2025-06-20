import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { createConnection } from 'typeorm';
import { User } from './models/userModel';
import userRoutes from './routes/userRoutes';

const app = express();
const port = 5001;

app.use(cors());
app.use(express.json());

createConnection({
    type: "sqlite",
    database: "database.sqlite",
    entities: [User],
    synchronize: true,
    logging: true
})
.then(() => {
    console.log("Connected to SQLite database!");
    
    app.use('/api/users', userRoutes);
    
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
})
.catch((err: Error) => {
    console.error("Error during database connection:", err);
});