const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
    if (!req.header("Authorization"))
        return res.send("Provide valid authorization token")

    jwt.verify(req.header("Authorization").substring(7), process.env.PRIVATE_KEY, (err, decoded) => {
        if (err)
            return res.send("Invalid or expired token")

        res.locals.user = decoded

        return next()
    })

}