import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";
import image from "./teacher.png";
import image1 from "./Student.png";
import image2 from "./Courses.png";
const AdminDashboard = () => {
  const nav = useNavigate();
  const [teachers, setTeacher] = useState([]);
  const [students, setStudent] = useState([]);

  useEffect(() => {
    loadTeachers();
    loadStudents();
  }, []);

  const viewTeacher = async (id) => {
    nav("/adminDashboard/viewTeacher/" + id);
  };
  const viewStudent = async (id) => {
    nav("/adminDashboard/viewStudent/" + id);
  };

  const editTeacher = async (id) => {
    nav("/adminDashboard/editTeacher/" + id);
  };

  const editStudent = async (id) => {
    nav("/adminDashboard/editStudent/" + id);
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
    <div className="bg" style={{ marginTop: "1px", paddingTop: "1px" }}>
      <div className="container-admin " style={{ marginTop: "200px" }}>
        <div className="gallery ">
          <NavLink
            className="container2  "
            exact
            to="/adminDashboard/TeacherPage"
          >
            <img className="image1" src={image} alt="teacher" />
            <div className="middle">
              <div className="text">Teachers</div>
            </div>
          </NavLink>
        </div>
        <div className="gallery">
          <NavLink
            className="container2"
            exact
            to="/adminDashboard/studentPage"
          >
            <img className="image1" src={image1} alt="students" />
            <div className="middle">
              <div className="text">Students</div>
            </div>
          </NavLink>
        </div>
        <div className="gallery">
          <NavLink
            className="container2"
            exact
            to="/adminDashboard/CoursesPage"
          >
            <img className="image1" src={image2} alt="courses" />
            <div className="middle">
              <div className="text">Courses</div>
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
