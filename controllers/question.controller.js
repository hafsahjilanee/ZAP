const { query } = require('express');
const express = require('express')
const router = express.Router()
const Question = require('../models/question.model') 
const Exam = require('../models/exams.model');// includes our model

const NoError = {status:0, message:"No error"};

// get all quiz questions for one exam
router.get('/:examID', async (req, res) => {
    try {
        const questions = await Exam.find({_id: req.params.examID}).populate("questions").select("questions")
        return res.status(200).json(questions)
    } catch (error) {
        return res.status(500).json({"error":error})
    }
})

// get one quiz question
router.get('/view/:id', async (req, res) => {
    try {
        const _id = req.params.id 

        const question = await Question.findOne({_id})        
        if(!question){
            return res.status(404).json({})
        }else{
            return res.status(200).json(question)
        }
    } catch (error) {
        return res.status(500).json({"error":error})
    }
})

// create one quiz question
//id passed is of exam
router.post('/createQuestion/:examID', async (req, res) => {
    try {
        const { description } = req.body
        const { alternatives } = req.body
        const { marks } = req.body

        const exam = await Exam.findOne({_id: req.params.examID });
        
        if (exam){
        const question = await Question.create({
            description,
            alternatives,
            marks
        })
        .then(async function(dbQuestion) {
      
            const addQuestion= await Exam.findOneAndUpdate({_id: req.params.examID}, 
             {$push: {questions: dbQuestion._id}}, 
             { new: true });
             
             return res.status(201).json(addQuestion) 
         })
        }
        else {
            throw "exam ID " + req.params.examID +" not found"
        }
        
    } catch (error) {
        return res.status(500).json({"error":error})
    }
})

// update one quiz question
router.put('/:id', async (req, res) => {
    try {
        const _id = req.params.id; 
        const { description, alternatives, marks } = req.body

        let question = await Question.findOne({_id})

        if(!question){
            question = await Question.create({
                description,
                alternatives,
                marks
            })    
            return res.status(201).json(question)
        }else{
            question.description = description
            question.alternatives = alternatives
            question.marks = marks
            await question.save()
            return res.status(200).json(question)
        }
    } catch (error) {
        return res.status(500).json({"error":error})
    }
})

// delete one quiz question
router.delete('/:id', async (req, res) => {
    try {
        const _id = req.params.id;
    
        const question = await Question.findOne({ _id })
    
        if (question) {
    
          await Question.findByIdAndRemove({ _id }, async (err) => {
            if (err)
              console.error(err);
    
            await Exam.updateOne({
              "questions": { $in: [_id] }
            }, {
              $pullAll: { "questions": [_id] }
            }, (err, course) => {
              return res.status(204).json()
            })
    
          })
        }
        else {
          throw "Question ID is invalid"
        }
    
      } catch (error) {
        return res.status(500).json({ "error": error })
      }
})



router.get("/",async (req,res)=> {
    const pagination = parseInt(req.query.pagination);
    //parseInt(req.query.pagination) ? parseInt(req.body.pagination) : 10;
    //PageNumber From which Page to Start 
    const pageNumber = parseInt(req.query.page)
    //parseInt(req.query.page) ? parseInt(req.body.page) : 1;

    //console.log(req.query.page);
    //console.log(req.query.pagination);
    //console.log(pageNumber);
    //console.log(pagination);
    // let pageNumber = parseInt(req.query.pagination)
    let start = ((pageNumber -1)* pagination)
    let end = ((pageNumber -1)* pagination) + pagination

    const questions = await Question.find({}).limit(pagination).skip(start)
        // //skip takes argument to skip number of entries 
        // .sort({"id" : 1})
        // .skip((pageNumber - 1) * pagination)
        // //limit is number of Records we want to display
        // .limit(pagination)
        if(questions){
            res.status(200).json({
                data:questions
            })
        }else{
            res.status(400).send({
                "err": err
            })

        }
    })
        // .then((data) => res.json(
        //     data
        // ))
        // .catch(err => {
                    // })
// })

module.exports = router