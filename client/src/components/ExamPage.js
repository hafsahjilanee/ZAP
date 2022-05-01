import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import image from "./plus.png";
import Modal from "./Modal";
import "./TeacherPage.css";

const ExamPage = () => {
  const nav = useNavigate();
  const [students, setStudent] = useState([]);

  useEffect(() => {
    loadStudents();
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
    loadStudents();
  };

  const loadStudents = async () => {
    const result = await axios({
      method: "get",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("auth"),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      url: "http://localhost:4000/admin/getStudents",
    });
    console.log(result.data.data.users);
    setStudent(result.data.data.users);

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
      <br></br>
      <div className="container-list">
        <h1 className="mb-4"> CourseName - Exams</h1>{" "}
        <table class="table table-hover border shadow">
          <thead>
            <tr>
              <th style={{ width: "5%", overflow: "auto" }} scope="col">
                #
              </th>
              <th style={{ width: "10%", overflow: "auto" }} scope="col">
                Title
              </th>
              <th style={{ width: "8%", overflow: "auto" }} scope="col">
                Due on
              </th>
              <th style={{ width: "10%", overflow: "auto" }} scope="col">
                Status
              </th>
              <th style={{ width: "10%", overflow: "auto" }} scope="col">
                Teacher
              </th>
              <th style={{ width: "35%" }}> Action </th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{student.firstName}</td>
                <td>{student.user_id}</td>
                <td>{student.lastName}</td>
                <td>{student.lastName}</td>

                <td>
                  <button
                    className="btn btn-outline-secondary me-2"
                    onClick={() => viewCourse(student.id)}
                  >
                    View
                  </button>
                  <button
                    className="btn btn-outline-primary me-2"
                    onClick={() => editCourse(student.id)}
                  >
                    Attempt
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

export default ExamPage;
