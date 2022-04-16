import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import image from "./plus.png";
import Modal from "./Modal";
import "./TeacherPage.css";

const TeacherPage = () => {
  const nav = useNavigate();
  const [teachers, setTeacher] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    loadTeachers();
  }, []);

  const viewTeacher = async (id) => {
    nav("/adminDashboard/viewTeacher/" + id);
  };

  const editTeacher = async (id) => {
    nav("/adminDashboard/editTeacher/" + id);
  };

  const loadTeachers = async () => {
    const result = await axios({
      method: "get",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("auth"),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      url: "http://localhost:4000/admin/getTeachers/",
    });
    console.log(result.data.data.users);
    setTeacher(result.data.data.users);

    //setUser(result.data.reverse());
  };
  const deleteTeacher = async (id) => {
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
    loadTeachers();
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
        <h1 className="mb-4">
          {" "}
          Teachers
          <NavLink exact to="/adminDashboard/AddTeacher">
            <img
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
              <th style={{ width: "5%" }} scope="col">
                #
              </th>
              <th style={{ width: "10%", overflow: "auto" }} scope="col">
                First Name
              </th>
              <th style={{ width: "10%", overflow: "auto" }} scope="col">
                Last Name
              </th>
              <th style={{ width: "8%", overflow: "auto" }} scope="col">
                User ID
              </th>
              <th style={{ width: "35%", overflow: "auto" }}> Action </th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{teacher.firstName}</td>
                <td>{teacher.lastName}</td>
                <td>{teacher.user_id}</td>
                <td>
                  <button
                    className="btn btn-outline-secondary me-2"
                    onClick={() => viewTeacher(teacher.id)}
                  >
                    View
                  </button>
                  <button
                    className="btn btn-outline-primary me-2"
                    onClick={() => editTeacher(teacher.id)}
                  >
                    Edit{" "}
                  </button>
                  <button
                    className="btn btn-outline-danger me-2"
                    onClick={() => deleteTeacher(teacher.user_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeacherPage;
