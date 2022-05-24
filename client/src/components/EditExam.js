import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./AddTeacher.css";

const EditExam = () => {
  //const nav = useNavigate();

  const [Exam, setExam] = useState({
    // _id: "",
    // examName: "",
    // startTimePeriod: "",
    // endTimePeriod: "",
    // totalMarks: "",
    // questions: [{ description: "" }],
  });

  useEffect(() => {
    loadExamDetails();
  }, []);

  const id = useParams();
  console.log(id);
  const loadExamDetails = async () => {
    const result = await axios({
      method: "get",

      headers: {
        Authorization: "Bearer " + localStorage.getItem("auth"),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      url: "http://localhost:4000/exams/view/" + id,
    });
    console.log(result.data);
    setExam(result.data);
    //console.log(questions)
    //setUser(result.data.reverse());
  };

  //
  //
  // fetching questions
  //
  //
  const [questions, setQuestions] = useState([]);

  const [pageCount, setpageCount] = useState(0);

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
      <h3 className="text-center mb-4">{Exam.examName}</h3>{" "}
      <div className="container-form">
        <div class="row mb-3">
          <label
            class="col-sm-2 col-form-label"
            style={{ width: "140px", margin: "auto" }}
          >
            Open date
          </label>

          <input
            type="datetime-local"
            class="form-control-lg"
            name="Exam.start_exam_time"
            value={Exam.start_exam_time}
            readOnly
            style={{ width: "300px", margin: "auto" }}
          />
        </div>
        <div class="row mb-3">
          <label
            class="col-sm-2 col-form-label"
            style={{ width: "140px", margin: "auto" }}
          >
            Due on
          </label>

          <input
            type="datetime-local"
            class="form-control-lg"
            name="Exam.end_exam_time"
            value={Exam.end_exam_time}
            readOnly
            style={{ width: "300px", margin: "auto" }}
          />
        </div>

        <div class="row mb-3">
          <label
            class="col-sm-2 col-form-label"
            style={{ width: "150px", margin: "auto" }}
          >
            Max Marks
          </label>

          <input
            type="text"
            class="form-control-lg"
            name="Exam.totalMarks"
            value={Exam.totalMarks}
            readOnly
            style={{ width: "300px", margin: "auto" }}
          />
        </div>
        <h2>Questions</h2>
        <table class="table table-hover border shadow">
          <thead>
            <tr>
              <th style={{ width: "5%" }} scope="col">
                #
              </th>
              <th style={{ width: "10%", overflow: "auto" }} scope="col">
                Description
              </th>
              <th style={{ width: "10%", overflow: "auto" }} scope="col">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {questions &&
              questions.map((question, index) => (
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td
                    style={{
                      height: "min-content",
                      wrap: "soft",
                      width: "max-content",
                    }}
                  >
                    {question.description}
                  </td>
                  <td>
                    <Link
                      class="btn btn-outline-secondary me-2"
                      to={`/quizDashboard/ViewQuestion/${question._id}`}
                    >
                      View
                    </Link>
                    <Link
                      className="btn btn-outline-primary me-2"
                      to={`/quizDashboard/EditQuestion/${question._id}`}
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
          </tbody>
        </table>
        <br />
      </div>
    </div>
  );
};

export default EditExam;
