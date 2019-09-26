import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/api/index';
import bodyParser from 'body-parser';

const app = express();

// Body Parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB CONFIG
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

// Use Routes
app.use('/', userRouter);

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Server running on port ${port}`));
