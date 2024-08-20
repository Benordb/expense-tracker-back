const fs = require("fs");
const path = require("path");
const { v4 } = require("uuid");

const getAllAccounts = async (req, res) => {
  try {
    const filePath = path.join(__dirname, "..", "data", "accounts.json");
    const rawData = fs.readFileSync(filePath);
    const accounts = JSON.parse(rawData);

    res.json(accounts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const getAccountId = async (req, res) => {
  try {
    const filePath = path.join(__dirname, "..", "data", "accounts.json");
    const rawData = fs.readFileSync(filePath);
    const accounts = JSON.parse(rawData);

    const accountId = req.params.id;
    const accountTitle = req.params.title;
    const chooseAccount = accounts.find((account) => account.id === accountId);

    if (chooseAccount == null) {
      return res.status(404).json({ message: "Account not found" });
    }
    res.json(chooseAccount);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const createAccount = async (req, res) => {
  try {
    const filePath = path.join(__dirname, "..", "data", "accounts.json");
    const rawData = fs.readFileSync(filePath);
    const accounts = JSON.parse(rawData);

    const newAccount = { ...req.body, id: v4() };
    accounts.push(newAccount);

    fs.writeFileSync(filePath, JSON.stringify(accounts));
    res.json(newAccount);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const updateAccount = async (req, res) => {
  try {
    const filePath = path.join(__dirname, "..", "data", "accounts.json");
    const rawData = fs.readFileSync(filePath);
    const accounts = JSON.parse(rawData);

    const accountId = req.params.id;

    const chooseAccount = accounts.find((account) => account.id === accountId);
    if (chooseAccount == null) {
      return res.status(404).json({ message: "Account not found" });
    }

    const newAccount = req.body;
    const newAccounts = [
      ...accounts.filter((account) => account.id !== accountId),
      newAccount,
    ];
    fs.writeFileSync(filePath, JSON.stringify(newAccounts));
    res.json({ message: "Account updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const deleteAccount = async (req, res) => {
  try {
    const filePath = path.join(__dirname, "..", "data", "accounts.json");
    const rawData = fs.readFileSync(filePath);
    const accounts = JSON.parse(rawData);

    const accountId = req.params.id;
    const updatedAccounts = accounts.filter(
      (account) => account.id !== accountId
    );

    if (accounts.length === updatedAccounts.length) {
      return res.status(404).json({ error: "Account not found" });
    }

    fs.writeFileSync(filePath, JSON.stringify(updatedAccounts));
    res.json({ message: "Account deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports = {
  createAccount,
  getAllAccounts,
  updateAccount,
  deleteAccount,
  getAccountId,
};
