const { Request, Response } = require("express")
const mysql = require("mysql2")

module.exports = {
    getAllByIdAndYear: (req, res) => {
        console.log(req.params)
        if (!req.params.tripId || !req.params.year)
            return res.json({ success: false, error: "No parameters were supplied" })

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

            con.query("SELECT refuels.* FROM refuels INNER JOIN trips ON refuels.trip_id = trips.id WHERE refuels.trip_id = ? AND trips.start_date = ?", [req.params.tripId, new Date().setFullYear(Number(req.params.year))], function (err, result) {
                if (err)
                    return res.json({ success: false, error: "An error ocurred on our end, please try again later" })

                return res.json({ success: true, refuels: result })
            })
        })
    }
}