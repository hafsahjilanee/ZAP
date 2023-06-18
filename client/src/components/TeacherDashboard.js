import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import "./TeacherDashboard.css";

const TeacherDashboard = () => {
  const nav = useNavigate();
  const [courses, setCourses] = useState({
    course: [
      {
        class_code: "",
        name: "",
        term: "",
        _id: "",
      },
    ],
  });

  const [Teacher, setTeacher] = useState({
    teacher_id: {
      firstname: "",
      lastname: "",
    },
  });

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
    localStorage.setItem("courseID", id);
    console.log(localStorage.getItem("courseID"));
    nav("/TeacherDashboard/TeacherCoursePage");
  };

  //const {id} = useParams();

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
      url: "http://localhost:4000/teacher/" + id,
    });
    console.log(result.data);
    setCourses(result.data);

    //setUser(result.data.reverse());
  };
  const loadTeacher = async () => {
    const id = JSON.parse(localStorage.getItem("user")).id;
    console.log(id);
    //console.log(id);
    //localStorage.setItem("courseID", id);
    //console.log(localStorage.getItem("courseID"));
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
    //localStorage.setItem("teacher", JSON.stringify(result.data));
    //console.log(JSON.parse(localStorage.getItem('teacher')).course._id)
    console.log(result.data);
    setTeacher(result.data);
  };
  useEffect(() => {
    loadTeacher();
  }, []);

  return (
    <div className="bg">
      {" "}
      <div
        className="container-main"
        style={{
          marginBottom: "100px",

          paddingTop: "400px",
        }}
      >
        {" "}
        <br></br> <br></br> <br></br>{" "}
        <h1 className="mb-2">
          {Teacher.teacher_id.firstName} {Teacher.teacher_id.lastName}
        </h1>{" "}
        <div className="container-list ">
          {" "}
          <table class="table table-hover border shadow row">
            <tbody>
              {courses.course.map((c) => (
                <tr
                  onClick={() => viewCoursePage(c._id)}
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
                    {c.name}
                  </td>
                  <td
                    style={{
                      paddingLeft: "8px",
                      paddingRight: "10px",
                      width: "maxContent",
                    }}
                  >
                    {c.class_code}
                  </td>
                  <td
                    style={{
                      paddingLeft: "5px",
                      paddingRight: "70px",
                      width: "maxContent",
                    }}
                  >
                    {c.term}
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
