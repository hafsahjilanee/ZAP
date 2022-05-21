import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AddTeacher.css";

const AddCourse = () => {
  let navigate = useNavigate();
  const [Course, setCourse] = useState({
    name: "",
    term: "",
    active_status: "",
    class_code: "",
  });

  // const { name, term, active_status, class_code } = Course;
  const onInputChange = (e) => {
    setCourse({ ...Course, [e.target.name]: e.target.value });
  };
  const onInputChange1 = (e) => {
    setCourse({ ...Course, [e.target.name]: true });
  };
  const onInputChange2 = (e) => {
    setCourse({ ...Course, [e.target.name]: false });
  };

  const onChangeVal = (e) => {
    //target.checked === e.active_status
  };
  console.log(Course.name, Course.active_status, Course.term);
  const onSubmit = async (e) => {
    e.preventDefault();

    await axios({
      method: "post",
      data: Course,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("auth"),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      url: " http://localhost:4000/courses/createCourse",
    });
    navigate("/AdminDashboard/CoursesPage");
  };

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
              value={Course.name}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group mb-3">
            <input
              type="text"
              className=" form-control-lg "
              id="floatingInput"
              name="class_code"
              placeholder="Enter Class Code"
              value={Course.class_code}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group mb-3">
            <input
              type="text"
              className=" form-control-lg"
              id="floatingInput"
              name="term"
              placeholder="Enter Term"
              value={Course.term}
              onChange={(e) => onInputChange(e)}
            />
          </div>{" "}
          <div className="form-group mb-3">
            <label className="label" style={{ width: "120px", margin: "auto" }}>
              {"Active: "}
            </label>
            <button
              type="button"
              className=" btntrue1 mb-3 "
              id="floatingInput"
              name="active status"
              value={(Course.active_status = true)}
              onClick={(e) => onInputChange1(e)}
            >
              true
            </button>
            <button
              type="button"
              className=" btntrue1 mb-3"
              id="floatingInput"
              name="active status"
              value={(Course.active_status = false)}
              onClick={(e) => onInputChange2(e)}
            >
              false
            </button>
          </div>
          {/* <div className="form-group mb-3">
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

export default AddCourse;
