// Bring in express, import export
// Create an app instance
// Add the mandatory middleware
// Pick a port

import express from "express";
import { logger } from "./src/middleware/logger.js";

const app = express();
app.use(express.json());
app.use(logger);
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});