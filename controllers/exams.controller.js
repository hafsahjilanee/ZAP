const express = require('express');
const router = express.Router();
const Exam = require('../models/exams.model');
const Courses = require('../models/courses.model');

//id passed is course id
router.post('/:id', async (req, res) => {

    try{
        

        const { examName } = req.body
        const { start_exam_date } = req.body
        const { startHours } = req.body
        const { startMins } = req.body
        const { end_exam_date } = req.body
        const { endHours } = req.body
        const { endMins } = req.body
        const { totalMarks } = req.body

     const newExam = await Exam.create({
        examName,
        start_exam_date,
        startHours,
        startMins,
        end_exam_date,
        endHours,
        endMins,
        totalMarks
    })
    //console.log(newExam) 
    .then(async function(dbExam) {
      
       const addExam= await Courses.findOneAndUpdate({_id: req.params.id }, 
        {$push: {exams: dbExam._id}}, 
        { new: true });
        
        return res.status(201).json(addExam) 
    })
    
   }catch(err) {
      // If an error occurred, send it to the client
      return res.json(err);
    };
})

//get all exams for 1 course
router.get('/:id', async (req, res) => {
  try {
      const exams = await Courses.find({_id: req.params.id}).populate("exams").select("exams")

      return res.status(201).json(exams)
  } catch (error) {
      return res.status(500).json({"error":error})
  }
})

//get 1 exam
router.get('/view/:examId', async (req, res) => {
  try {
      const exam = await Exam.find({_id: req.params.examId})

      //console.log(exam);
      return res.status(200).json(exam)
  } catch (error) {
      return res.status(500).json({"error":error})
  }
})

//update 1 exam
router.put('/:examId', async (req, res) => {
  try {
      const _id = req.params.examId; 
      const { examName } = req.body
      const { start_exam_date } = req.body
      const { startHours } = req.body
      const { startMins } = req.body
      const { end_exam_date } = req.body
      const { endHours } = req.body
      const { endMins } = req.body
      const { totalMarks } = req.body

      let exam = await Exam.findOne({_id})

      if(!exam){
        exam = await Exam.create({
          examName,
          start_exam_date,
          startHours,
          startMins,
          end_exam_date,
          endHours,
          endMins,
          totalMarks
          })    
          return res.status(201).json(exam)
      }else{
        exam.examName=examName,
        exam.start_exam_date=start_exam_date,
        exam.startHours=startHours,
        exam.startMins=startMins,
        exam.end_exam_date=end_exam_date,
        exam.endHours=endHours,
        exam.endMins=endMins,
        exam.totalMarks=totalMarks
          await exam.save()
          return res.status(200).json(exam)
      }
  } catch (error) {
      return res.status(500).json({"error":error})
  }
})

//delete exam
router.delete('/:examId', async (req, res) => {
  try {
    const _id = req.params.examId;

    const exam = await Exam.findOne({ _id })

    if (exam) {

      await Exam.findByIdAndRemove({ _id }, async (err) => {
        if (err)
          console.error(err);

        await Courses.updateOne({
          "exams": { $in: [_id] }
        }, {
          $pullAll: { "exams": [_id] }
        }, (err, course) => {
          return res.status(204).json()
        })

      })
    }
    else {
      throw "Exam ID is invalid"
    }

  } catch (error) {
    return res.status(500).json({ "error": error })
  }
})
module.exports = router