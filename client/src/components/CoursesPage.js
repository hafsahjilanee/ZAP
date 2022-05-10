import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import image from "./plus.png";
import Modal from "./Modal";
import "./TeacherPage.css";

const CoursesPage = () => {
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

  /*try {

        console.log(localStorage.getItem("auth"))

        /*fetch("http://localhost:4000/admin/admins", {
            method: 'get',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('auth'),
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then((result) => {
            result.json().then((resp) => {
                console.log(resp); 
            })
        })

    } catch (e) {
        console.log(e)
    }*/
  return (
    <div className="container-main">
      {" "}
      <Link
        className="btn btn-outline-secondary mb-4"
        to="/adminDashboard"
        style={{
          marginRight: "1100px",
          align: "left",
          fontStyle: "bold",
        }}
      >
        {"Back"}
      </Link>
      <br></br>
      <div className="container-list">
        <h1 className="mb-4">
          {" "}
          Courses
          <NavLink exact to="/adminDashboard/addCourse">
            <img
              data-toggle="tooltip"
              data-placement="bottom"
              title="Add a Course"
              className="img"
              src={image}
              alt="add"
              height="40"
              align="right"
              style={{ paddingRight: "3rem" }}
            ></img>{" "}
          </NavLink>{" "}
        </h1>{" "}
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
              <th style={{ width: "35%" }}> Action </th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{course.name}</td>
                <td>{course.term}</td>
                <td>{course.class_code}</td>
                <td>{course.active_status.toString()}</td>

                <td>
                  <button
                    className="btn btn-outline-secondary me-2"
                    onClick={() => viewCourse(course.id)}
                  >
                    View
                  </button>
                  <button
                    className="btn btn-outline-primary me-2"
                    onClick={() => editCourse(course.id)}
                  >
                    Edit{" "}
                  </button>
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => deleteCourse(course.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            x
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CoursesPage;
