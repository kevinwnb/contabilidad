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
                return res.json({ success: false, error: "An error ocurred on our end, please try again later1"+err.message })

            con.query("SELECT * FROM entradas WHERE MONTH(fecha) = ?", req.params.month, function (err, result) {
                if (err)
                    return res.json({ success: false, error: "An error ocurred on our end, please try again later2" })

                return res.json({ success: true, entries: result })
            })
        })
    },
    create: (req, res) => {
        if (!req.body.amount || !req.body.date || !req.body.concept)
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


            con.query("INSERT INTO entradas (concepto, cantidad, fecha) VALUES (?, ?, ?)", [req.body.concept, req.body.amount, req.body.date.split("T")[0] ], function (err, result) {
                if (err)
                    return res.json({ success: false, error: "An error ocurred on our end, please try again later2" + err.message })

                if (result.affectedRows === 0)
                    return res.json({ success: false, error: "An error ocurred on our end, please try again later3" })

                return res.json({ success: true, error: "" })
            })
        })
    },
}