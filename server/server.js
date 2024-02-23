const express = require('express');
const dotenv = require('dotenv');
const notes = require('./data/notes');
const app = express();
const connectDB = require('./config/dbconn');
const userRoutes = require('./routes/userRoutes');
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');

dotenv.config();
connectDB();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Api is running');
});

app.get('/api/notes', (req, res) => {
  res.json(notes);
});

app.use('/api/users', userRoutes);

app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 5001;
app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
