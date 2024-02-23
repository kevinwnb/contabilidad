import { Request, Response } from "express"
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
            user: "root",
            password: "0000",
            database: "easy_trucking",
            multipleStatements: true
        });

        con.connect(function (err) {
            if (err)
                return res.json({ success: false, error: "An error ocurred on our end, please try again later" })

            con.query("SELECT id, email, password FROM users WHERE email = ?", req.body.email, function (err, result) {
                if (err)
                    return res.json({ success: false, error: "An error ocurred on our end, please try again later" + err.message })

                var user = result[0]

                bcrypt.compare(req.body.password, result[0].password, function (err, result) {
                    if (err)
                        return res.json({ success: false, error: "An error ocurred on our end, please try again later" })

                    if (!result)
                        return res.json({ success: false, error: "Invalid username or password" })

                    let token = jwt.sign({ id: user.id, email: user.email }, process.env.PRIVATE_KEY, { expiresIn: "1h" })
                    res.cookie("token", token)
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
            user: "root",
            password: "0000",
            database: "easy_trucking",
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