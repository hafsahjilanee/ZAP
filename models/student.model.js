const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    student_id: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: false },
    course: [
        { 
            type: mongoose.Schema.Types.ObjectId,
            ref: "Courses"
        }
        ],
    createdDate: { type: Date, default: Date.now },
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});

const Student = mongoose.model('Student', schema);
module.exports = Student;