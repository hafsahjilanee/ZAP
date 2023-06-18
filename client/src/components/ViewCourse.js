import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const ViewCourse = () => {
  const [Course, setCourse] = useState({
    name: "",
    term: "",
    class_code: "",
    active_status:""
  });
  const id = useParams();
  useEffect(() => {
    loadCourse();
  }, []);

  const loadCourse = async () => {
    console.log(id.id);
    const result = await axios({
      method: "get",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("auth"),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      url: "http://localhost:4000/courses/" + id.id,
    });
    console.log(result.data);
    setCourse(result.data);
  };

  return (
    <div className="container-main py-4 ">
      <Link
        className="btn btn-outline-secondary mb-4"
        to="/adminDashboard/CoursesPage"
        style={{
          marginRight: "1100px",
          align: "left",
          fontStyle: "bold",
        }}
      >
        {"Back"}
      </Link>
      <h2 className="text-center mb-4">{Course.name}</h2>{" "}
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
            value={Course.name}
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
            value={Course.class_code}
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
            value={Course.term}
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
            value={Course.active_status}
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
            value={Course.active_status}
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
      </div>
    </div>
  );
};

export default ViewCourse;
