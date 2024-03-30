const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
    const roles = ['Sin identificación', 'Gerente', 'Administrador', 'Empleado']
    
    if (!req.header("Authorization"))
        return res.send("Provide valid authorization token")

    jwt.verify(req.header("Authorization").substring(7), process.env.PRIVATE_KEY, (err, decoded) => {
        if (err)
            return res.send("Invalid or expired token")

        if (decoded.role_id != 1)
            return res.send("Unauthorized access")

        res.locals.user = decoded

        return next()
    })

}