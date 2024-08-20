const { Router } = require("express");
const {
  getAllRecords,
  createRecord,
} = require("../controllers/record.controller");

const recordRouter = Router();

recordRouter.get("/:user", getAllRecords);
recordRouter.post("/", createRecord);
module.exports = { recordRouter };
