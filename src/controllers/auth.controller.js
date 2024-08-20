const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { db } = require("../database");
const { users } = require("../database/schema");

const login = async (req, res) => {
    const { email, password } = req.body;
    const users = await db.query.users.findMany();

    const user = users.find((user) => user.email === email);
    if (!user) return res.status(401).json({ message: "User not found" });

    const match = await bcrypt.compare(password, user.password)
    if (!match) return res.status(401).json({ message: "Password is wrong" });

    const token = jwt.sign(
        {
            name: user.name,
            email: user.email,
            id: user.id,
        },
        process.env.JWT_SECRET
    );

    res.json({
        message: "Success",
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            avatar_img: user.avatar_img,
            currency_type: user.currency_type,
        },
    });
};
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const allUsers = await db.query.users.findMany();

        const existingUser = allUsers.find((user) => user.email === email);
        if (existingUser)
            return res.status(401).json({ message: "User already exists" });
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await db
            .insert(users)
            .values({
                name,
                password: hashedPassword,
                email,
                updatedAt: new Date(),
                createdAt: new Date(),
                avatar_img:
                    "https://res.cloudinary.com/dqhguhv7o/image/upload/v1723171048/samples/look-up.jpg",
            })
            .returning();
        const token = jwt.sign(
            {
                id: user[0].id,
                name: user[0].name,
                email: user[0].email,
                avatar_img: user[0].avatar_img,
                currency_type: user[0].currency_type,
            },
            process.env.JWT_SECRET
        );
        res.json({
            message: "Success",
            token,
            user: {
                id: user[0].id,
                name: user[0].name,
                email: user[0].email,
                avatar_img: user[0].avatar_img,
                currency_type: user[0].currency_type,
            },
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { login, register };
