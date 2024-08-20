const { Router } = require("express");
const {
  getAllCategories,
  createCategory,
  getCategoryId,
} = require("../controllers/category.controller");

const categoryRouter = Router();

categoryRouter
  .get("/", getAllCategories)
  .post("/", createCategory)
  .get("/:id", getCategoryId);

module.exports = { categoryRouter };
