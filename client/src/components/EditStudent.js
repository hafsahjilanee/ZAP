import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

const EditStudent = () => {
  let history = useNavigate();
  const { id } = useParams();
  const [student, setStudent] = useState({
    firstName: "",
    lastname: "",
    user_id: "",
  });

  const { firstName, lastName, user_id } = student;
  const onInputChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadStudent();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    //await axios.put('http://localhost:4000/admin/'+id, student);
    console.log(id);
    await axios({
      method: "put",
      data: student,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("auth"),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      url: "http://localhost:4000/admin/" + id,
    });

    history("/adminDashboard");
  };

  const loadStudent = async () => {
    const result = await axios({
      method: "get",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("auth"),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      url: "http://localhost:4000/admin/getById/" + id,
    });
    console.log(result.data);
    setStudent(result.data);
  };
  return (
    <div className="container-main">
      <div className="container-form shadow ">
        <h2 className="text-center mb-4">
          {firstName} {lastName}
        </h2>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg mb-2"
              placeholder="Enter first Name"
              name="firstName"
              value={firstName}
              onChange={(e) => onInputChange(e)}
            />
            <br></br>
          </div>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg mb-2"
              placeholder="Enter Last Name"
              name="lastName"
              value={lastName}
              onChange={(e) => onInputChange(e)}
            />
            <br></br>
          </div>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg mb-2"
              placeholder="Enter User ID"
              name="user_id"
              value={user_id}
              onChange={(e) => onInputChange(e)}
            />
            <br></br>
          </div>

          <button
            className="btn btn-primary me-2 mb-2"
            to="/adminDashboard/EditStudent"
          >
            Update Student
          </button>
          <Link
            className="btn btn-outline-secondary me-2 mb-2"
            to="/adminDashboard/StudentPage"
          >
            Back
          </Link>
        </form>
      </div>
    </div>
  );
};

export default EditStudent;
