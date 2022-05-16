import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink, Link } from "react-router-dom";
import image from "./plus.png";
import "./TeacherPage.css";

import { useNavigate } from "react-router-dom";

const TeacherStudentPage = () => {
  const nav = useNavigate();
  const [students, setStudent] = useState([]);

  useEffect(() => {
    loadStudents();
  }, []);

  const viewStudent = async (id) => {
    nav("/adminDashboard/viewStudent/" + id);
  };

  const editStudent = async (id) => {
    nav("/adminDashboard/editStudent/" + id);
  };

  const deleteStudent = async (id) => {
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
    <div
      className="container-main"
      style={{
        marginBottom: "100px",
      }}
    >
      {" "}
      <Link
        className="btn btn-outline-secondary mb-4"
        to="/TeacherDashboard"
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
          {"//Coursename:Students"}
          <NavLink exact to="/adminDashboard/addStudent">
            <img
              data-toggle="tooltip"
              data-placement="bottom"
              title="Add a Student"
              className="img"
              src={image}
              alt="add"
              height="40"
              align="right"
              style={{ paddingRight: "3rem" }}
            ></img>{" "}
          </NavLink>{" "}
        </h1>{" "}
        {/*Adding multiple students functionality*/}
        <div className="form-group mb-3 ">
          <input
            type="file"
            id="floatingInput"
            name="file"
            value={File}
          ></input>
        </div>
        <table class="table table-hover border shadow">
          <thead>
            <tr>
              <th style={{ width: "5%", overflow: "auto" }} scope="col">
                #
              </th>
              <th style={{ width: "10%", overflow: "auto" }} scope="col">
                First Name
              </th>
              <th style={{ width: "10%", overflow: "auto" }} scope="col">
                Last Name
              </th>
              <th style={{ width: "8%", overflow: "auto" }} scope="col">
                user ID
              </th>
              <th style={{ width: "35%" }}> Action </th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{student.firstName}</td>
                <td>{student.lastName}</td>
                <td>{student.user_id}</td>
                <td>
                  <button
                    className="btn btn-outline-secondary me-2"
                    onClick={() => viewStudent(student.id)}
                  >
                    View
                  </button>
                  <button
                    className="btn btn-outline-primary me-2"
                    onClick={() => editStudent(student.id)}
                  >
                    Edit{" "}
                  </button>
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => deleteStudent(student.user_id)}
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

export default TeacherStudentPage;
