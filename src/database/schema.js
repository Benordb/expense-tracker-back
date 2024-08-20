const { relations } = require("drizzle-orm");
const {
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
} = require("drizzle-orm/pg-core");

const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  password: varchar("password", { length: 256 }).notNull(),
  email: varchar("email", { length: 256 }).notNull().unique(),
  currency_type: varchar("currency_type", { length: 256 }).default("MNT"),
  avatar_img: varchar("avatar_img", { length: 256 }),
  updatedAt: timestamp("updatedAt"),
  createdAt: timestamp("createdAt"),
});
const records = pgTable("records", {
  id: serial("id").primaryKey(),
  userId: integer("userId"),
  categoryId: integer("categoryId"),
  amount: integer("amount"),
  transaction_type: varchar("transaction_type", { length: 256 }),
  payee: varchar("payee", { length: 256 }),
  note: varchar("note", { length: 256 }),
  updatedAt: timestamp("updatedAt"),
  createdAt: timestamp("createdAt"),
});

const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }),
  color: varchar("color", { length: 256 }),
  icon_name: varchar("icon_name", { length: 256 }),
  updatedAt: timestamp("updatedAt"),
  createdAt: timestamp("createdAt"),
});

const usersRelations = relations(users, ({ many }) => ({
  records: many(records),
}));

const categoryRelations = relations(categories, ({ many }) => ({
  records: many(records),
}));

const recordsRelations = relations(records, ({ one }) => ({
  user: one(users, {
    fields: [records.userId],
    references: [users.id],
  }),
  category: one(categories, {
    fields: [records.categoryId],
    references: [categories.id],
  }),
}));
module.exports = {
  users,
  records,
  categories,
  usersRelations,
  recordsRelations,
  categoryRelations,
};
