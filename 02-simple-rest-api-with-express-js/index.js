import express from "express";
import itemsRouter from "./routes/itemsRouter.js";
const app = express();
const PORT = 5000;

app.use(express.json());

app.use('/items', itemsRouter)

app.get('/', (req, res) => res.send("Hello, World!"));

// Error handling for invalid routes (404 Not Found)
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Generic error handler for server errors (500 Internal Server Error)
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => console.log(`SERVER is running at http://localhost:${PORT}`));