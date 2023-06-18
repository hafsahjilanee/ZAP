import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./TeacherPage.css";

const ViewQuestion = () => {
  let nav = useNavigate();
  const [question, setQuestion] = useState({
    description: "",
    alternatives: [
      {
        text: "",
        isCorrect: "",
      },
    ],
  });

  const { id } = useParams();

  useEffect(() => {
    loadQuestion();
  }, []);

  const loadQuestion = async () => {
    const result = await axios.get(
      "http://localhost:4000/question/" + id,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("auth"),
        },
      },
      {
        data: { id: id },
      }
    );
    console.log(id);
    setQuestion(result.data);
  };
  return (
    <div className="container-list">
      <Link
        className="btn  btn-primary btn-block me-2"
        to="/QuizDashboard"
        style={{ marginBottom: "20px", backgroundColor: "" }}
      >
        Back
      </Link>
      <h1 className="mb-4">Question: {question.description}</h1>{" "}
      <table class="table table-hover border shadow">
        <thead>
          <tr>
            <th style={{ width: "10%" }} scope="col">
              #
            </th>
            <th style={{ width: "45%" }} scope="col">
              Options
            </th>
            <th style={{ width: "45%" }} scope="col">
              Correct Option
            </th>
          </tr>
        </thead>
        <tbody>
          {question.alternatives.map((option, index) => (
            <tr>
              <th scope="row">{index + 1}</th>
              <td>{option.text}</td>
              <td>{option.isCorrect.toString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewQuestion;
