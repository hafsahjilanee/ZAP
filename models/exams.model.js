const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const schema = new Schema({
    examName: {type: String},
    createdDate: { type: Date, default: Date.now },
    start_exam_date: {type:String},
    startHours: {type: String},
    startMins: {type: String},
    startTimePeriod: {type: String,enum:['AM','PM']},
    end_exam_date: {type:String},
    endHours: {type: String},
    endMins: {type: String},
    endTimePeriod: {type: String,enum:['AM','PM']},
    totalMarks: {type:Number}
})

const Exam = mongoose.model('Exam', schema);
module.exports = Exam;