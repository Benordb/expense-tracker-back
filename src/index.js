const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { accountRouter } = require("./routes/account.route");
const { categoryRouter } = require("./routes/category.route");
const { recordRouter } = require("./routes/record.route");
const { userRouter } = require("./routes/user.router");
const { authRouter } = require("./routes/auth.route");
const { authMiddleware } = require("./middleware/auth.middleware");
dotenv.config();
const app = express();
const port = process.env.PORT || 4000;
app.use(cors());
app.use(express.json());
app.use(authMiddleware);

app.use("/accounts", accountRouter);
app.use("/categories", categoryRouter);
app.use("/records", recordRouter);
app.use("/users", userRouter);
app.use("/auth", authRouter);

app.listen(port, () => {
  console.log("Server is running on port 3030");
});
