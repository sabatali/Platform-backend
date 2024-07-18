import express from 'express';
import connectDB from "./db/db.js";
import regRoute from "./routes/user-routes.js";

const app = express();

app.use(express.json());

connectDB();

app.use("/api/v1", regRoute);

// Root route for testing
app.get('/', (req, res) => {
    res.send('Welcome to the Coding Platform API!');
});

export default app;
