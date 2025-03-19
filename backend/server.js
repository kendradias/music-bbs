require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

const searchRoutes = require('./routes/searchRoutes');
app.use('/api/music', searchRoutes);

const threadRoutes = require('./routes/threadRoutes');
app.use('/api/threads', threadRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`[DEBUG] Server is running on port ${PORT}`);
});
