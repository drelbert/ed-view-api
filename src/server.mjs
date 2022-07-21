import express, { json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import studentRouter from './resources/student/student.router.mjs';
import userRouter from './resources/user/user.router.mjs';
import main from '../db/conn.mjs';
import { signup, signin, protect } from './utils/auth.mjs';

dotenv.config();

const app = express();
const port = 8000;

// middleware, mutate and pass along, not respond
app.use(json());
app.use(cors());

// custom middleware
const log = (req, res, next) => {
  console.log('logged');
  next();
};
app.use(log);

app.post('/signup', signup);
app.post('/signin', signin);

// course creation middleware

// protect middleware for anything using /api
// app.use('/api', protect);

// mounting the router
app.use('/api/student', studentRouter);
app.use('/api/user', userRouter);

main().catch(console.error);

export const start = () => {
  app.listen(port, () => {
    console.log(`App working on port ${port}`);
  });
};
