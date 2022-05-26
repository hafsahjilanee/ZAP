import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import image from "./plus.png";

import "./TeacherPage.css";

const ExamPage = () => {
  const nav = useNavigate();

  const [exams, setExams] = useState([
    {
      exams: [
        {
          _id: "",
          examName: "",
          end_exam_date: "",
          totalMarks: "",
        },
      ],
    },
  ]);

  const [Course, setCourse] = useState({
    name: "",
    term: "",
    class_code: "",
  });

  //console.log(localStorage.getItem("courseID"));

  const ViewExam = async (id) => {
    console.log(id);
    localStorage.setItem("exam_id", id);
    console.log(localStorage.getItem("exam_id"));
    nav("/TeacherDashboard/ViewExam/");
  };

  const editExam = async (id) => {
    console.log(id);
    localStorage.setItem("exam_id", id);
    console.log(localStorage.getItem("exam_id"));
    nav("/TeacherDashboard/EditExam/");
  };

  useEffect(() => {
    loadExamDetails();
  }, []);

  const loadExamDetails = async () => {
    //console.log("your're here")
    const result = await axios({
      method: "get",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("auth"),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      url: "http://localhost:4000/exams/" + localStorage.getItem("courseID"),
    });

    console.log(result.data);
    setExams(result.data);
    //console.log(questions)
    //setUser(result.data.reverse());
  };

  const loadCourses = async () => {
    console.log("your're loadCourses");
    const result = await axios({
      method: "get",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("auth"),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      url: "http://localhost:4000/courses/" + localStorage.getItem("courseID"),
    });

    console.log(result.data);
    setCourse(result.data);

    //setUser(result.data.reverse());
  };

  useEffect(() => {
    loadCourses();
  }, []);

  return (
    <div className="bg">
      <div className="container-main">
        {" "}
        <Link
          className="btn btn-outline-secondary"
          to="/TeacherDashboard/TeacherCoursePage"
          style={{
            marginTop: "130px",
            marginRight: "1100px",
            align: "left",
            fontStyle: "bold",
          }}
        >
          {"Back"}
        </Link>
        <br></br>
        <h1 className="mb-4">
          {" "}
          {Course.name}
          {"-"}
          {Course.class_code}
        </h1>{" "}
        <h2 className="mb-4">{Course.term}</h2>
        <div className="container-list">
          <h1 className="mb-4">
            {"  "} Exams
            <NavLink exact to="/TeacherDashboard/AddExam/">
              <img
                data-toggle="tooltip"
                data-placement="bottom"
                title="Add an Exam"
                className="img"
                src={image}
                alt="add"
                height="40"
                align="right"
                style={{ paddingRight: "3rem" }}
              ></img>{" "}
            </NavLink>
          </h1>
          <table className="table table-hover border shadow">
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
              {exams.map((ex) =>
                ex.exams.map((e, i) => (
                  <tr>
                    <th scope="row">{i + 1}</th>
                    <td>{e.examName}</td>
                    <td>{e.end_exam_date}</td>
                    <td>{e.totalMarks}</td>

                    <td>
                      <button
                        className="btn btn-outline-secondary me-2"
                        onClick={() => ViewExam(e._id)}
                      >
                        View
                      </button>
                      <button
                        className="btn btn-outline-primary me-2"
                        onClick={() => editExam(e.id)}
                        // onClick={nav("/TeacherDashboard/QuizDashboard")}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-outline-primary me-2"
                        //onClick={() => editExam(e.id)}
                        // onClick={nav("/TeacherDashboard/QuizDashboard")}
                      >
                        Grade
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ExamPage;
