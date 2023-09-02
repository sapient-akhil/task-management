const JWT = require('jsonwebtoken')
const createError = require('http-errors')

module.exports = {

    verifyAccessTokenforOwner: (req, res, next) => {
        if (!req.headers['authorization']) return next(createError.Unauthorized())
        const token = req.headers['authorization']

        JWT.verify(token, process.env.JWT_SECRET_KEY, (err, payload) => {
            if (err) {
                return next(createError.Unauthorized(err.message));
            }
            if (payload.user_role.role !== 'admin') {
                const message = 'Only admin can access this route';
                return next(createError.Unauthorized(message));
            }
            req.payload = payload;
            console.log(payload)
            next()
        })
    }
}




