import { Client } from "pg";
import 'dotenv/config';

// Create Database Client for connection
export let con;

try {
  con = new Client({
    host: process.env.DB_SERVER,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });
} catch (err) {
  console.error("Error creating the database client:", err);
}

// Connect to database using client
export async function connectToDatabase() {
  try {
    await con.connect();
    console.log("Connected to database successfully");
  } catch (err) {
    console.error("Error connecting to the database:", err);
  }
}