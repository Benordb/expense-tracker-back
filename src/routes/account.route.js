const { Router } = require("express");
const {
  getAllAccounts,
  createAccount,
  deleteAccount,
  updateAccount,
  getAccountId,
} = require("../controllers/account.controller");

const accountRouter = Router();

accountRouter
  .get("/", getAllAccounts)
  .post("/", createAccount)
  .delete("/:id", deleteAccount)
  .put("/:id", updateAccount)
  .get("/:id", getAccountId);

module.exports = { accountRouter };
