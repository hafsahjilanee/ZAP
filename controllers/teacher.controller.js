﻿const express = require('express');
const router = express.Router();
const userService = require('../services/teacher.service');
const Teachers = require('../models/teacher.model') 
const Courses = require('../models/courses.model');
const db = require('config/db');
const User = db.User;
const {validateToken, permitTeacher} = require('../middleware/AuthMiddleware');

// routes
//router.post('/login', login);
router.put('/:user_id', validateToken, permitTeacher, update);
//router.put('/addInfo/:user_id', validateToken, /*permitTeacher,*/ addInfo);
//router.get('/:id',validateToken,permitTeacher,getById);
module.exports = router;


//add or update teacher info
router.post('/addinfo/:userid', async (req, res) => {
    try {

        const { phone_no } = req.body
        const teacher_id = req.params.userid
        //console.log(teacher_id)
        if (await User.findOne({ _id: req.params.userid }))
        {
            let teacher = await Teachers.findOne({teacher_id: teacher_id})

            if(!teacher){
                teacher = await Teachers.create({
                    teacher_id,
                    phone_no
                })    
                return res.status(201).json(teacher)
            }else{
                teacher.teacher_id = teacher_id
                teacher.phone_no = phone_no
                await teacher.save()
                return res.status(200).json(teacher)
            }

            /*
            const teacher = await Teachers.create({
                teacher_id,
                phone_no
             })*/
             //return res.status(201).json(teacher) 
            
        }
        else{
            throw 'Teacher ID "' + req.body.teacher_id + '" is invalid';
        }       
        
       //res.send('Hello World')
    } catch (error) {
        return res.status(500).json({"error":error})
    }
})

router.get('/addinfo/:userid', async (req, res) => {
    try {

        const teacher_id = req.params.userid
        //console.log(teacher_id)
        if (await User.findOne({ _id: req.params.userid }))
        {
            let teacher = await Teachers.findOne({teacher_id: teacher_id})

            if(!teacher){
                teacher = await Teachers.create({
                    teacher_id
                })    
                return res.status(201).json(teacher)
            }else{
                teacher.teacher_id = teacher_id
                await teacher.save()
                return res.status(200).json(teacher)
            }

            /*
            const teacher = await Teachers.create({
                teacher_id,
                phone_no
             })*/
             //return res.status(201).json(teacher) 
            
        }
        else{
            throw 'Teacher ID "' + req.body.teacher_id + '" is invalid';
        }       
        
       //res.send('Hello World')
    } catch (error) {
        return res.status(500).json({"error":error})
    }
})

//get 1 teacher info
router.get('/:userid', async (req, res) => {
    try{

        const teacher_id = req.params.userid
        let user =await User.findOne({ _id: req.params.userid})
        if ( user) {
        
        let teacher = await Teachers.findOne({teacher_id: teacher_id})
      .populate("teacher_id")
      .populate("course")

     // console.log(teacher._id)

      return res.status(201).json(teacher) 

    }else{
        throw 'Teacher ID "' + req.params.userid + '" is invalid';
    }
    }
      catch(error) {
        // If an error occurred, send it to the client
        return res.status(500).json({"error":error})
      }
  });


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