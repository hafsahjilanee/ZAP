const jwt = require('jsonwebtoken');
const config = require('../config/config.json');

const validateToken = (req, res, next) => {
    const secret = config.secret;
    if (
        !req.headers.authorization ||
        !req.headers.authorization.startsWith('Bearer') ||
        !req.headers.authorization.split(' ')[1]
    ) {
        return res.status(422).json({ error: { status: 1, message: "Please provide token" }, data: {}, message: {} })
    }

    try {

        const theToken = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(theToken, secret);

        if (theToken) {
            res.locals.decoded = decoded
            next();
        }

    } catch (e) {
        return res.status(400).json({ error: { status: 1, message: e.message }, data: {}, message: {} });
    }

}

const permitAdmin = (req, res, next) => {
    try {

        if (res.locals.decoded.role !=='admin') {
            return res.status(400).json({ error: { status: 1, message: "Only Admin can Access!" }, data: {}, message: {} });
        }

        else {
            next();
        }

    } catch (e) {
        return res.status(400).json({ error: { status: 1, message: e.message }, data: {}, message: {} });
    }
}

const permitTeacher = (req, res, next) => {
    try {

        if (res.locals.decoded.role !='teacher') {
            return res.status(400).json({ error: { status: 1, message: "Only Teachers can Access" }, data: {}, message: {} });
        }

        else {
            next();
        }

    } catch (e) {
        return res.status(400).json({ error: { status: 1, message: e.message }, data: {}, message: {} });
    }
}

const permitStudent = (req, res, next) => {
    try {

        if (res.locals.decoded.role !='student') {
            return res.status(400).json({ error: { status: 1, message: "Only Students can Access" }, data: {}, message: {} });
        }

        else {
            next();
        }

    } catch (e) {
        return res.status(400).json({ error: { status: 1, message: e.message }, data: {}, message: {} });
    }
}

const permitAll = (req, res, next) => {
    try {

        if (!res.locals.decoded.role) {
            return res.status(400).json({ error: { status: 1, message: "Only Admin can Access!" }, data: {}, message: {} });
        }

        else {
            next();
        }

    } catch (e) {
        return res.status(400).json({ error: { status: 1, message: e.message }, data: {}, message: {} });
    }
}

module.exports = { validateToken, permitAdmin, permitTeacher, permitStudent, permitAll };