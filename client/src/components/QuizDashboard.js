import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink, Link } from "react-router-dom";
import image from "./plus.png";
import "./TeacherPage.css";

const QuizDashboard = () => {
  //used to store data
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
    <div className="container-main">
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
      <br></br>
      <div className="container-list">
        <h1 className="mb-4">
          Exam Questions
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
        </h1>{" "}
        <table class="table table-hover border shadow">
          <thead>
            <tr>
              <th style={{ width: "5%" }} scope="col">
                #
              </th>
              <th style={{ width: "60%", overflow: "auto" }} scope="col">
                Question
              </th>
              <th style={{ width: "35%", overflow: "auto" }} scope="col">
                Action
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
      </div>
    </div>
  );
};

export default QuizDashboard;
