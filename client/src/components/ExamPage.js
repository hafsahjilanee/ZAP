import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import image from "./plus.png";
import Modal from "./Modal";
import "./TeacherPage.css";

const ExamPage = () => {
  const nav = useNavigate();

  const [exams, setExams] = useState([{
    exams: [
      {
        examName: "",
        end_exam_date: "",
        totalMarks: ""
      }
    ]
  }]);

  useEffect(() => {
    loadExamDetails();
  }, []);

  const loadExamDetails = async () => {
    const result = await axios({
      method: "get",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("auth"),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      url: "http://localhost:4000/exams/"+localStorage.getItem("courseID"),
    });
    console.log(result.data)
    setExams(result.data);
    //console.log(questions)
    //setUser(result.data.reverse());
  };
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
                  Total Marks
                </th>

                <th style={{ width: "35%" }}> Action </th>
              </tr>
            </thead>
            <tbody>
              {exams.map((ex) => (
                ex.exams.map((e,i)=> 
              <tr>
                <th scope="row">{i + 1}</th>
                <td>{e.examName}</td>
                <td>{e.end_exam_date}</td>
                <td>{e.totalMarks}</td>

                <td>
                  
                  <button
                    className="btn btn-outline-secondary me-2"
                    //onClick={() => viewCourse()}
                  >
                    View
                  </button>
                  <button
                    className="btn btn-outline-primary me-2"
                    //onClick={() => editCourse()}
                  >
                    Attempt
                  </button>
            
                </td>
              </tr>
            )))}

            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ExamPage;
