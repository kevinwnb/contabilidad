const { Request, Response } = require("express")
const mysql = require("mysql2")

module.exports = {
    create: (req, res) => {
        if (!req.body.startDate || !req.body.endDate || !req.body.miles)
            return res.json({ success: false, error: "Please provide the required fields" })

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

                if (result && result.length > 0) {
                    console.log(result)
                    console.log(req.body)
                    if (!result.every((trip) => {
                        if (((new Date(req.body.startDate)) >= (new Date(trip["start_date"])) && (new Date(req.body.startDate)) <= (new Date(trip["end_date"]))) || ((new Date(req.body.endDate)) >= (new Date(trip["start_date"])) && (new Date(req.body.endDate)) <= (new Date(trip["end_date"])))) {
                            console.log(new Date(req.body.startDate));
                            console.log(new Date(trip["start_date"]));
                            return false;
                        }

                        console.log(true)
                        return true
                    }))
                        return res.json({ success: false, error: "Your trip dates interfere with another trip" });
                }
                else
                    console.log(result)

                con.query("INSERT INTO trips (user_id, start_location, end_location, start_date, end_date, miles) VALUES (?, ?, ?, ?, ?, ?)", [res.locals.user.id, req.body.startLocation, req.body.endLocation, new Date(req.body.startDate), new Date(req.body.endDate), req.body.miles], function (err, result) {
                    if (err)
                        return res.json({ success: false, error: "An error ocurred on our end, please try again later" + err.message })

                    if (result.affectedRows === 0)
                        return res.json({ success: false, error: "An error ocurred on our end, please try again later" })

                    return res.json({ success: true, error: "" })
                })
            })
        })
    },
    update: (req, res) => {
        if (!req.body.id || !req.body.startDate || !req.body.endDate || !req.body.miles)
            return res.json({ success: false, error: "Please provide the required fields" })

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
            con.query("SELECT * FROM trips WHERE user_id = ? AND id <> ?", [res.locals.user.id, req.body.id], function (err, result) {
                if (err)
                    return res.json({ success: false, error: "An error ocurred on our end, please try again later" })

                if (result && result.length > 0) {
                    console.log(result)
                    console.log(req.body)
                    if (!result.every((trip) => {
                        if (((new Date(req.body.startDate)) >= (new Date(trip["start_date"])) && (new Date(req.body.startDate)) <= (new Date(trip["end_date"]))) || ((new Date(req.body.endDate)) >= (new Date(trip["start_date"])) && (new Date(req.body.endDate)) <= (new Date(trip["end_date"])))) {
                            console.log(new Date(req.body.startDate));
                            console.log(new Date(trip["start_date"]));
                            return false;
                        }

                        console.log(true)
                        return true
                    }))
                        return res.json({ success: false, error: "Your trip dates interfere with another trip" });
                }
                else
                    console.log(result)


                con.query("UPDATE trips SET start_location = ?, end_location = ?, start_date = ?, end_date = ?, miles = ? WHERE id = ?", [req.body.startLocation, req.body.endLocation, new Date(req.body.startDate), new Date(req.body.endDate), req.body.miles, req.body.id], function (err, result) {
                    if (err)
                        return res.json({ success: false, error: "An error ocurred on our end, please try again later" + err.message })

                    if (result.affectedRows === 0)
                        return res.json({ success: false, error: "An error ocurred on our end, please try again later" })

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

            con.query("DELETE FROM trips WHERE id = ?", req.params.id, function (err, result) {
                if (err)
                    return res.json({ success: false, error: "An error ocurred on our end, please try again later" })

                if (result.affectedRows === 0)
                    return res.json({ success: false, error: "An error ocurred on our end, please try again later" })

                return res.json({ success: true, error: "" })
            })
        })
    },
    getAll: (req, res) => {
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

            con.query("SELECT * FROM trips", function (err, result) {
                if (err)
                    return res.json({ success: false, error: "An error ocurred on our end, please try again later" })

                return res.json({ success: true, trips: result })
            })
        })
    }
}