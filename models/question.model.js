const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const schema = new Schema({
    description: String,
    isSubjective:  {
        type: Boolean,
        required: true,
        default: false
    },
    alternatives: [
        {
            text: {
                type: String,
                required: true
            },
            isCorrect: {
                type: Boolean,
                required: true,
                default: false
            }
        }
    ],
    marks: Number
})

const Question = mongoose.model('Question', schema);
module.exports = Question;