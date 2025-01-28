import Transaction from "../models/TransactionModels.js";

export const createTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.create(req.body);
    res.status(201).json({
      status: "success",
      message: "Transaction created successfully",
      data: transaction,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
      data: null,
    });
  }
};

export const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ date: -1 });
    res.status(200).json({
      status: "success",
      message: "Transactions fetched successfully",
      data: transactions,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
      data: null,
    });
  }
};

export const getBalance = async (req, res) => {
  try {
    const result = await Transaction.aggregate([
      { $group: { _id: "$type", total: { $sum: "$amount" } } },
    ]);

    const totals = {
      income: result.find((r) => r._id === "income")?.total || 0,
      expense: result.find((r) => r._id === "expense")?.total || 0,
      given: result.find((r) => r._id === "given")?.total || 0,
      taken: result.find((r) => r._id === "taken")?.total || 0,
    };

    // Initial values
    let cash = totals.income; // Cash (C) starts with total income
    let balance = totals.income; // Balance (B) starts with total income

    // Step 1: Deduct expenses
    cash -= totals.expense;
    balance -= totals.expense;

    // Step 2: If I pay for someone (Taken)
    cash -= totals.taken; // Taken amount reduces cash
    // Balance remains the same in this case

    res.status(200).json({
      status: "success",
      message: "Balance calculated successfully",
      data: {
        cash, // Equivalent to "C" in the image
        balance, // Equivalent to "B" in the image
        details: totals,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
      data: null,
    });
  }
};

export const getLastMonthExpenses = async (req, res) => {
  try {
    const date = new Date();
    const lastMonthStart = new Date(date.getFullYear(), date.getMonth() - 1, 1);
    const lastMonthEnd = new Date(date.getFullYear(), date.getMonth(), 0);

    const total = await Transaction.aggregate([
      {
        $match: {
          type: "expense",
          date: { $gte: lastMonthStart, $lte: lastMonthEnd },
        },
      },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    res.status(200).json({
      status: "success",
      message: "Last month's expenses fetched successfully",
      data: { total: total[0]?.total || 0 },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
      data: null,
    });
  }
};

export const deleteTransaction = async (req, res) => {
  const { id } = req.params; // Get the ID from the request parameters

  try {
    // Find the transaction by ID and delete it
    const transaction = await Transaction.findByIdAndDelete(id);

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    return res
      .status(200)
      .json({ message: "Transaction deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
