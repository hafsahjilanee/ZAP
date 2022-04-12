import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import image from "./exam.png";
import image1 from "./Student.png";
import "./AdminDashboard.css";

const TeacherDashboard = () => {
  const [students, setStudent] = useState([]);

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    const result = await axios({
      method: "get",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("auth"),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      url: "http://localhost:4000/teacher/students",
    });

    console.log(result.data);
    setStudent(result.data);

    //setUser(result.data.reverse());
  };

  return (
    <div
      className="container-admin"
      style={{
        align: "center",
        justifyContent: "space-between",
        marginLeft: "37%",
        marginRight: "37%",
      }}
    >
      <div className="gallery">
        <NavLink className="container2" exact to="/QuizDashboard">
          <img className="image1" src={image} alt="exam" />
          <div class="middle">
            <div class="text">Exams</div>
          </div>
        </NavLink>
      </div>
      <div className="gallery">
        <NavLink className="container2" exact to="/QuizDashboard">
          <img className="image1" src={image1} alt="students" />
          <div class="middle">
            <div class="text">Students</div>
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default TeacherDashboard;
