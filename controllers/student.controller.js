﻿const express = require('express');
const router = express.Router();
const userService = require('../services/student.service');
const {validateToken, permitStudent} = require('../middleware/AuthMiddleware');
// routes
//router.post('/login', login);
router.put('/:user_id', validateToken, permitStudent, update); //jwt of admin
router.put('/addInfo/:user_id', validateToken, permitStudent, addInfo);

module.exports = router;

/*function login(req, res, next) {
    userService.login(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}*/

function update(req, res, next) {
    userService.update(req.params.user_id, req.body)
    .then(() => res.json({
        data: req.body
       }))
    .catch(err => next(err));
}

function addInfo(req,res,next) {
    userService.addInfo(req.params.user_id,req.body)
        .then(() => res.json({
            data: req.body  
           }))
        .catch(err => next(err));

}