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
        if (!req.body.operator || !req.body.closing || !req.body.opening || !req.body.payments || !req.body.mastercard || !req.body.date || !req.body.concept || !req.body.designation)
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


            con.query("SELECT * FROM entradas WHERE fecha = ? AND designation_id = ?", [req.body.date.split("T")[0], parseInt(req.body.designation)], function (err, result) {
                if (err)
                    return res.json({ success: false, error: "An error ocurred on our end, please try again later2" })
console.log(result)
                if (result.length > 0)
                    return res.json({ success: false, error: "Ya se ha enviado el cierre para el negocio seleccionado" })
                
                con.query("INSERT INTO entradas (concepto, cierre_contado, apertura_contado, pagos, tarjeta, fecha, designation_id, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [req.body.concept, (Math.round((parseFloat(req.body.closing) + Number.EPSILON) * 100) / 100), (Math.round((parseFloat(req.body.opening) + Number.EPSILON) * 100) / 100), (Math.round((parseFloat(req.body.payments) + Number.EPSILON) * 100) / 100), (Math.round((parseFloat(req.body.mastercard) + Number.EPSILON) * 100) / 100), req.body.date.split("T")[0], parseInt(req.body.designation), parseInt(req.body.operator)], function (err, result) {
                    if (err)
                        return res.json({ success: false, error: "An error ocurred on our end, please try again later2" + err.message })

                    if (result.affectedRows === 0)
                        return res.json({ success: false, error: "An error ocurred on our end, please try again later3" })

                    return res.json({ success: true, error: "" })
                })
            })
        })
    },

    delete: (req, res) => {
        if (!req.params.id)
            return res.json({ success: false, error: "The deletion id was not supplied" })

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
                return res.json({ success: false, error: "An error ocurred on our end, please try again later" })


            con.query("DELETE FROM entradas WHERE id = ?", req.params.id, function (err, result) {
                if (err)
                    return res.json({ success: false, error: "An error ocurred on our end, please try again later" })

                if (result.affectedRows === 0)
                    return res.json({ success: false, error: "An error ocurred on our end, please try again later" })

                return res.json({ success: true, error: "" })
            })
        })
    }
}