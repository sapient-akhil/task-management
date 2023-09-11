const JWT = require('jsonwebtoken')
const createError = require('http-errors')

module.exports = {

    verifyAccessTokenforAdmin: (req, res, next) => {
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
            // console.log(payload)
            next()
        })
    },

    verifyAccessTokenforUsersAdmin: (req, res, next) => {
        if (!req.headers['authorization']) return next(createError.Unauthorized())
        const token = req.headers['authorization']

        JWT.verify(token, process.env.JWT_SECRET_KEY, (err, payload) => {
            if (err) {
                return next(createError.Unauthorized(err.message));
            }
            if (payload.user_role.role !== 'employee' && payload.user_role.role !== 'admin') {
                const message = 'permission denied';
                return next(createError.Unauthorized(message));
            }
            req.payload = payload;
            // console.log(payload)
            next()
        })
    },

    verifyAccessTokenforUser: (req, res, next) => {
        if (!req.headers['authorization']) return next(createError.Unauthorized())
        const token = req.headers['authorization']

        JWT.verify(token, process.env.JWT_SECRET_KEY, (err, payload) => {
            if (err) {
                return next(createError.Unauthorized(err.message));
            }
            if (payload.user_role.role !== 'employee') {
                const message = 'Only employee can access this route';
                return next(createError.Unauthorized(message));
            }
            req.payload = payload;
            // console.log(payload)
            next()
        })
    }
}




