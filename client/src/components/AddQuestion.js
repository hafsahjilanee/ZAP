import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import image from "./minus1.png";
import image1 from "./plus.png";
import { FormCheck } from "react-bootstrap";
// import { set } from "mongoose";

const AddQuestion = () => {
  let navigate = useNavigate();

  const [question, setQuestion] = useState({
    description: "",
    alternatives: [
      {
        text: "",
        isCorrect: "",
      },
    ],
  });

  //const {description, alternative: {text, isCorrect}} = question;
  //console.log(text);

  const onInputChange = (e) => {
    setQuestion({ ...question, [e.target.name]: e.target.value });
  };

  const addAlternative = (e) => {
    let temp = { ...question };
    temp.alternatives.push({
      text: "",
      isCorrect: "",
    });
    setQuestion(temp);
  };
  /*
    const deleteQuestion = (e, i) => {
      let temp = {...state}
      temp.branches.splice(i, 1)
      setState(temp)
    }
  */
  const deleteAlternative = (e, j) => {
    let temp = { ...question };
    temp.alternatives.splice(j, 1);
    setQuestion(temp);
  };

  const handleAlternativeChange = (e, i) => {
    let temp = { ...question };
    temp.alternatives[i][e.target.name] = e.target.value;
    setQuestion(temp);

    //  [e.target.name] = e.target.value;
    //  temp.alternatives[i][e.target.type] === "checkbox"
    //   ? temp.target.checked
    //   : (e.target.value = "true");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post(
      "http://localhost:4000/question/createQuestion",
      question,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("auth"),
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    navigate("/QuizDashboard");
  };

  return (
    <div
      className="container"
      style={{ marginBottom: "200px", paddingBottom: "100px" }}
    >
      <div className="container-form w-75 ">
        <h2 className="text-center mb-4">Add A Question</h2>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <textarea
              type="text"
              rows="5"
              cols="100"
              wrap="soft"
              placeholder="Enter Question Description "
              className="form-control-lg w-75"
              name="description"
              value={question.description}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <br />{" "}
          {question.alternatives.map((alternative, i) => (
            <div style={{ padding: "15px", alignItems: "center" }}>
              <div style={{ alignItems: "flex-start" }}>
                <span style={{ fontSize: "18px" }}>Option {i + 1}: </span>

                <input
                  variant="outlined"
                  name="text"
                  placeholder="Answer text"
                  className="form-control-lg"
                  style={{ width: "300px" }}
                  onChange={(e) => handleAlternativeChange(e, i)}
                  value={question.alternatives[i].text}
                />
                {/* <input
                  type={"checkbox"}
                  name="isCorrect"
                  // variant="outlined"
                  // placeholder="true/false?"
                  className="btn-primary "
                  style={{
                    width: "25px",
                    height: "25px",
                    marginLeft: "30px",
                    marginRight: "30px",
                  }}
                  value="true"
                  onChange={(e) => handleAlternativeChange(e, i)}
                  // checked={(isCorrect= "true")}
                /> */}
                {/* <button
                  variant="contained"
                  className="btn-primary "
                  style={{
                    marginLeft: "70px",
                    border: "none",
                    paddingBottom: "0px",
                    background: "none",
                  }}
                  //setQuestion.isCorrect("true")
                  value={question.alternatives[i].isCorrect}
                  onClick={(e) => handleAlternativeChange(e, i)}
                >
                  {" true"}
                </button> */}
                <button
                  variant="contained"
                  className="btn-primary "
                  style={{
                    marginLeft: "70px",
                    border: "none",
                    paddingBottom: "0px",
                    background: "none",
                  }}
                  onClick={(e) => deleteAlternative(e, i)}
                >
                  <img
                    classname="img"
                    src={image}
                    alt="add"
                    height="23px"
                    align="right"
                  ></img>
                </button>
              </div>
            </div>
          ))}
          <button
            variant="contained"
            className="btn btn-outline-secondary me-2 "
            style={{
              height: "40px",
              borderRadius: "5px ",
              marginBottom: "50px",
            }}
            onClick={(e) => addAlternative(e, Map.i)}
          >
            Add Option
          </button>
          <br />
          <button
            className="btn-primary"
            style={{
              height: "55px",
              width: "400px",
              fontSize: "23px",
              fontFamily: "Calibri",
              borderRadius: "5px ",
            }}
            //onClick={(e) => onSubmit}
          >
            Add Question
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddQuestion;
