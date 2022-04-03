const express = require("express");
const router = express.Router();
const adminService = require("../services/user.service");
const {
  validateToken,
  permitAdmin,
  permitAll,
} = require("../middleware/AuthMiddleware");

// routes
router.post("/login", login);
router.post("/register", /*validateToken,permitAdmin,*/ register);
router.put("/:id", validateToken, permitAdmin, update);
router.delete("/:user_id", validateToken, permitAdmin, _delete);
//routes for teacher related issues
router.post("/registerTeacher", validateToken, permitAdmin, registerTeacher);
router.post("/registerStudent", validateToken, permitAdmin, registerStudent);
router.get("/getTeachers", /*validateToken, permitAdmin,*/ getAllTeachers);
router.get("/getStudents", /*validateToken, permitAdmin,*/ getAllStudents);
router.get("/getById/:id", validateToken, permitAll, getById);
router.get("/getAllInfo/:user_id", validateToken, permitAdmin, getAllInfo);

module.exports = router;

const NoError = { status: 0, message: "No error" };

function login(req, res, next) {
  adminService
    .login(req.body)
    .then((user) =>
      user
        ? res.json(user)
        : res.status(400).json({ message: "Unauthorized User!" })
    )
    .catch((err) => next(err));
}
function register(req, res, next) {
  adminService
    .register(req.body)
    .then(() =>
      res.json({
        data: req.body,
      })
    )
    .catch((err) => next(err));
}
function registerTeacher(req, res, next) {
  adminService
    .createTeacher(req.body)
    .then(() => res.json({ data: req.body }))
    .catch((err) => next(err));
}

function registerStudent(req, res, next) {
  adminService
    .createStudent(req.body)
    .then(() => res.json({ data: req.body }))
    .catch((err) => next(err));
}

function update(req, res, next) {
  adminService
    .update(req.params.id, req.body)
    .then(() =>
      res.json({
        data: req.body,
      })
    )
    .catch((err) => next(err));
}

function _delete(req, res, next) {
  adminService
    .delete(req.params.user_id)
    .then(() => res.json({}))
    .catch((err) => next(err));
}

function getAllTeachers(req, res, next) {
  adminService
    .getAllTeachers()
    .then((users) =>
      res.json({ error: NoError, data: { users: users }, message: "Check" })
    )
    .catch((err) => next(err));
}

function getAllStudents(req, res, next) {
  adminService
    .getAllStudents()
    .then((users) =>
      res.json({ error: NoError, data: { users: users }, message: "Check" })
    )
    .catch((err) => next(err));
}

function getById(req, res, next) {
  adminService
    .getById(req.params.id)
    .then((user) => (user ? res.json(user) : res.sendStatus(404)))
    .catch((err) => next(err));
}

function getAllInfo(req, res, next) {
  adminService
    .getAllInfo(req.params.user_id)
    .then((user) => (user ? res.json(user) : res.sendStatus(404)))
    .catch((err) => next(err));
}
