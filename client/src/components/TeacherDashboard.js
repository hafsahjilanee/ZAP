import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import "./TeacherDashboard.css";

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
    <div className="bg">
      <div
        className="container-main"
        style={{
          marginBottom: "100px",

          paddingTop: "400px",
        }}
      >
        <br></br>
        <div className="container-list ">
          <table class="table table-hover border shadow row">
            <tbody>
              {courses.map((course) => (
                <tr
                  onClick={() => viewCoursePage(course.id)}
                  style={{
                    marginBottom: "20px",
                    paddingBottom: "20px",
                  }}
                >
                  <td
                    style={{
                      paddingLeft: "70px",
                      paddingRight: "10px",
                      width: "maxContent",
                    }}
                  >
                    {course.name}
                  </td>
                  <td
                    style={{
                      paddingLeft: "8px",
                      paddingRight: "10px",
                      width: "maxContent",
                    }}
                  >
                    {course.class_code}
                  </td>
                  <td
                    style={{
                      paddingLeft: "5px",
                      paddingRight: "70px",
                      width: "maxContent",
                    }}
                  >
                    {course.term}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
