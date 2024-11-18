const jwt = require('jsonwebtoken');
const { findUser } = require('../component/service');
const CONFIG = require('./config');

exports.verifyToken = async (req, res, next) => {
    try {
        if (!req.headers.authorization) return res.status(401).end('Unauthorized');
        const data = await jwt.verify(req.headers.authorization.split(' ')[1], CONFIG.secret_key);
        const dataUser = await findUser(data._id);
        if (!dataUser) return res.status(401).end('Unauthorized');
        req.user = await dataUser;
        return next();
    } catch (error) {
        console.log('ERR = ', 'user-services', 'verify_token', error);
        return res.status(401).end('Unauthorized');
    }
};
