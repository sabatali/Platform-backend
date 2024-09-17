import express from 'express';
import connectDB from "./db/db.js";
import regRoute from "./routes/user-routes.js";
import cors from 'cors';
import questionRoute from './routes/questionRoutes.js';
// import routerTransaction from './routes/transactionRoutes.js'

const app = express();

app.use(cors());

app.use(express.json());

connectDB();

app.use("/api/v1", regRoute);
app.use("/api/v1", questionRoute);

// Root route for testing
app.get('/', (req, res) => {
    res.send('Welcome to the Coding Platform API!');
});

export default app;
