


module.exports = {
    create: (req, res) => {
        if (!req.body.entry || !req.body.date || !req.body.concept)
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
                return res.json({ success: false, error: "An error ocurred on our end, please try again later" })

            con.query("SELECT * FROM trips WHERE user_id = ?", res.locals.user.id, function (err, result) {
                if (err)
                    return res.json({ success: false, error: "An error ocurred on our end, please try again later" })

                con.query("INSERT INTO entradas (concepto, cantidad, fecha) VALUES (?, ?, ?)", [res.body.concept, req.body.amount, req.body.date], function (err, result) {
                    if (err)
                        return res.json({ success: false, error: "An error ocurred on our end, please try again later" + err.message })

                    if (result.affectedRows === 0)
                        return res.json({ success: false, error: "An error ocurred on our end, please try again later" })

                    return res.json({ success: true, error: "" })
                })
            })
        })
    },
}