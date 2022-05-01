const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    teacher_id: { 
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: false },
    phone_no: {type: String, required: false},
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

const Teacher = mongoose.model('Teacher', schema);
module.exports = Teacher;