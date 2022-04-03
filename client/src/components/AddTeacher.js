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
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Add a Teacher</h2>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="mb-3 py-4">
            <label className="label">First Name</label>{" "}
            <input
              label="First Name"
              type="text"
              className="form-control-lg1 "
              id="floatingInput"
              name="firstName"
              placeholder="Enter First Name"
              value={firstName}
              onChange={(e) => onInputChange(e)}
            />
            <br></br>
            <label className="label">Last Name</label>{" "}
            <input
              type="text"
              className="form-control-lg1 "
              id="floatingInput"
              name="lastName"
              placeholder="Enter Last Name"
              value={lastName}
              onChange={(e) => onInputChange(e)}
            />
            <br></br>
            <label className="label">Role</label>{" "}
            <input
              type="text"
              className="form-control-lg1 "
              id="floatingInput"
              name="Role"
              placeholder="Enter Role"
              value="Teacher"
              onChange={(e) => onInputChange(e)}
            />
            <br></br>
            <label className="label">User ID</label>{" "}
            <input
              type="text"
              className="form-control-lg1 "
              id="floatingInput"
              name="user_id"
              placeholder="Enter User ID"
              value={user_id}
              onChange={(e) => onInputChange(e)}
            />
            <br></br>
            <label className="label">Initial password</label>{" "}
            <input
              type="password"
              className=" form-control-lg1 "
              id="floatingInput"
              placeholder="Enter Initial password"
              name="password"
              value={password}
              onChange={(e) => onInputChange(e)}
            />
          </div>

          <button className="btn btn-primary btn-block me-2 mb-2">
            Add Teacher
          </button>
          <Link className="btn btn-primary me-2 mb-2" to="/adminDashboard">
            Back to Dashboard
          </Link>
        </form>
      </div>
    </div>
  );
};

export default AddTeacher;
