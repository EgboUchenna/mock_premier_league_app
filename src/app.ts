import express from 'express';

const app = express();

const port = process.env.PORT || 4000;

app.get('/', (req, res) => {
  res.send('You can now use typescript for this project');
});

app.listen(port, () => console.log(`Server running on port ${port}`));
