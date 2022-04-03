const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    student_id: { type: String, unique: true, required: false },
    phone_no: {type: String, required: false},
    course: [
        { 
            name: { type: String, required: true },
            course_id:{type:String, required: false, unique: false }
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