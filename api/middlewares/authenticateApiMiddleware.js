const jwt = require('jsonwebtoken');
const SECRET = require('../config/config');

module.exports = function (req, res, next) {
    const token = req.get('tk') || req.get('token');
    if (token) {
        jwt.verify(token, SECRET, (err, data) => {
            if (err) return res.json({
                code: '2005',
                msg: 'failed to get data; invalid token',
                data: null
            })
            /** if valid, record the current user information */
            req.user = data; 
            next();
        })
    } else {
        return res.json({
            code: '2004',
            msg: 'failed to get data; missing token',
            data: null
        })
    }
}