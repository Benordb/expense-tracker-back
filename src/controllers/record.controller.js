const { db } = require("../database");
const { records } = require("../database/schema");

const getAllRecords = async (req, res) => {
  try {
    const records = await db.query.records.findMany();

    const userId = req.params.user;
    const recordsByUserId = records.filter((record) => record.userId == userId);
    recordsByUserId.sort((a, b) => new Date(b.date) - new Date(a.date));
    res.json(recordsByUserId);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const createRecord = async (req, res) => {
  try {
    const {
      userId,
      categoryId,
      amount,
      payee,
      note,
      transaction_type,
      updatedAt,
    } = req.body;
    const record = await db
      .insert(records)
      .values({
        userId,
        categoryId,
        amount,
        payee,
        note,
        transaction_type,
        updatedAt: new Date(updatedAt),
        createdAt: new Date(),
      })
      .returning();

    res.json(record);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getAllRecords, createRecord };
