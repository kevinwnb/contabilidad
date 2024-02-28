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
        if (!req.body.first_name || !req.body.last_name || !req.body.email || !req.body.password || !req.body.role_id || !req.body.designation_id) {
            return res.json({ success: false, error: "No se han proporcionado todos los campos" })
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
                    return res.json({ success: false, error: "Ya existe un usuario con este correo" })

                bcrypt.hash(req.body.password, 10, function (err, hash) {
                    if (err)
                        return res.json({ success: false, error: "An error ocurred on our end, please try again later" })

                    con.query("INSERT INTO users (first_name, last_name, email, password, role_id, designation_id) VALUES (?, ?, ?, ?, ?, ?)", [req.body.first_name, req.body.last_name, req.body.email, hash, req.body.role_id, req.body.designation_id], function (err, result) {
                        if (err)
                            return res.json({ success: false, error: "An error ocurred on our end, please try again later" + err.message })

                        return res.json({ success: true, error: "" })
                    })
                });
            })

        });

    },

    getAllUsers: (req, res) => {
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

            con.query("SELECT id, email, first_name, last_name, role_id, designation_id FROM users", function (err, result) {
                if (err)
                    return res.json({ success: false, error: "An error ocurred on our end, please try again later" })

                return res.json({ success: true, users: result })
            })
        })
    },

    changeUserPassword: (req, res) => {
        if (!req.body.user_id || !req.body.password)
            return res.json({ success: false, error: "No se han proporcionado todos los campos" })

        bcrypt.hash(req.body.password, 10, function (err, hash) {
            if (err)
                return res.json({ success: false, error: "An error ocurred on our end, please try again later" })

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

                con.query("UPDATE users SET password = ? WHERE id = ?", [hash, req.body.user_id], function (err, result) {
                    if (err)
                        return res.json({ success: false, error: "An error ocurred on our end, please try again later" })

                    return res.json({ success: true, error: "" })
                })
            })
        })
    },

    deleteUser: (req, res) => {
        if (!req.body.user_id)
            return res.json({ success: false, error: "No se han proporcionado todos los campos" })

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
                
            con.query("DELETE FROM users WHERE id = ?", [req.body.user_id], function (err, result) {
                if (err)
                    return res.json({ success: false, error: "An error ocurred on our end, please try again later" })

                return res.json({ success: true, error: "" })
            })
        })
    }
}