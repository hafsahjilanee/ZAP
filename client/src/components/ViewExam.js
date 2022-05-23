import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "./AddTeacher.css";

const ViewExam = () => {
  //const nav = useNavigate();

  const [exams, setExams] = useState([
    {
      exams: [
        {
          _id: "",
          examName: "",
          startTimePeriod: "",
          endTimePeriod: "",
          totalMarks: "",
          questions: [{ description: "" }],
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
      url: "http://localhost:4000/exams/view/" + id,
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
      <h2 className="text-center mb-4">{Course.name}</h2>{" "}
      <h3 className="text-center mb-4">{exams.examName}</h3>{" "}
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
            value={exams.examName}
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
            name="exams.end_exam_date"
            value={exams.end_exam_date}
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
            value={exams.endTimePeriod}
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
            value={exams.totalMarks}
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
              {/* <th style={{ width: "10%", overflow: "auto" }} scope="col">
                Student ID
              </th>
              <th style={{ width: "10%", overflow: "auto" }} scope="col">
                Exam Status
              </th>
              <th style={{ width: "10%", overflow: "auto" }} scope="col">
                Marks Obtained
              </th>*/}
            </tr>
          </thead>
          {/*<tbody>
            {exams.questions.map((c, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{c.description}</td>
              </tr>
            ))}
          </tbody>*/}
        </table>
        <br />
      </div>
    </div>
  );
};

export default ViewExam;
