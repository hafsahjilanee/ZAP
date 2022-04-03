const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    user_id: { type: String, unique: true, required: true },
    hash: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    role: {type: String, required: true, enum:['admin','teacher','student']},
    createdDate: { type: Date, default: Date.now },
    accessToken: {type: String}
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});

const User = mongoose.model('User', schema);
module.exports = User;