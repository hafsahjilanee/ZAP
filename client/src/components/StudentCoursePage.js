import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import image from "./plus.png";
import Modal from "./Modal";
import "./TeacherPage.css";

const StudentCoursePage = () => {
  const nav = useNavigate();

  return (
    <div className="bg">
      <div className="container-main">
        {" "}
        <Link
          className="btn btn-outline-secondary"
          to="/StudentDashboard/"
          style={{
            marginTop: "100px",
            marginBottom: "0px",
            marginRight: "1100px",
            align: "left",
            fontStyle: "bold",
          }}
        >
          {"Back"}
        </Link>
        <br></br>
        <div
          className="container-list"
          style={{
            marginTop: "0px",
            paddingTop: "0px",
            marginBottom: "100px",
          }}
        >
          <h1 className="mb-4"> CourseName - Exams</h1>{" "}
          <h2 className="mb-4"> //APIs for view and attempt exam needed</h2>
          <table class="table table-hover border shadow">
            <thead>
              <tr>
                <th style={{ width: "5%", overflow: "auto" }} scope="col">
                  #
                </th>
                <th style={{ width: "15%", overflow: "auto" }} scope="col">
                  Title
                </th>
                <th style={{ width: "8%", overflow: "auto" }} scope="col">
                  Due on
                </th>
                <th style={{ width: "10%", overflow: "auto" }} scope="col">
                  Status
                </th>

                <th style={{ width: "35%" }}> Action </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                {" "}
                <th scope="row">{"1"}</th>
                <td>{"Exam xyz"}</td>
                <td>{"02/02/22"}</td>
                <td>{"Open"}</td>
                <td>
                  <button
                    className="btn btn-outline-secondary me-2"
                    onClick={() => nav("/StudentDashboard/StudentViewExam")}
                  >
                    View
                  </button>
                  <button
                    className="btn btn-outline-primary me-2"
                    // onClick={() => }
                  >
                    Attempt
                  </button>
                </td>
              </tr>
              {/* {students.map((student, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{student.firstName}</td>
                <td>{student.user_id}</td>
                <td>{student.lastName}</td>
                <td>{student.lastName}</td>

                <td>
                  <button
                    className="btn btn-outline-secondary me-2"
                    onClick={() => }
                  >
                    View
                  </button>
                  <button
                    className="btn btn-outline-primary me-2"
                    onClick={() => editCourse(student.id)}
                  >
                    Attempt
                  </button>
                </td>
              </tr>*
                ))}*/}
              xx
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentCoursePage;
