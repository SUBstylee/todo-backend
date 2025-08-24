import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
// come back to this when setting up REST api
// import taskRoutes from './routes/tasks.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// come back to this when setting up REST api
// app.use('/tasks', taskRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
