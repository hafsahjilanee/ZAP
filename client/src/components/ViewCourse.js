import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const ViewCourse = () => {
  const [Student, setStudent] = useState({
    firstName: "",
    lastName: "",
    user_id: "",
  });
  const id = useParams();
  useEffect(() => {
    loadStudent();
  }, []);

  const loadStudent = async () => {
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
    setStudent(result.data);
  };

  return (
    <div className="container-main py-4 ">
      <h2 className="text-center mb-4">
        {Student.firstName} {Student.lastName}
      </h2>{" "}
      <div className="container-form shadow">
        <div class="row mb-3">
          <label
            for="inputText3"
            class="col-sm-2 col-form-label"
            style={{ width: "120px", margin: "auto" }}
          >
            Course Name
          </label>

          <input
            type="text"
            class="form-control-lg"
            id="inputText3"
            name="firstname"
            value={Student.firstName}
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
            Course ID
          </label>

          <input
            type="text"
            class="form-control-lg"
            id="inputText3"
            name="lastname"
            value={Student.lastName}
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
            Term
          </label>

          <input
            type="text"
            class="form-control-lg"
            id="inputText3"
            name="user ID"
            value={Student.user_id}
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
            Taught by:
          </label>

          <input
            type="text"
            class="form-control-lg"
            id="inputText3"
            name="Email address"
            value={Student.user_id}
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
            Students
          </label>

          <input
            type="text"
            class="form-control-lg"
            id="inputText3"
            name="Courses"
            value={Student.user_id}
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
              <th style={{ width: "20%", overflow: "auto" }} scope="col">
                Student Name
              </th>
              <th style={{ width: "10%", overflow: "auto" }} scope="col">
                Student ID
              </th>
            </tr>
          </thead>
          <tbody>
            {/* Map Students here
            {Student.map((Student, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{Student.firstName}{Student.firstName}</td>
                <td>{Student.user_id}</td>
                </tr>
            ))} */}
          </tbody>
        </table>
        <br />
        <Link className="btn btn-primary" to="/adminDashboard/CoursesPage">
          Done
        </Link>
      </div>
    </div>
  );
};

export default ViewCourse;
