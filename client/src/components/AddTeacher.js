import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AddTeacher.css";

const AddTeacher = () => {
  let navigate = useNavigate();
  const [Teacher, setTeacher] = useState({
    firstName: "",
    lastName: "",
    role: "teacher",
    user_id: "",
    password: "",
  });

  const { firstName, lastName, role, user_id, password } = Teacher;
  const onInputChange = (e) => {
    setTeacher({ ...Teacher, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:4000/admin/registerTeacher", Teacher, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("auth"),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    navigate("/AdminDashboard/teacherPage");
  };
  return (
    <div className="container-main">
      <div className=" container-form shadow  ">
        <h2 className=" mb-4">Add a Teacher</h2>
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
              value="Role-Teacher"
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
          <div className="form-group mb-3 ">
            <input
              type="text"
              className="form-control form-control-lg mb-4"
              id="floatingInput"
              placeholder="Enter Email Address"
              name="email"
              value={user_id}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group mb-3 ">
            <input
              type="text"
              className="form-control form-control-lg mb-4"
              id="floatingInput"
              placeholder="Enter Contact Number"
              name="number"
              value={user_id}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <button className="btn btn-primary btn-block me-2 mb-2">Add</button>

          <Link className="btn mb-2" to="/AdminDashboard/TeacherPage">
            Back
          </Link>
        </form>
      </div>
    </div>
  );
};

export default AddTeacher;
