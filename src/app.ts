// tslint:disable: import-name
import express from 'express';
import mongoose from 'mongoose';
import apiRouter from './routes/api';
import dotenv from 'dotenv';
import seedDb from './db/index';

import bodyParser from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';

dotenv.config();

const app = express();

// Body Parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB CONFIG
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(db, {
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

app.use(cors());
app.use(helmet());

// Use Routes
app.use('/api/v1', apiRouter);

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Server running on port ${port}`));
