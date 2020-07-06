import path from 'path';
import fs from 'fs';

import 'reflect-metadata';
import 'dotenv/config';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';
import morgan from 'morgan';

import createConnection from './database';
import routes from './routes';
import AppError from './errors/AppErrors';

// get custom morgan tokens
import './utils/getCustomTokens';

createConnection();

const app = express();

// create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(
  path.resolve(__dirname, '..', 'tmp', 'request.log'),
  {
    flags: 'a',
  },
);

app.use(express.json());
app.use(cors());
app.use(
  morgan(
    ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" ":user-id"',
    {
      stream: accessLogStream,
    },
  ),
);
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  // eslint-disable-next-line
  console.error(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
});

export default app;
