import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import image from "./plus.png";
import Modal from "./Modal";
import "./TeacherPage.css";

const ExamPage = () => {
  const nav = useNavigate();

  return (
    <div className="bg">
      <div className="container-main">
        {" "}
        <Link
          className="btn btn-outline-secondary"
          to="/TeacherDashboard/TeacherCoursePage"
          style={{
            marginRight: "1100px",
            align: "left",
            fontStyle: "bold",
          }}
        >
          {"Back"}
        </Link>
        <br></br>
        <div className="container-list">
          <h1 className="mb-4"> CourseName - Exams</h1>{" "}
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
                    onClick={() => viewCourse(student.id)}
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
              </tr>
            ))}
            x */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ExamPage;
