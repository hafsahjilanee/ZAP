import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "./AddTeacher.css";

const ViewTeacher = () => {
  const [Teacher, setTeacher] = useState({
    //firstName: "",
    //lastName: "",
    //user_id: "",
    phone_no:"",
    teacher_id:{
      firstName: "",
      lastName: "",
      user_id: "",
      role: "",
      email:""
    },
    course:[
      {
        class_code: "",
        name: "",
        term: "",
        active_status: ""
      }
    ]
  });

  const id = useParams();

  useEffect(() => {
    makeTeacher();
  }, []);

  useEffect(() => {
    loadTeacher();
  }, []);

  const makeTeacher = async () => {
    //console.log(id.id);
    const result = await axios({
      method: "get",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("auth"),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      url: "http://localhost:4000/teacher/addinfo/" + id.id,
    });
    //console.log(result.data);
    
  };

  const loadTeacher = async () => {
    //console.log(id.id);
    const result = await axios({
      method: "get",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("auth"),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      url: "http://localhost:4000/teacher/" + id.id,
    });
    console.log(result.data);
    setTeacher(result.data);
  };

  return (
    <div className="container-main py-4 ">
      <h2 className="text-center mb-4">
        {Teacher.teacher_id.firstName} {Teacher.teacher_id.lastName}
      </h2>{" "}
      <div className="container-form">
        
        <div class="row mb-3">
          <label
            for="inputText3"
            class="col-sm-2 col-form-label"
            style={{ width: "120px", margin: "auto" }}
          >
            User ID
          </label>

          <input
            type="text"
            class="form-control-lg"
            id="inputText3"
            name="user ID"
            value={Teacher.teacher_id.user_id}
            readOnly
            style={{ width: "300px", margin: "auto" }}
          />
        </div>

        <div class="row mb-3">
          <label
            for="inputText3"
            class="col-sm-2 col-form-label"
            style={{ width: "140px", margin: "auto" }}
          >
            Email Address
          </label>

          <input
            type="text"
            class="form-control-lg"
            id="inputText3"
            name="Email address"
            value={Teacher.teacher_id.email}
            readOnly
            style={{ width: "300px", margin: "auto" }}
          />
        </div>

        <div class="row mb-3">
          <label
            for="inputText3"
            class="col-sm-2 col-form-label"
            style={{ width: "150px", margin: "auto" }}
          >
            Contact Number
          </label>

          <input
            type="text"
            class="form-control-lg"
            id="inputText3"
            name="Contact Number"
            value={Teacher.phone_no}
            readOnly
            style={{ width: "300px", margin: "auto" }}
          />
        </div>
        <div class="row mb-3">
          <label
            for="inputText3"
            class="col-sm-2 col-form-label"
            style={{ width: "150px", margin: "auto" }}
          >
            Total courses taught
          </label>

          <input
            type="text"
            class="form-control-lg"
            id="inputText3"
            name="Contact Number"
            value={Teacher.course.length}
            readOnly
            style={{ width: "300px", margin: "auto" }}
          />
        </div>
       
        <table class="table table-hover border shadow">
          <thead>
            <tr>
              <th style={{ width: "5%" }} scope="col">
                #
              </th>
              <th style={{ width: "10%", overflow: "auto" }} scope="col">
                Class code
              </th>
              <th style={{ width: "10%", overflow: "auto" }} scope="col">
                Course Name
              </th>
              <th style={{ width: "10%", overflow: "auto" }} scope="col">
                Term
              </th>
              <th style={{ width: "10%", overflow: "auto" }} scope="col">
                Active Status
              </th>
            </tr>
          </thead>
          <tbody>
          {Teacher.course.map((c, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{c.class_code}</td>
              <td>{c.name}</td>
              <td>{c.term}</td>
              <td>{c.active_status.toString()}</td>
            </tr>
          ))}
          </tbody>
        </table>
        <br />
        <Link className="btn btn-primary" to="/adminDashboard/TeacherPage">
          Done
        </Link>
      </div>
    </div>
  );
};

export default ViewTeacher;
