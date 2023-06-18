const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const schema = new Schema({
    examName: {type: String},
    createdDate: { type: Date, default: Date.now },
    start_exam_date: {type:Date},
    // startHours: {type: String},
    // startMins: {type: String},
    end_exam_date: {type:Date},
    // endHours: {type: String},
    // endMins: {type: String},
    totalMarks: {type:Number},
    isOpen:{
        type: Boolean,
        required: true,
        default: false
    },
    isReturn: {
        type: Boolean,
        required: true,
        default: false
    },
    questions: [
        { 
            type: mongoose.Schema.Types.ObjectId,
            ref: "Question"
        }
        ]
})

const Exam = mongoose.model('Exam', schema);
module.exports = Exam;