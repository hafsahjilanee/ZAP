import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import image from "./exam.png";
import image1 from "./Student.png";
import "./AdminDashboard.css";

const TeacherCoursePage = () => {
  const [Course, setCourse] = useState({
    name: "",
    term: "",
    active_status: "",
    class_code: "",
  });

  const [Teacher, setTeacher] = useState({
    teacher_id: {
      firstName: "",
      lastName: "",
    },
  });
  const id = useParams();

  const loadCourses = async () => {
    const id = JSON.parse(localStorage.getItem("user")).id;
    console.log(id);
    const result = await axios({
      method: "get",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("auth"),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      url: "http://localhost:4000/courses/" + id,
    });

    console.log(result.data);
    setCourse(result.data);

    //setUser(result.data.reverse());
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const loadTeacher = async () => {
    //console.log(id.id);
    const result = await axios({
      data: Teacher,
      method: "get",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("auth"),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      url: "http://localhost:4000/teacher/" + id,
    });
    console.log(result.data);
    setTeacher(result.data);
  };
  useEffect(() => {
    loadTeacher();
  }, []);

  return (
    <div className="bg" style={{ paddingTop: "100px" }}>
      <Link
        className="btn btn-outline-secondary"
        to="/TeacherDashboard"
        style={{
          marginRight: "1100px",
          align: "left",
          fontStyle: "bold",
        }}
      >
        {"Back"}
      </Link>

      <div
        className="container-admin "
        style={{
          align: "center",
          justifyContent: "space-between",
          marginLeft: "37%",
          marginRight: "37%",
        }}
      >
        <h1 className="mb-2">
          {Teacher.teacher_id.firstName}
          {Teacher.teacher_id.lastName} {Course.name}
        </h1>{" "}
        <div className="gallery">
          <NavLink
            className="container2"
            exact
            to="/TeacherDashboard/ExamPage/"
          >
            <img className="image1" src={image} alt="exam" />
            <div class="middle">
              <div class="text">Exams</div>
            </div>
          </NavLink>
        </div>
        <div className="gallery">
          <NavLink
            className="container2"
            exact
            to="/TeacherDashboard/TeacherStudentPage"
          >
            <img className="image1" src={image1} alt="students" />
            <div class="middle">
              <div class="text">Students</div>
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default TeacherCoursePage;
