const express = require('express');
const Courses = require('../models/courses.model') 
const router = express.Router()

//add one course
router.post('/createCourse', async (req, res) => {
    try {
        
        const { name } = req.body
        const { term } = req.body
        const { class_code } = req.body
        const { active_status } = req.body

        if (await Courses.findOne({ class_code: req.body.class_code })) {
            throw 'class_code "' + req.body.class_code + '" is already taken';
        }

        const course = await Courses.create({
            name,
            term,
            class_code,
            active_status
        })

        

        return res.status(201).json(course) 
        
       //res.send('Hello World')
    } catch (error) {
        return res.status(500).json({"error":error})
    }
})

// update course
router.put('/:id', async (req, res) => {
    try {
        const _id = req.params.id; 
        const { name, class_code, term, active_status } = req.body

        let course = await Courses.findOne({_id})

        if(!course){
            course = await Courses.create({
                name,
                class_code, 
                term, 
                active_status
            })    
            return res.status(201).json(course)
        }else{
            course.name = name
            course.class_code = class_code
            course.term = term
            course.active_status = active_status

            await course.save()
            return res.status(200).json(course)
        }
    } catch (error) {
        return res.status(500).json({"error":error})
    }
})

// get all courses
router.get('/allCourses', async (req, res) => {
    try {
        const courses = await Courses.find()
        return res.status(200).json(courses)
    } catch (error) {
        return res.status(500).json({"error":error})
    }
})

// get one course
router.get('/:id', async (req, res) => {
    try {
        const _id = req.params.id 

        const course = await Courses.findOne({_id})        
        if(!course){
            return res.status(404).json({})
        }else{
            return res.status(200).json(course)
        }
    } catch (error) {
        return res.status(500).json({"error":error})
    }
})


// delete one course
router.delete('/:id', async (req, res) => {
    try {
        const _id = req.params.id 

        const course = await Courses.deleteOne({_id})

        if(course.deletedCount === 0){
            return res.status(404).json()
        }else{
            return res.status(204).json()
        }
    } catch (error) {
        return res.status(500).json({"error":error})
    }
})

module.exports = router