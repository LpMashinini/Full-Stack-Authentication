import express from "express"
import mysql from "mysql2"
import cors from "cors"
import jws from "jsonwebtoken"
import bcrypt from "bcrypt"
import cookieParser from "cookie-parser"

const salt = 10;

const app = express();


// middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Database Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "signup"
})


app.post('/register', (req, res) => {

    const sql = "INSERT INTO login (`name`,`email`,`password`) VALUES (?,?,?)";
    bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {

        if (err) return res.json({ Error: "Error for hashing password" });

        const values = [
            req.body.name,
            req.body.email,
            hash
        ]

        db.query(sql, values, (err, result) => {
            if(err) return res.json({Error: "Inserting data error"});
            return res.json({status: 'Success'})
        })
    })
})

app.listen(5001, () => {
    console.log("Server running on port 5001");
})