
const config = require('../config/config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('config/db');
const User = db.User;
const Teacher = db.Teacher;

module.exports = {
    login,
    register,
    createTeacher,
    createStudent,
    update,
    delete:_delete,
    getAllTeachers,
    getAllStudents,
    getById,
    getAllInfo
};

async function login({ user_id, password }) {
    const user = await User.findOne({ user_id });
   
    if (user && bcrypt.compareSync(password, user.hash)) {
        const accessToken = jwt.sign({ user_id: user.user_id, role: user.role }, config.secret, { expiresIn: '7d' });
        await User.findByIdAndUpdate(user._id, { accessToken })
        return {
            ...user.toJSON(),
            accessToken,
        };
    }
}

async function register(userParam) {
    // validate
    if(userParam.role!=='admin'){
        throw "Enter Valid user"
    }
    if (await User.findOne({ user_id: userParam.user_id })) {
        throw 'User ID "' + userParam.user_id + '" is already taken';
    }

    const user = new User(userParam);

    // hash password
    if (userParam.password) {
        user.hash = bcrypt.hashSync(userParam.password, 10);
    }
    const accessToken = jwt.sign({ user_id: user.user_id, role: user.role }, config.secret, {
        expiresIn: "1d" });
    user.accessToken = accessToken;
    // save user
    await user.save();
      
}

async function createTeacher(userParam) {
    // validate
    if(userParam.role!=='teacher'){
        throw "Enter Valid user role"
    }
    if (await User.findOne({ user_id: userParam.user_id })) {
        throw 'User ID "' + userParam.user_id + '" is already taken';
    }
    const user = new User(userParam);

    // hash password
    if (userParam.password) {
        user.hash = bcrypt.hashSync(userParam.password, 10);
    }
    const accessToken = jwt.sign({ user_id: user.user_id, role: user.role }, config.secret, {
        expiresIn: "1d" });
    user.accessToken = accessToken;

    // save teacher
    await user.save();
}

async function createStudent(userParam) {
    // validate
    if(userParam.role!=='student'){
        throw "Enter Valid user role"
    }

    if (await User.findOne({ user_id: userParam.user_id })) {
        throw 'User ID "' + userParam.user_id + '" is already taken';
    }

    const user = new User(userParam);

    // hash password
    if (userParam.password) {
        user.hash = bcrypt.hashSync(userParam.password, 10);
    }
    const accessToken = jwt.sign({ user_id: user.user_id, role: user.role }, config.secret, {
        expiresIn: "1d" });
    user.accessToken = accessToken;

    // save student
    await user.save();
}

async function update(id,userParam) {
    const user = await User.findById(id);
    // validate
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

async function _delete(user_id) {
    return await User.findOneAndRemove({user_id:user_id});
    
}

async function getAllTeachers() {
    return await User.find({role:"teacher"})
}

async function getAllStudents() {
    return await User.find({role:"student"})
}

async function getById(id) {
    
    return await User.findById(id);

}

async function getAllInfo(user_id){
     obj1 = await User.findOne({user_id})
     obj2 = await Teacher.findOne({teacher_id:obj1._id})
     
     const mergedObject = {
        User:obj1,
        Details:obj2
      };
       
      return (mergedObject)
   
    
    
        
}
