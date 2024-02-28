const mysql = require("mysql2")


module.exports = {
    byMonth: (req, res) => {
        console.log(req.params)
        if (!req.params.month || !req.params.year)
            return res.json({ success: false, error: "Por favor proporcione todos los campos requeridos" })

        var con = mysql.createConnection({
            host: "localhost",
            port: 3306,
            user: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE,
            multipleStatements: true
        })

        con.connect(function (err) {
            if (err)
                return res.json({ success: false, error: "An error ocurred on our end, please try again later1" + err.message })

            con.query("SELECT * FROM entradas WHERE MONTH(fecha) = ?", req.params.month, function (err, result) {
                if (err)
                    return res.json({ success: false, error: "An error ocurred on our end, please try again later2" })

                con.end(error => {
                    if (error) return res.json({ success: false, error: "An error ocurred on our end, please try again later db" })

                    console.log('con end')
                })

                return res.json({ success: true, entries: result })
            })
        })
    },
    byMonthForEmployee: (req, res) => {
        console.log(req.params)
        if (!req.params.month || !req.params.year)
            return res.json({ success: false, error: "Por favor proporcione todos los campos requeridos" })

        var con = mysql.createConnection({
            host: "localhost",
            port: 3306,
            user: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE,
            multipleStatements: true
        })

        con.connect(function (err) {
            if (err)
                return res.json({ success: false, error: "An error ocurred on our end, please try again later1" + err.message })

            con.query("SELECT id, concepto, fecha FROM entradas WHERE MONTH(fecha) = ?", req.params.month, function (err, result) {
                if (err)
                    return res.json({ success: false, error: "An error ocurred on our end, please try again later2" })

                con.end(error => {
                    if (error) return res.json({ success: false, error: "An error ocurred on our end, please try again later db" })

                    console.log('con end')
                })

                return res.json({ success: true, entries: result })
            })
        })
    },
    create: (req, res) => {
        if (!req.body.operator || !req.body.closing || !req.body.opening || !req.body.mastercard || !req.body.date || !req.body.concept || !req.body.designation)
            return res.json({ success: false, error: "Por favor proporcione todos los campos requeridos" })

        var con = mysql.createConnection({
            host: "localhost",
            port: 3306,
            user: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE,
            multipleStatements: true
        })

        con.connect(function (err) {
            if (err)
                return res.json({ success: false, error: "An error ocurred on our end, please try again later1" })


            con.query("INSERT INTO entradas (concepto, cierre_contado, apertura_contado, tarjeta, fecha, designation_id, user_id) VALUES (?, ?, ?, ?, ?, ?, ?)", [req.body.concept, parseFloat(req.body.closing), parseFloat(req.body.opening), parseFloat(req.body.mastercard), req.body.date.split("T")[0], parseInt(req.body.designation), parseInt(req.body.operator)], function (err, result) {
                if (err)
                    return res.json({ success: false, error: "An error ocurred on our end, please try again later2" + err.message })

                if (result.affectedRows === 0)
                    return res.json({ success: false, error: "An error ocurred on our end, please try again later3" })

                return res.json({ success: true, error: "" })
            })
        })
    },
}