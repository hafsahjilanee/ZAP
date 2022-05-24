import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import "./TeacherDashboard.css";

const StudentDashboard = () => {
  const nav = useNavigate();
  const [courses, setCourses] = useState({
    course: [
      {
        class_code: "",
        name: "",
        term: "",
      },
    ],
  });

  // useEffect(() => {
  //   loadCourses();
  // }, []);

  const viewCoursePage = async (id) => {
    nav("/StudentDashboard/StudentCoursePage/");
  };

  //const {id} = useParams();

  // const loadCourses = async () => {
  //   const id = JSON.parse(localStorage.getItem("user")).id;
  //   console.log(id);
  //   const result = await axios({
  //     method: "get",
  //     headers: {
  //       Authorization: "Bearer " + localStorage.getItem("auth"),
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //     url: "http://localhost:4000/teacher/" + id,
  //   });
  //   console.log(result.data);
  //   setCourses(result.data);

  //   //setUser(result.data.reverse());
  // };

  return (
    <div className="bg">
      <div className="container-main">
        <br></br>
        <div
          className="container-list "
          style={{
            marginBottom: "100px",

            paddingTop: "400px",
          }}
        >
          <table class="table table-hover border shadow row">
            <tbody>
              {/* {courses.course.map((c) => ( */}
              <tr
                onClick={() => viewCoursePage()}
                style={{
                  marginBottom: "20px",
                  paddingBottom: "20px",
                }}
              >
                <td
                  style={{
                    paddingLeft: "70px",
                    paddingRight: "20px",
                    width: "300px",
                  }}
                >
                  {"Course Name"}
                </td>
                <td
                  style={{
                    paddingLeft: "8px",
                    paddingRight: "20px",
                    width: "maxContent",
                  }}
                >
                  {"0000"}
                </td>
                <td
                  style={{
                    paddingLeft: "5px",
                    paddingRight: "70px",
                    width: "maxContent",
                  }}
                >
                  {"Spring'22"}
                </td>
              </tr>
              {/*))}*/}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
