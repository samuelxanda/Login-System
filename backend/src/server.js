const express = require('express')
const jwt = require('jsonwebtoken')
const mysql = require('mysql2')
const bcrypt = require('bcrypt')
const cors = require('cors')

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database:"login_system"
})


db.connect((err) => {
    if (err) {
        console.log("Error Connecting to Database....",err);  
    }
})


const app = express();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.post("/register",  async (req, res) => {
   try {
       const { username, email, password } = req.body;

    //    console.log(req.body);

       if (!username || !password || !email) {
           return res.status(400).json({ message: 'All Field are required'})
       }

       db.query("SELECT * FROM users WHERE email = ?", [email], async (err, result) => {
           if (err) {
               return res.status(500).json({ message: "Database Error", error:err.message })
           }
           if (result.length > 0) {
               return res.status(400).json({ message: "User Already Exist"})
           }

           console.log("Password:", password, typeof password);


           const salt = await bcrypt.genSalt(10);
           const hashedPassword = await bcrypt.hash(password, salt);

//            console.log("Password:", password, typeof password);
// console.log("Salt:", salt, typeof salt);

           const sql = "INSERT INTO `users`(`Username`, `Email`, `Password`) VALUES (? ,? ,? )";

           db.query(sql, [username, email, hashedPassword], (err, results) => {
               if (err) {
                   return res.status(400).json({ message: "Error Register user", error: err.message })
               }
               if (results) {
                   return res.status(200).json({ message: "User Registerred Succesfully"})
               }
           })

          
       })

    
   } catch (error) {
    
   }
    
})
//Login API
app.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;     

    if (!username || !password) {
        return res.status(400).json({ message : "All Fields are required!!"})
    }

    db.query('SELECT * FROM users WHERE Username = ?', [username], async (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Database Error", error: err.message })
        }
        console.log(results);
        

        if (results.length === 0) {
            return res.status(400).json({ message: "Invalid Credential"})
        }

        const users = results[0];

        console.log("User Password", users.Password);
        
        const validPassword = await bcrypt.compare(password, users.Password);
        if (!validPassword) {
            return res.status(400).json({ message: "Invalid Credentials"})
        }

        const token = jwt.sign({ id: users.user_id, user: users.Username }, 'scret_key', { expiresIn: '1h' })

        res.status(200).json({ message: "Login Successfully", token})
        
        })
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message})
    }
    })





    


app.listen(3000, () => {
    console.log("Server Running:");
    
})


//pass data{register}

// { "username":"sam", "email":"sam@gmail.com", "password":"123" }

//pass data{login}

// { "username":"sam", "password":"123" }