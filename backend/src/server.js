import express from 'express';
import todoRoutes from './routes/todoRoutes.js';
import cors from 'cors';

const app = express();

const allowed = ['http://localhost:5173',
  'https://to-do-app-zeta-mauve.vercel.app'
]; // (FRONTEND_ORIGIN = prod site)
app.use(cors({ origin: allowed, credentials: true }));

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/todos', todoRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

