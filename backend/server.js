import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import './config/db.js';


import roomRoutes from './routes/roomRoutes.js';


dotenv.config();


const app = express();


app.use(cors());
app.use(express.json()); 


app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});




app.use('/api/rooms', roomRoutes);


app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});


app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});


const PORT = process.env.PORT || 5001;
const HOST = process.env.HOST || '0.0.0.0';


app.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});