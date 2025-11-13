import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import eventsRoutes from "./routes/eventRoutes";
import type { Request, Response, NextFunction } from 'express';


dotenv.config();

const app = express();
// CORS with simple options (adjust origins as needed)
app.use(cors({ origin: process.env.CORS_ORIGIN ?? '*', credentials: true }));
app.use(express.json());
app.use("/events", eventsRoutes);
// Test route
app.get('/', (req, res) => {
  res.send('🚀 Backend running successfully!');
});


app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Internal server error' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
