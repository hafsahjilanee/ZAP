import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AddTeacher.css";

const AddStudent = () => {
  let navigate = useNavigate();
  const [Student, setStudent] = useState({
    firstName: "",
    lastName: "",
    role: "student",
    user_id: "",
    password: "",
  });

  const { firstName, lastName, role, user_id, password } = Student;
  const onInputChange = (e) => {
    setStudent({ ...Student, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:4000/admin/registerStudent", Student, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("auth"),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    navigate("/AdminDashboard/studentPage");
  };
  return (
    <div className="container-main">
      <div className=" container-form shadow  ">
        <h2 className=" mb-4">Add a Student</h2>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg mb-2"
              id="floatingInput"
              name="firstName"
              placeholder="Enter First Name"
              value={firstName}
              onChange={(e) => onInputChange(e)}
            />
          </div>

          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg mb-2"
              id="floatingInput"
              name="lastName"
              placeholder="Enter Last Name"
              value={lastName}
              onChange={(e) => onInputChange(e)}
            />
          </div>

          <div className="form-group mb-3 ">
            <input
              type="text"
              className="form-control form-control-lg mb-2"
              id="floatingInput"
              name="Role"
              placeholder="Enter Role"
              value="Role-Student"
              onChange={(e) => onInputChange(e)}
            />
          </div>

          <div className="form-group mb-3 ">
            <input
              type="text"
              className="form-control form-control-lg mb-2"
              id="floatingInput"
              name="user_id"
              placeholder="Enter User ID"
              value={user_id}
              onChange={(e) => onInputChange(e)}
            />
          </div>

          <div className="form-group mb-3 ">
            <input
              type="password"
              className="form-control form-control-lg mb-4"
              id="floatingInput"
              placeholder="Enter Initial password"
              name="password"
              value={password}
              onChange={(e) => onInputChange(e)}
            />
          </div>

          <button className="btn btn-primary btn-block me-2 mb-2">Add</button>

          <Link className="btn mb-2" to="/AdminDashboard/StudentPage">
            Back
          </Link>
        </form>
      </div>
    </div>
  );
};

export default AddStudent;
