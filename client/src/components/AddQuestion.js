import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import image from "./minus1.png";
import { ButtonGroup } from "react-bootstrap";
//import { ToggleButtonGroup, ToggleButton } from "@mui/material";

// import { set } from "mongoose";

const AddQuestion = () => {
  let navigate = useNavigate();
  const [alignment, setAlignment] = React.useState("web");

  const handleChange = (e) => {
    setAlignment("yes");
  };

  const [question, setQuestion] = useState({
    description: "",
    marks: "",
    isSubjective: " ",
    alternatives: [
      {
        text: "",
        isCorrect: "",
      },
    ],
  });

  // const {
  //   description,
  //   marks,
  //   alternatives: { text, isCorrect },
  // } = question;
  //console.log(text);

  const onInputChange = (e) => {
    setQuestion({ ...question, [e.target.name]: e.target.value });
  };
  console.log(
    question.description,
    question.marks,
    question.alternatives,
    question.isSubjective
  );
  const addAlternative = (e) => {
    let temp = { ...question };
    temp.alternatives.push({
      text: "",
      isCorrect: "",
    });
    setQuestion(temp);
  };

  const deleteAlternative = (e, j) => {
    let temp = { ...question };
    temp.alternatives.splice(j, 1);
    setQuestion(temp);
  };

  const handleAlternativeChange = (e, i) => {
    let temp = { ...question };
    temp.alternatives[i][e.target.name] = e.target.value;
    setQuestion(temp);
  };
  // const onInput1 = (e, i) => {
  //   let temp = { ...question };
  //   temp.alternatives[i][e.target.name] = e.target.value;
  //   setQuestion(temp);
  //   setbg(e);
  // };
  // const onInput2 = (e, i) => {
  //   let temp = { ...question };
  //   temp.alternatives[i][e.target.name] = e.target.value;
  //   setQuestion(temp);
  // };
  const setSubjective = (e) => {
    let temp = { ...question };
    temp.isSubjective = e.target.value;
    setQuestion(temp);
  };
  // const [isOpen, setIsOpen] = useState(false);
  const setbg = (e) => {
    // setIsOpen(!isOpen);
    e.preventDefault();

    // e.isCorrect = true && (e.target.button.style.backgroundColor = "#b24c4c");
    // e.isCorrect = false && (e.target.button.style.backgroundColor = "#fff");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post(
      "http://localhost:4000/question/createQuestion/628cd2b689035b1e24ede219",
      question,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("auth"),
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    console.log(localStorage.getItem("examID"));
    navigate("/TeacherDashboard/ExamPage/");
  };
  console.log(localStorage.getItem("examID"));
  return (
    <div
      className="container"
      style={{ marginBottom: "200px", paddingBottom: "100px" }}
    >
      <div className="container-form w-75 " style={{ marginTop: "90px" }}>
        <h2 className="text-center mb-4" style={{ marginTop: "60px" }}>
          Add A Question
        </h2>
        <form onSubmit={(e) => onSubmit(e)}>
          <div>
            <input
              type="number"
              placeholder="Max Marks "
              className="form-control-lg "
              name="marks"
              value={question.marks}
              onChange={(e) => onInputChange(e)}
              style={{
                width: "15%",
                marginLeft: "540px",
                marginRight: "0px",
                align: "left",
              }}
            />
          </div>
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
          <div className="form-group">
            <label className="label"> Subjective:</label>
            <button
              type="button"
              className=" btntrue1 mb-3 "
              id="floatingInput"
              name="true"
              value={true}
              onClick={(e) => {
                onInputChange(e);
              }}
            >
              Yes
            </button>
            <button
              type="button"
              className=" btntrue1 mb-3"
              id="floatingInput"
              name="false"
              value={false}
              onClick={(e) => {
                setSubjective(e);
              }}
            >
              No
            </button>
          </div>
          <br />{" "}
          {question.alternatives.map((alternative, i) => (
            <div style={{ padding: "15px", alignItems: "center" }}>
              <div style={{ alignItems: "flex-start" }}>
                <span style={{ fontSize: "18px" }}>Option {i + 1}: </span>

                <input
                  name="text"
                  placeholder="Answer text"
                  className="form-control-lg"
                  style={{ width: "300px" }}
                  onChange={(e) => handleAlternativeChange(e, i)}
                  value={alternative.text}
                />

                <button
                  type="button"
                  className=" btntrue1 mb-3 "
                  id="floatingInput"
                  name="isCorrect"
                  value={true}
                  onClick={(e) => {
                    handleAlternativeChange(e, i);
                  }}
                >
                  true
                </button>
                <button
                  type="button"
                  className=" btntrue1 mb-3"
                  id="floatingInput"
                  name="isCorrect"
                  value={false}
                  onClick={(e) => {
                    handleAlternativeChange(e, i);
                  }}
                >
                  false
                </button>
                <button
                  name="delete"
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
            onClick={(e) => {
              addAlternative(e, Map.i);
            }}
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
              marginBottom: "100px",
            }}
          >
            Add Question
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddQuestion;
