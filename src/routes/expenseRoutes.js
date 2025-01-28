import express from 'express';
import { createTransaction, deleteTransaction, getBalance, getLastMonthExpenses, getTransactions } from '../controllers/transactionController.js';

const transactionRoute = express.Router();

transactionRoute.post("/transactions/addtransactions", createTransaction);
transactionRoute.get("/transactions/gettransactions", getTransactions);
transactionRoute.get("/transactions/balance", getBalance);
transactionRoute.delete('/transactions/deltransactions/:id', deleteTransaction);
transactionRoute.get('/transactions/last-month-expenses', getLastMonthExpenses);


export default transactionRoute;
