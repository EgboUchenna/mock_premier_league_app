// tslint:disable: import-name
import express from 'express';
import mongoose from 'mongoose';
import redis from 'redis';
import session from 'express-session';
import connectRedis from 'connect-redis';
import apiRouter from './routes/api';
import dotenv from 'dotenv';
import seedDb from './db/index';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';

dotenv.config();

const redisStore = connectRedis(session);
const client = redis.createClient();

const app = express();

// Body Parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB CONFIG
const connectionUri = process.env.NODE_ENV === 'test' ? process.env.TEST : process.env.PROD;

// Connect to MongoDB
mongoose
  .connect(connectionUri!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    process.env.NODE_ENV !== 'test' && (await seedDb());
    console.log('MongoDB connected');
  })
  .catch(err => console.log(err));
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

try {
  app.use(
    session({
      secret: process.env.KEY!,
      // create new redis store.
      store: new redisStore({
        client,
        host: 'localhost',
        port: 6379,
        ttl: 1800,
      }),
      saveUninitialized: false,
      resave: false,
    }),
  );
} catch (error) {
  console.log({ error });
}

app.use(cors());
app.use(helmet());

// Use Routes
app.use('/api/v1', apiRouter);

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Server running on port ${port}`));

export default app;
