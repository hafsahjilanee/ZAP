import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "./AddTeacher.css";

const ViewTeacher = () => {
  const [Teacher, setTeacher] = useState({
    firstName: "",
    lastName: "",
    user_id: "",
  });
  const id = useParams();

  useEffect(() => {
    loadTeacher();
  }, []);

  const loadTeacher = async () => {
    console.log(id.id);
    const result = await axios({
      method: "get",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("auth"),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      url: "http://localhost:4000/admin/getById/" + id.id,
    });
    console.log(result.data);
    setTeacher(result.data);
  };

  return (
    <div className="container-main py-4 ">
      <div className="container-form shadow">
        <h2 className="text-center mb-4">
          {Teacher.firstName} {Teacher.lastName}
        </h2>{" "}
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
            class="form-control-lg"
            id="inputText3"
            name="firstname"
            value={Teacher.firstName}
            readOnly
            style={{ width: "300px", margin: "auto" }}
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
            name="lastname"
            value={Teacher.lastName}
            readOnly
            style={{ width: "300px", margin: "auto" }}
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
            class="form-control-lg"
            id="inputText3"
            name="user ID"
            value={Teacher.user_id}
            readOnly
            style={{ width: "300px", margin: "auto" }}
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
            name="Email address"
            value={Teacher.user_id}
            readOnly
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
            name="Contact Number"
            value={Teacher.user_id}
            readOnly
            style={{ width: "300px", margin: "auto" }}
          />
        </div>
        {/*For course count (optional) */}
        <div class="row mb-3">
          <label
            for="inputText3"
            class="col-sm-2 col-form-label"
            style={{ width: "150px", margin: "auto" }}
          >
            Courses
          </label>

          <input
            type="text"
            class="form-control-lg"
            id="inputText3"
            name="Courses"
            value={Teacher.user_id}
            readOnly
            style={{ width: "300px", margin: "auto" }}
          />
        </div>
        <table class="table table-hover border shadow">
          <thead>
            <tr>
              <th style={{ width: "5%" }} scope="col">
                #
              </th>
              <th style={{ width: "10%", overflow: "auto" }} scope="col">
                Course Name
              </th>
            </tr>
          </thead>
          <tbody>
            {/* Map Courses here
            {Teacher.map((teacher, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{teacher.firstName}</td>
              </tr>
            ))} */}
          </tbody>
        </table>
        <br />
        <Link className="btn btn-primary" to="/adminDashboard/TeacherPage">
          Done
        </Link>
      </div>
    </div>
  );
};

export default ViewTeacher;
