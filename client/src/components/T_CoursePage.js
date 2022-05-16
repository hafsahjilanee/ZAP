import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import image from "./exam.png";
import image1 from "./Student.png";
import "./AdminDashboard.css";

const T_CoursePage = () => {
  const [Course, setCourse] = useState({
    name: "",
    term: "",
    active_status: "",
    class_code: "",
  });

  const id = useParams();

  const loadStudents = async () => {
    const id = JSON.parse(localStorage.getItem('user')).id;
    console.log(id);
    const result = await axios({
      method: "get",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("auth"),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      url: "http://localhost:4000/courses/" + id.id,
    });

    console.log(result.data);
    setCourse(result.data);

    //setUser(result.data.reverse());
  };

  useEffect(() => {
    loadCourses();
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
          {/* course name from api */}
          {Course.name}
        </h1>{" "}
        <div className="gallery">
          <NavLink className="container2" exact to="/QuizDashboard">
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
            to="/TeacherDashboard/T_StudentPage"
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

export default T_CoursePage;
