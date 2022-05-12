import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import "./TeacherPage.css";

const TeacherDashboard = () => {
  const nav = useNavigate();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    loadCourses();
  }, []);

  const viewCourse = async (id) => {
    nav("/adminDashboard/viewCourse/" + id);
  };

  const editCourse = async (id) => {
    nav("/adminDashboard/editCourse/" + id);
  };

  const deleteCourse = async (id) => {
    await axios.delete(
      "http://localhost:4000/admin/" + id,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("auth"),
        },
      },
      {
        data: { id: id },
      }
    );
    loadCourses();
  };

  const viewCoursePage = async (id) => {
    nav("/TeacherDashboard/T_CoursePage/");
  };

  const loadCourses = async () => {
    const result = await axios({
      method: "get",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("auth"),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      url: "http://localhost:4000/courses/allCourses",
    });
    console.log(result.data);
    setCourses(result.data);

    //setUser(result.data.reverse());
  };

  return (
    <div
      className="container-main"
      style={{
        marginBottom: "100px",
      }}
    >
      <br></br>
      <div className="container-list">
        <table class="table table-hover border shadow">
          <thead>
            <tr>
              <th style={{ width: "5%", overflow: "auto" }} scope="col">
                #
              </th>
              <th style={{ width: "10%", overflow: "auto" }} scope="col">
                Name
              </th>
              <th style={{ width: "8%", overflow: "auto" }} scope="col">
                term
              </th>
              <th style={{ width: "10%", overflow: "auto" }} scope="col">
                class_code
              </th>
              <th style={{ width: "10%", overflow: "auto" }} scope="col">
                active_status
              </th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => (
              <tr onClick={() => viewCoursePage()}>
                <th scope="row">{index + 1}</th>
                <td>{course.name}</td>
                <td>{course.term}</td>
                <td>{course.class_code}</td>
                <td>{course.active_status.toString()}</td>
              </tr>
            ))}
            x
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeacherDashboard;
