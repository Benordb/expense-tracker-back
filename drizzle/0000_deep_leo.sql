CREATE TABLE
IF NOT EXISTS "users"
(
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar
(256) NOT NULL,
	"password" varchar
(256) NOT NULL,
	"email" varchar
(256) NOT NULL,
	"currency_type" varchar
(256) DEFAULT 'MNT',
	"avatar_img" varchar
(256),
	"updatedAt" timestamp,
	"createdAt" timestamp,
	CONSTRAINT "users_email_unique" UNIQUE
("email")
);

CREATE TABLE
IF NOT EXISTS "records"
(
	"id" serial PRIMARY KEY NOT NULL,
	"userId" integer,
	"categoryId" integer,
	"amount" integer,
	"transaction_type" varchar
(256),
	"payee" varchar
(256),
	"note" varchar
(256),
	"updatedAt" timestamp,
	"createdAt" timestamp
);

CREATE TABLE
IF NOT EXISTS "categories"
(
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar
(256),
	"color" varchar
(256),
	"icon_name" varchar
(256),
	"updatedAt" timestamp,
	"createdAt" timestamp
);
