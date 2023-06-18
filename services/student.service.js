const config = require('../config/config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('config/db');
const User = db.User;
const Student = db.Student;

module.exports = {
    update,
    addInfo,
};

/*async function login({ user_id, password }) {
    const user = await User.findOne({ user_id });
    if (user && bcrypt.compareSync(password, user.hash) && user.role=='student') {
        const accessToken = jwt.sign({ user_id: user.user_id, role:user.role }, co3nfig.secret, { expiresIn: '7d' });
        await User.findByIdAndUpdate(user._id, { accessToken })
        return {
            ...user.toJSON(),
            accessToken
        };
    }
} */

async function update(user_id,userParam) {
    const user = await User.findOne({user_id:user_id});
    // validate
    if(user.role !== 'student') {
        throw 'You are not authorized to make this change'
    }
    if (!user) throw 'User not found';
    if (user.user_id !== userParam.user_id && await User.findOne({ user_id: userParam.user_id })) {
        throw 'User ID "' + userParam.user_id + '" is already taken';
    }
    
    // hash password if it was entered
    if (userParam.password) {
        userParam.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // copy userParam properties to user
    Object.assign(user, userParam);

    await user.save();
}

async function addInfo(user_id,userParam) {
    const user = await User.findOne( {user_id:user_id})
    if(!user) {
        throw 'User not found'
    }
    if(user.role!=='student') {
        throw 'You are not Authorized to make this change';
    }
    let student = await Student.findOne({student_id:user._id}) 
    if(!student) {
     student = new Student(userParam);
     student.student_id = user._id;
    }
    
    Object.assign(student, userParam);
    await student.save()
}