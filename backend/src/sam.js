const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database:"login_system"
})

db.connect((err) => {
    if (err) {
        return console.log("Error Connecting to database!!!!...",err);
    }
    console.log("DB connected....");
    
})
const app = express();



app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true}))


//Middleware to Validate Token
const authenticateToken = (req,res, next) =>{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "Access denied"})
    }

    jwt.verify(token, '1', (err, user) =>{
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ message: "Session expired", error: "TokenExpiredError"})
            }
            return res.status(403).json({ message: "Invalid Token", error: err.message})
        }
        req.user = user;
        next()
    })
}


app.post("/register", async (req, res) => {
    // { "username":"sam", "email":"sam@gmail.com", "password":"123" }
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are required"})   
    }

    //check if a user Already exist
    db.query("SELECT * FROM users WHERE Username = ?", [username], async (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Error checking If A user Exist", error: err.message })
        }
        if (result.length > 0) {
            return res.status(400).json({ message: "User Already Exist"})
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        //Insert user
        db.query("INSERT INTO `users`(`Username`, `Email`, `Password`) VALUES (?,?,?)", [username, email, hashedPassword], (err, results) => {
            if (err) {
                return res.status(500).json({ message: "Error Inserting User", error: err.message })
            }
            if (result) {
                return res.status(200).json({ message: "User Registered succussfully"})
            }
        })
    })
})


app.post("/login", async (req, res) => {
    // { "username": "sm", "password": "123" }
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "All fiels are required!...."})
    }

    db.query("SELECT * FROM users WHERE Username = ?", [username], async (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Database Error", error: err.message })
        }

        if (result.length === 0) {
            return res.status(404).json({ message: "Invalid Credentials"})
        }

        const users = result[0]
        const validPassword = await bcrypt.compare(password, users.Password);

        if (!validPassword) {
            return res.status(404).json({ message: "Invalid Credentials"})
        }

        const token = jwt.sign({ id: users.user_id, user: users.Username}, '1', { expiresIn: '1 m' })
        
        res.status(200).json({ message: "Loggin Successfully", token})
    })
})


app.get('/users', authenticateToken, (req, res) => {
    const sql = "SELECT * FROM users";
    db.query(sql, (err, result) => {
        if (err) {
            res.status(500).json({ message: "Error Fetching Users", error: err.message})
        }
        res.status(200).json({ message: "User fetched successfully", result})
    } )
})


app.get('/users/:id', authenticateToken, (req, res) => {

    const { id } = req.params;
    console.log(req.user);
    console.log(req.headers);
    
    
    

    const sql = "SELECT * FROM users WHERE user_id=?";
    db.query(sql, [id], (err, result) => {
        if (err) {
            res.status(500).json({ message: "Error Fetching Users", error: err.message})
        }
        if (result.length === 0) {
            return res.status(404).json({ message: " User with Id does not exist"})
        }
        res.status(200).json({ message: "User fetched successfully", result})
    } )
})


app.put("/update/:id", authenticateToken,(req,res) =>{
    const { id } = req.params;

    const updateData = req.body;

    const values = [
        updateData.Username,
        updateData.Email,
        id
    ]
    const sql = "UPDATE `users` SET `Username`= ?,`Email`= ? WHERE `user_id` = ?";

    db.query(sql, values, (err,result) =>{
        if (err) {
            return res.status(500).json({ message: "Database Error", error: err.message })
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: `No User with ID: ${id}  found to update`})
        }
        res.status(200).json({ message: "User Updated Successfully"})
        
    })
})


app.delete("/delete/:id", authenticateToken, (req,res) =>{
    const { id } =req.params;
     const sql = "DELETE FROM users WHERE user_id =?";
     db.query(sql, [id], (err, result) =>{
        if (err) {
            return res.status(500).json({ message: "Database", error: err.message })
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: `No User with ID: ${id}  found to Delete`})
        }
        res.status(200).json({ message: "User Delete Successfully"})
        
        
     })
})

app.listen(2000, () => {
    console.log("Server Running:");
    
})