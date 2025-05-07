import express from "express";
const app = express();
const PORT = 5000;

app.listen(PORT, () => console.log(`SERVER is running at http://localhost:${PORT}`));