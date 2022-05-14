const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const schema = new Schema(
    {
        name:{ type: String, required: true },
        class_code: { type: Number,unique: true, required: true },
        term:{ type:String , required: true },
        active_status:{ type: Boolean, required: true },
        teacher: { 
            type: mongoose.Schema.Types.ObjectId,
            ref: "Teacher"
        },
        exams: [
            { 
                type: mongoose.Schema.Types.ObjectId,
                ref: "Exam"
            }
            ]
    }
    )

const Courses = mongoose.model('Courses', schema);
module.exports = Courses;