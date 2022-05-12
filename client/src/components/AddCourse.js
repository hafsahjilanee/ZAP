import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DropdownButton, Dropdown, ButtonGroup } from "react-bootstrap";
import "./AddTeacher.css";
import TeacherDashboard from "./TeacherDashboard";

const AddCourse = () => {
  let navigate = useNavigate();
  const [Course, setCourse] = useState({
    name: "",
    term: "",
    active_status: "",
    class_code: "",
  });

  const { name, term, active_status, class_code } = Course;
  const onInputChange = (e) => {
    setCourse({ ...Course, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    //await axios.put('http://localhost:4000/admin/'+id, student);
    // console.log(id);
    await axios({
      method: "put",
      data: Course,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("auth"),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      url: " http://localhost:4000/courses/6268eeec55b70352f4e6f276",
    });

    return (
      <div className="container-main">
        <div className=" container-form shadow  ">
          <h2 className=" mb-4">Add a Course</h2>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="form-group mb-3">
              <input
                type="text"
                className="form-control-lg "
                id="floatingInput"
                name="name"
                placeholder="Enter Course Name"
                value={name}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className="form-group mb-3">
              <input
                type="text"
                className=" form-control-lg "
                id="floatingInput"
                name="class_code"
                placeholder="Enter Course ID"
                value={class_code}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="form-group mb-3">
              <input
                type="text"
                className="form-control-lg"
                id="floatingInput"
                name="active status"
                placeholder="Active Status"
                value={active_status}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            {/* 
          <div className="form-group mb-3">
            <input
              type="text"
              className=" form-control-lg"
              id="floatingInput"
              name="term"
              placeholder="Enter Term"
              value={term}
              onChange={(e) => onInputChange(e)}
            />
          </div> 
          <div className="form-group mb-3">
            <label className="  ">
              {"Select Term :  "}
              <select
                value={term}
                onChange={(e) => onInputChange(e)}
                className="form-control-lg"
                style={{ width: "150px", margin: "auto", padding: "auto" }}
              >
                <option value="default"> </option>
                <option value="Spring'22">Spring'22</option>
                <option value="Fall'22">Fall'22</option>
                <option value="Spring'23">Spring'23</option>
              </select>
            </label>
          </div>
          {/* dropdown for term
          {["Select Term"].map((variant) => (
            <DropdownButton
              as={ButtonGroup}
              key={variant}
              id={`dropdown-variants-${variant}`}
              variant={variant.toLowerCase()}
              title={variant}
              className="form-control form-control-lg mb-2"
              style={{ justifyContent: "normal" }}
            >
              <Dropdown.Item eventKey="1">Spring'22</Dropdown.Item>
              <Dropdown.Item eventKey="2">Fall'22</Dropdown.Item>
              <Dropdown.Item eventKey="3">Spring'23</Dropdown.Item>
            </DropdownButton>
          ))} 

          {["Select Term"].map((variant) => (
            <DropdownButton
              as={ButtonGroup}
              key={variant}
              id={`dropdown-variants-${variant}`}
              variant={variant.toLowerCase()}
              title={variant}
              className="form-control form-control-lg mb-2"
              style={{ justifyContent: "normal" }}
            >
              <Dropdown.Item eventKey="1">Spring'22</Dropdown.Item>
              <Dropdown.Item eventKey="2">Fall'22</Dropdown.Item>
              <Dropdown.Item eventKey="3">Spring'23</Dropdown.Item>
            </DropdownButton>
          ))} 
          {["Select Teacher"].map((variant) => (
            <DropdownButton
              as={ButtonGroup}
              key={variant}
              id={`dropdown-variants-${variant}`}
              variant={variant.toLowerCase()}
              title={variant}
              className="form-control form-control-lg mb-2"
              style={{ justifyContent: "normal" }}
            >
              <Dropdown.Item eventKey="1">Teacher One</Dropdown.Item>
              <Dropdown.Item eventKey="2">Teacher Two</Dropdown.Item>
              <Dropdown.Item eventKey="3">Teacher Three</Dropdown.Item>
            </DropdownButton>
          ))}*/}

            <button className="btn btn-primary btn-block me-2 mb-2">Add</button>

            <Link className="btn mb-2" to="/AdminDashboard/CoursesPage">
              Back
            </Link>
          </form>
        </div>
      </div>
    );
  };
};
export default AddCourse;
