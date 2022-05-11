import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink, Link } from "react-router-dom";
import image from "./plus.png";
import "./TeacherPage.css";

const T_StudentDashboard = () => {
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
    <div
      className="container-main"
      style={{
        marginBottom: "100px",
      }}
    >
      {" "}
      <Link
        className="btn btn-outline-secondary mb-4"
        to="/TeacherDashboard"
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
        <h1 className="mb-4">
          {/* course name from api */}
          Course Name - Students
        </h1>{" "}
        <table class="table table-hover border shadow">
          <thead>
            <tr>
              <th style={{ width: "5%" }} scope="col">
                #
              </th>
              <th style={{ width: "20%", overflow: "auto" }} scope="col">
                Fist Name
              </th>
              <th style={{ width: "20%", overflow: "auto" }} scope="col">
                Last Name
              </th>
              <th style={{ width: "15%", overflow: "auto" }} scope="col">
                User ID
              </th>
              <th style={{ width: "35%", overflow: "auto" }} scope="col">
                Grades
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
                  <td
                    style={{
                      height: "min-content",
                      wrap: "soft",
                      width: "max-content",
                    }}
                  >
                    {question.description}
                  </td>
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
                    <Link class="btn btn-outline-secondary me-2">
                      View Grades
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default T_StudentDashboard;
