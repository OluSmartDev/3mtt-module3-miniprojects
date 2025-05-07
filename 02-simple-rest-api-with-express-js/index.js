import express from "express";
import itemsRouter from "./routes/itemsRouter.js";
const app = express();
const PORT = 5000;

app.use(express.json());

app.use('/items', itemsRouter)

app.get('/', (req, res) => res.send("Hello, World!"));

app.listen(PORT, () => console.log(`SERVER is running at http://localhost:${PORT}`));