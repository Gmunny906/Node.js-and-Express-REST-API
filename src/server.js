// Bring in express, import export
// Create an app instance
// Add the mandatory middleware
// Pick a port

import express from "express";
const app = express();
app.use(express.json());
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});