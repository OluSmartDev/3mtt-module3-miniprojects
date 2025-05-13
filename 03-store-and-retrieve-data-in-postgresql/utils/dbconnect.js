import { Client } from "pg";
import 'dotenv/config';

// Create Database Client for connection
export let con;

const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 5000; // 5 seconds

async function attemptConnection(retryCount = 0) {

  try {
    con = new Client({
      host: process.env.DB_SERVER,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    });

    await con.connect();
    console.log("Connected to database successfully");

  } catch (err) {

    console.error(`Attempt ${retryCount + 1} failed to connect to the database:`, err.message);

    if (retryCount < MAX_RETRIES) {
      console.log(`Retrying in ${RETRY_DELAY_MS / 1000} seconds...`);
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS));
      await attemptConnection(retryCount + 1);
    } else {
      console.error("Failed to connect to the database after multiple retries.");
      process.exit(1); // Exit the process as the database connection is critical
    }  
  }

}

// Connect to database using the retry mechanism
export async function connectToDatabase() {
    await attemptConnection();
}