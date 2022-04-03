﻿const express = require('express');
const router = express.Router();
const userService = require('../services/teacher.service');
const {validateToken, permitTeacher} = require('../middleware/AuthMiddleware');

// routes
//router.post('/login', login);
router.put('/:user_id', validateToken, permitTeacher, update);
router.put('/addInfo/:user_id', validateToken, permitTeacher, addInfo);
router.get('/:id',validateToken,permitTeacher,getById);
module.exports = router;

/*function login(req, res, next) {
    userService.login(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}*/

function update(req, res, next) {
    
    userService.update(req.params.user_id,req.body)
    .then(() => res.json({
        data: req.body
       }))
    .catch(err => next(err));
}

function getById(req, res, next) {
    userService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}
function addInfo(req,res,next) {
    userService.addInfo(req.params.user_id,req.body)
        .then(() => res.json({
            data: req.body
           }))
        .catch(err => next(err));

}