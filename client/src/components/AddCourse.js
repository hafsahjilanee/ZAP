import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DropdownButton, Dropdown, ButtonGroup } from "react-bootstrap";
import "./AddTeacher.css";

const AddCourse = () => {
  let navigate = useNavigate();
  const [Student, setStudent] = useState({
    firstName: "",
    lastName: "",
    role: "student",
    user_id: "",
    password: "",
  });

  const { firstName, lastName, role, user_id, password } = Student;
  const onInputChange = (e) => {
    setStudent({ ...Student, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:4000/admin/registerStudent", Student, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("auth"),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    navigate("/AdminDashboard/studentPage");
  };
  return (
    <div className="container-main">
      <div className=" container-form shadow  ">
        <h2 className=" mb-4">Add a Course</h2>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg mb-2"
              id="floatingInput"
              name="firstName"
              placeholder="Enter Course Name"
              value={firstName}
              onChange={(e) => onInputChange(e)}
            />
          </div>

          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg mb-2"
              id="floatingInput"
              name="lastName"
              placeholder="Enter Course ID"
              value={lastName}
              onChange={(e) => onInputChange(e)}
            />
          </div>

          {/*dropdown for term*/}
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

          {/*{["Select Term"].map((variant) => (
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
          ))} */}
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
          ))}

          <button className="btn btn-primary btn-block me-2 mb-2">Add</button>

          <Link className="btn mb-2" to="/AdminDashboard/CoursesPage">
            Back
          </Link>
        </form>
      </div>
    </div>
  );
};

export default AddCourse;
