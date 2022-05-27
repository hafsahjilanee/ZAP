import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "./AddTeacher.css";

const StudentViewExam = () => {
  //const nav = useNavigate();

  //   const [exams, setExams] = useState([
  //     {
  //       exams: [
  //         {
  //           examName: "",
  //           end_exam_date: "",
  //           totalMarks: "",
  //         },
  //       ],
  //     },
  //   ]);
  //   const [Course, setCourse] = useState({
  //     name: "",
  //     term: "",
  //     class_code: "",
  //   });

  //   useEffect(() => {
  //     loadExamDetails();
  //   }, []);

  //   const loadExamDetails = async () => {
  //     const result = await axios({
  //       method: "get",
  //       headers: {
  //         Authorization: "Bearer " + localStorage.getItem("auth"),
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       },
  //       url: "http://localhost:4000/exams/" + localStorage.getItem("courseID"),
  //     });
  //     console.log(result.data);
  //     setExams(result.data);
  //     //console.log(questions)
  //     //setUser(result.data.reverse());
  //   };

  //   const loadCourses = async () => {
  //     const result = await axios({
  //       method: "get",
  //       headers: {
  //         Authorization: "Bearer " + localStorage.getItem("auth"),
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       },
  //       url: "http://localhost:4000/courses/" + localStorage.getItem("courseID"),
  //     });

  //     console.log(result.data);
  //     setCourse(result.data);

  //     //setUser(result.data.reverse());
  //   };

  //   useEffect(() => {
  //     loadCourses();
  //   }, []);
  return (
    <div className="container-main py-4 ">
      <Link
        className="btn btn-outline-secondary mb-4"
        to="/StudentDashboard/StudentCoursePage/"
        style={{
          marginRight: "1100px",
          align: "left",
          fontStyle: "bold",
        }}
      >
        {"Back"}
      </Link>{" "}
      {/* <h2 className="text-center mb-4">{"Course.name"}</h2>{" "} */}
      <h3 className="text-center mb-4">{"Exam "}</h3>{" "}
      <div className="container-form">
        <div class="row mb-3" style={{ marginTop: "40px" }}>
          <label
            for="inputText3"
            className="col-sm-2 col-form-label "
            style={{ width: "140px", margin: "auto" }}
          >
            Open Date
          </label>

          <input
            type="text"
            class="form-control-lg"
            id="inputText3"
            name="Due on"
            value={"2022-05-18T09:52:00.000Z	"}
            readOnly
            style={{ width: "300px", margin: "auto" }}
          />
        </div>
        <div class="row mb-3">
          <label
            for="inputText3"
            className="col-sm-2 col-form-label "
            style={{ width: "140px", margin: "auto" }}
          >
            Due on
          </label>

          <input
            type="text"
            class="form-control-lg"
            id="inputText3"
            name="Due on"
            value={"2022-05-26T09:52:00.000Z"}
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
            name="Max Marks"
            value={"50"}
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
            Teacher Name
          </label>

          <input
            type="text"
            class="form-control-lg"
            id="inputText3"
            name="Teacher Name"
            value={"Sajjad Haider"}
            readOnly
            style={{ width: "300px", margin: "auto" }}
          />
        </div>

        <br />
      </div>
    </div>
  );
};

export default StudentViewExam;
