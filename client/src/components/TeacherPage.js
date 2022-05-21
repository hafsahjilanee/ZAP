import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import image from "./plus.png";
import "./TeacherPage.css";
import Popup from "./Popup";
import "./popup.css";

const TeacherPage = () => {
  const nav = useNavigate();
  const [teachers, setTeacher] = useState([]);

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
    console.log(id);
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

  const [isOpen, setIsOpen] = useState(false);
  const [teacherID, setID] = useState("");
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className="bg"
      style={{
        marginTop: "50px",
        paddingTop: "100px",
        align: "center",
      }}
    >
      <div
        className="container-main"
        style={{
          marginBottom: "100px",
        }}
      >
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
        </Link>{" "}
        <br></br>
        <div className="container-list">
          <h1 className="mb-4">
            {" "}
            Teachers
            <NavLink to="/adminDashboard/AddTeacher">
              <img
                data-toggle="tooltip"
                data-placement="bottom"
                title="Add a Teacher"
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
                <tr key={teacher.id}>
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
                    <input
                      type="button"
                      value="Delete"
                      className="btn btn-outline-danger"
                      // onClick={() => deleteTeacher(teacher.id)}
                      onClick={() => {
                        setID(teacher.id);
                        togglePopup();
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
            {isOpen && (
              <Popup
                content={
                  <>
                    <b>Delete this teacher?</b>
                    <p>{teacherID.name}</p>{" "}
                    <button
                      className="btn"
                      onClick={() => deleteTeacher(teacherID)}
                    >
                      Yes
                    </button>
                  </>
                }
                handleClose={togglePopup}
              />
            )}
          </table>
        </div>{" "}
      </div>
    </div>
  );
};

export default TeacherPage;
