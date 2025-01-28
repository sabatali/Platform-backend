import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  type: { type: String, enum: ['income', 'expense', 'given', 'taken'], required: true },
  category: { type: String, required: true },
  person: { type: String, enum: ['Ahmed', 'Rizwan', 'Other'] },
  date: { type: Date, default: Date.now }
});


const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;
