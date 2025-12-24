import express from "express"
import mysql from "mysql2"
import cors from "cors"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import cookieParser from "cookie-parser"

const salt = 10;

const app = express();


// middleware
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["POST", "GET"],
    credentials: true
}));

app.use(cookieParser());

// Database Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "signup"
})

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.json({ Error: "Not authorized" });
    } else{
        jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            if (err) {
                return res.json({ Error: "Token is not valid" });
            } else {
                req.name = decoded.name;
                next();
            }   
        })
    }
}

app.get('/', verifyUser , (req, res) => {
    return res.json({ status: "Success", name: req.name });
    
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
            if (err) return res.json({ Error: "Inserting data error" });
            return res.json({ status: 'Success' })
        })
    })
})

app.post("/login", (req, res) => {

    // login api

    const sql = 'SELECT * FROM login WHERE email = ?';

    db.query(sql, [req.body.email], (err, data) => {


        if (err) return res.json({ Error: "Error in login Api" });

        if (data.length > 0) {

            bcrypt.compare(req.body.password.toString(), data[0].password, (err, response) => {
                if (err) return res.json({ Error: "Password compare error" });

                if (response) {

                    const name = data[0].name;
                    const token = jwt.sign({ name },"jwt-secret-key",{expiresIn: '1d'});

                    res.cookie('token', token);
                    return res.json({ status: "Success" });
                } else {
                    return res.json({ Error: "Wrong password" });
                }

            });

        } else {
            return res.json({ Error: "Email not found" });
        }

    })

})

app.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({ status: "Success" });
})

app.listen(5001, () => {
    console.log("Server running on port 5001");
})