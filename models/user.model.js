const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const schema = new Schema({
    user_id: { type: String, unique: true, required: true },
    hash: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    role: {type: String, required: true, enum:['admin','teacher','student']},
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
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