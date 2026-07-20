// Bring in express, import export
// Create an app instance
// Add the mandatory middleware
// Pick a port

//Kept getting an error with the server while trying to use npm run devStart
//I had to connect to a google DNS as below in order to connect to Atlas
import dns from "dns";
dns.setServers(["8.8.8.8", "8.8.8.4"]);

import dotenv from "dotenv";
dotenv.config();
console.log("Loaded URI:" , process.env.MONGODB_URI);

import express from "express";
import { logger } from "./src/middleware/logger.js";
import router from "./src/routes/items.js";
import { connectDB } from "./src/config/db.js";

connectDB();


const app = express();
app.use(express.json());
app.use(logger);
app.use('/api/items', router);

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});


const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});