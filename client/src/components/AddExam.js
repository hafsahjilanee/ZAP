import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AddTeacher.css";

const AddExam = () => {
  let navigate = useNavigate();

  const [Exam, setExam] = useState({
    examName: "",
     start_exam_date: "",
     end_exam_date: "",
    totalMarks: "",
    // isReturn: "",
    // isOpen: "",
  });

  //console.log(localStorage.getItem("courseID"));

  const { examName, start_exam_date, end_exam_date, totalMarks/*, isReturn, isOpen*/ } = Exam;
  const onInputChange = (e) => {
    console.log(Exam.examName,Exam.start_exam_date, Exam.end_exam_date);
    setExam({ ...Exam, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    console.log(Exam.examName,Exam.start_exam_date, Exam.end_exam_date);
    e.preventDefault();

    const result = await axios({
      method: "post",
      data: Exam,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("auth"),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      url: "http://localhost:4000/exams/"+localStorage.getItem("courseID")
    });
    console.log(result.data);
    //setExams(result.data);
    navigate("/TeacherDashboard/ExamPage");
  };

  return (
    <div className="container-main">
      <div className=" container-form shadow  ">
        <h2 className=" mb-4">Add an Exam</h2>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control-lg "
              id="floatingInput"
              name="examName"
              placeholder="Enter Exam Name"
              value={examName}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group mb-3">
            <input
              type="text"
              className=" form-control-lg "
              //id="floatingInput"
              name="totalMarks"
              placeholder="Enter Max Marks"
              value={totalMarks}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group mb-3">
            <label
              //for="startTimePeriod"
              className="label"
              style={{ margin: "auto" }}
            >
              {"Choose a time to Open this exam:"}
            </label>
            <br></br>
            <input
              type="datetime-local"
              className=" form-control-lg"
              //id="Exam.startTimePeriod"
              name="start_exam_date"
              value={start_exam_date}
              min="2022-05-07T00:00"
              max="2023-05-14T00:00"
              onChange={(e) => onInputChange(e)}
            />
          </div>

          <div className="form-group mb-3">
            <label className="label" style={{ margin: "auto" }}>
              {" Choose a time to Close this exam: "}
            </label>

            <br></br>
            
            {/* <input
              type="datetime-local"
              className=" form-control-lg"
              //id="floatingInput"
              name="end_exam_date"
              value={end_exam_date}
              min="2022-05-07T00:00"
              max="2023-05-14T00:00"
              onClick={(e) => onInputChange(e)}
            /> */}
          </div>
          <button className="btn btn-primary btn-block me-2 mb-2">Add</button>
          <Link className="btn mb-2" to="/TeacherDashboard/ExamPage">
            Back
          </Link>
        </form>
      </div>
    </div>
  );
};

export default AddExam;
