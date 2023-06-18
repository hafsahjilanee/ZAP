import React, { useState, useEffect } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import axios from "axios";
import image from "./plus.png";
import "./AddTeacher.css";
import "./TeacherPage.css";

const ViewExam = () => {
  //const nav = useNavigate();

  const [exams, setExams] = useState([
    {
      exams: [
        {
          _id: "",
          examName: "",
          start_exam_date: "",
          end_exam_date: "",
          totalMarks: "",
          //questions: [{ description: "" }],
        },
      ],
    },
  ]);
  const [Course, setCourse] = useState({
    name: "",
    term: "",
    class_code: "",
    students: [{ name: "", _id: "" }],
  });

  useEffect(() => {
    loadExamDetails();
  }, []);

  const id = useParams();

  const loadExamDetails = async () => {
    const result = await axios({
      method: "get",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("auth"),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      url:
        "http://localhost:4000/exams/view/" + localStorage.getItem("exam_id"),
    });
    console.log(result.data);
    setExams(result.data);
    //console.log(questions)
    //setUser(result.data.reverse());
  };

  const loadCourses = async () => {
    const result = await axios({
      method: "get",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("auth"),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      url: "http://localhost:4000/courses/" + localStorage.getItem("courseID"),
    });

    //console.log(result.data);
    setCourse(result.data);

    //setUser(result.data.reverse());
  };

  useEffect(() => {
    loadCourses();
  }, []);
  //
  //
  //
  //
  //
  const [questions, setQuestions] = useState([]);

  let limit = 3;

  const fetchQuestions = async (currentPage) => {
    const result = await axios({
      method: "get",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("auth"),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      url: `http://localhost:4000/question/?page=${currentPage}&pagination=50`,
    });
    console.log(result.data);
    setQuestions(result.data.data);
  };

  const handlePageClick = async (data) => {
    //console.log(data.selected);

    let currentPage = data.selected + 1;

    await fetchQuestions(currentPage);
  };

  useEffect(() => {
    loadQuestions();
  }, [limit]);

  const deleteQuestion = async (id) => {
    //console.log(id);
    await axios.delete(
      "http://localhost:4000/question/questions" + id,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("auth"),
        },
      },
      {
        data: { id: id },
      }
    );
    loadQuestions();
  };

  const loadQuestions = async () => {
    const result = await axios({
      method: "get",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("auth"),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      url: "http://localhost:4000/question/?page=1&pagination=50",
    });
    //console.log(result.data)
    setQuestions(result.data.data);
    //console.log(questions)
    //setUser(result.data.reverse());
  };

  return (
    <div className="container-main py-4 ">
      <Link
        className="btn btn-outline-secondary mb-4"
        to="/TeacherDashboard/ExamPage/"
        style={{
          marginRight: "1100px",
          align: "left",
          fontStyle: "bold",
        }}
      >
        {"Back"}
      </Link>{" "}
      <h3 className="text-center mb-4">{exams[0].examName}</h3>{" "}
      <div className="container-form">
        <div class="row mb-3">
          <label
            for="inputText3"
            class="col-sm-2 col-form-label"
            style={{ width: "140px", margin: "auto" }}
          >
            Exam Title
          </label>

          <input
            type="text"
            class="form-control-lg"
            id="inputText3"
            name="exams.examName"
            value={exams[0].examName}
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
            Open date
          </label>

          <input
            type="text"
            class="form-control-lg"
            id="inputText3"
            name="exams.StartTimePeriod"
            value={exams[0].start_exam_date}
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
            Due on
          </label>

          <input
            type="text"
            class="form-control-lg"
            id="inputText3"
            name="exams.endTimePeriod"
            value={exams[0].end_exam_date}
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
            Max Marks
          </label>

          <input
            type="text"
            class="form-control-lg"
            id="inputText3"
            name="totalMarks"
            value={exams[0].totalMarks}
            readOnly
            style={{ width: "300px", margin: "auto" }}
          />
        </div>{" "}
      </div>
      <div>
        <h2 style={{ marginTop: "50px" }}>
          Questions{" "}
          <NavLink to="/TeacherDashboard/addQuestion">
            <img
              className="img"
              src={image}
              alt="add"
              height="40"
              align="right"
              style={{ paddingRight: "3rem" }}
            ></img>{" "}
          </NavLink>{" "}
        </h2>
        <table className="table table-hover border shadow">
          <thead>
            <tr>
              <th style={{ width: "5%" }} scope="col">
                #
              </th>
              <th style={{ width: "40%", overflow: "auto" }} scope="col">
                Description
              </th>
              <th style={{ width: "40%", overflow: "auto" }} scope="col">
                Actions
              </th>
            </tr>
          </thead>
          {questions &&
            questions.map((question, index) => (
              <tr
                style={{
                  height: "60px",
                  wrap: "soft",
                  width: "max-content",
                }}
              >
                <th scope="row">{index + 1}</th>
                <td
                  style={{
                    height: "max-content",
                    wrap: "soft",
                    width: "max-content",
                  }}
                >
                  {question.description}
                </td>{" "}
                <td>
                  <Link
                    class="btn btn-outline-secondary me-2"
                    to={`/TeacherDashboard/ViewQuestion/${question._id}`}
                  >
                    View
                  </Link>
                  <Link
                    className="btn btn-outline-primary me-2"
                    to={`/TeacherDashboard/EditQuestion/${question._id}`}
                  >
                    Edit
                  </Link>
                  <button
                    to
                    class="btn btn-danger"
                    onClick={() => deleteQuestion(question._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </table>
        <br />
      </div>
    </div>
  );
};

export default ViewExam;
