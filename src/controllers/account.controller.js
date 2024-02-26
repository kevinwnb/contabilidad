const { Request, Response } = require("express")
const mysql = require("mysql2")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

module.exports = {
    login: (req, res) => {
        if (!req.body.email || !req.body.password) {
            return res.json({ success: false, error: "Invalid username or password" })
        }

        var con = mysql.createConnection({
            host: "localhost",
            port: 3306,
            user: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE,
            multipleStatements: true
        });

        con.connect(function (err) {
            if (err)
                return res.json({ success: false, error: "An error ocurred on our end, please try again later" + process.env.DATABASE })

            con.query("SELECT id, CONCAT(first_name, ' ', last_name) AS name, email, password, role_id, designation_id FROM users WHERE email = ?", req.body.email, function (err, result) {
                if (err)
                    return res.json({ success: false, error: "An error ocurred on our end, please try again later" + err.message })

                if (result.length === 0)
                    return res.json({ success: false, error: "Usuario o contraseña incorrectos" })

                var user = result[0]

                bcrypt.compare(req.body.password, result[0].password, function (err, result) {
                    if (err)
                        return res.json({ success: false, error: "An error ocurred on our end, please try again later" })

                    console.log(req.body)

                    if (!result) {

                        return res.json({ success: false, error: "Invalid username or password" })
                    }

                    let token = jwt.sign({ id: user.id, name: user.name, email: user.email, role_id: user.role_id, designation_id: user.designation_id }, process.env.PRIVATE_KEY, { expiresIn: "1h" })
                    res.cookie("token", token)
                    res.cookie("user_id", user.id)
                    res.cookie("user_name", user.name)
                    res.cookie("role_id", user.role_id)
                    res.cookie("designation_id", user.designation_id)
                    return res.json({ success: true, token: token })
                });
            })
        })
    },
    createAccount: (req, res) => {
        if (!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.password) {
            return res.json({ success: false, error: "All fields are required" })
        }

        if (req.body.password.length < 6) {
            return res.json({ success: false, error: "Password must be at least 6 characters long" })
        }

        const validateEmail = (email) => {
            return String(email)
                .toLowerCase()
                .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                );
        };

        if (!validateEmail(req.body.email)) {
            return res.json({ success: false, error: "Invalid email" })
        }

        var con = mysql.createConnection({
            host: "localhost",
            port: 3306,
            user: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE,
            multipleStatements: true
        });

        con.connect(function (err) {
            if (err)
                return res.json({ success: false, error: "An error ocurred on our end, please try again later" })

            con.query("SELECT id FROM users WHERE email = ?", [req.body.email], function (err, result) {
                if (err)
                    return res.json({ success: false, error: "An error ocurred on our end, please try again later" })

                if (result.length > 0)
                    return res.json({ success: false, error: "An account with this email already exists" })

                bcrypt.hash(req.body.password, 10, function (err, hash) {
                    if (err)
                        return res.json({ success: false, error: "An error ocurred on our end, please try again later" })

                    con.query("INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)", [req.body.firstName, req.body.lastName, req.body.email, hash], function (err, result) {
                        if (err)
                            return res.json({ success: false, error: "An error ocurred on our end, please try again later" + err.message })

                        console.log("Number of records inserted: " + result.affectedRows);

                        return res.json({ success: true, error: "" })
                    })
                });
            })

        });

    }
}