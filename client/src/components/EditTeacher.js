import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./AddTeacher.css";
const EditTeacher = () => {
  let history = useNavigate();
  const { id } = useParams();
  const [teacher, setTeacher] = useState({
    firstName: "",
    lastname: "",
    user_id: "",
    email: "",
    phone_no: "",
  });

  const { firstName, lastName, user_id, email, phone_no } = teacher;
  const onInputChange = (e) => {
    setTeacher({ ...teacher, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadTeacher();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    //await axios.put('http://localhost:4000/admin/'+id, student);
    console.log(id);
    await axios({
      method: "put",
      data: teacher,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("auth"),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      url: "http://localhost:4000/admin/" + id,
    });

    history("/adminDashboard/TeacherPage");
  };

  const loadTeacher = async () => {
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
    setTeacher(result.data);
  };
  return (
    <div className="container-main">
      <div
        className="container-form shadow "
        style={{
          marginTop: "100px",
          paddingTop: "100px",
          align: "center",
        }}
      >
        <h2 className="text-center mb-4">
          {firstName} {lastName}
        </h2>
        <form onSubmit={(e) => onSubmit(e)}>
          <div class="row mb-3">
            <label
              for="inputText3"
              class="col-sm-2 col-form-label"
              style={{ width: "120px", margin: "auto" }}
            >
              First Name
            </label>
            <input
              type="text"
              class="form-control-lg "
              id="inputText3"
              placeholder="First Name"
              name="firstName"
              value={firstName}
              style={{ width: "300px", margin: "auto" }}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div class="row mb-3">
            <label
              for="inputText3"
              class="col-sm-2 col-form-label"
              style={{ width: "120px", margin: "auto" }}
            >
              Last Name
            </label>
            <input
              type="text"
              class="form-control-lg"
              id="inputText3"
              placeholder="Last Name"
              name="lastName"
              value={lastName}
              style={{ width: "300px", margin: "auto" }}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div class="row mb-3">
            <label
              for="inputText3"
              class="col-sm-2 col-form-label"
              style={{ width: "120px", margin: "auto" }}
            >
              User ID
            </label>

            <input
              type="text"
              className="form-control-lg"
              placeholder="User ID"
              name="user_id"
              value={user_id}
              style={{ width: "300px", margin: "auto" }}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div class="row mb-3">
            <label
              for="inputText3"
              class="col-sm-2 col-form-label"
              style={{ width: "140px", margin: "auto" }}
            >
              Email Address
            </label>

            <input
              type="text"
              class="form-control-lg"
              id="inputText3"
              name="email"
              value={email}
              onChange={(e) => onInputChange(e)}
              style={{ width: "300px", margin: "auto" }}
            />
          </div>

          <div class="row mb-3">
            <label
              for="inputText3"
              class="col-sm-2 col-form-label"
              style={{ width: "150px", margin: "auto" }}
            >
              Contact Number
            </label>

            <input
              type="text"
              class="form-control-lg"
              id="inputText3"
              name="phone_no"
              value={phone_no}
              onChange={(e) => onInputChange(e)}
              style={{ width: "300px", margin: "auto" }}
            />
          </div>

          <button
            className="btn btn-primary me-2 mb-2"
            to="/adminDashboard/EditTeacher"
          >
            Update Teacher
          </button>
          <Link
            className="btn btn-outline-secondary me-2 mb-2"
            to="/adminDashboard/TeacherPage"
          >
            Back
          </Link>
        </form>
      </div>
    </div>
  );
};

export default EditTeacher;
