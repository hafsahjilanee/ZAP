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
    student: [
      {
        user_id: "",
      },
    ],
    teacher_id: "",
  });
  const addStudent = (e) => {
    let temp = { ...Course };
    temp.student.push({
      user_id: "",
    });
    setCourse(temp);
  };

  // const { name, term, active_status, class_code } = Course;
  const onInputChange = (e) => {
    setCourse({ ...Course, [e.target.name]: e.target.value });
  };
  const onInput1 = (e) => {
    //setCourse({ ...Course, [e.target.name]: true });
    let temp = { ...Course };
    temp.active_status = true;
    setCourse(temp);
  };
  const onInput2 = (e) => {
    //setCourse({ ...Course, [e.target.name]: false });
    let temp = { ...Course };
    temp.active_status = false;
    setCourse(temp);
  };

  const handleChange = (e, i) => {
    let temp = { ...Course };
    temp.student[i][e.target.name] = e.target.value;
    setCourse(temp);
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
          </div>
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
              onClick={(e) => onInput1(e)}
            >
              true
            </button>
            <button
              type="button"
              className=" btntrue1 mb-3"
              id="floatingInput"
              name="active status"
              value={(Course.active_status = false)}
              onClick={(e) => onInput2(e)}
            >
              false
            </button>
          </div>
          <div className="form-group mb-3">
            <input
              type="text"
              className=" form-control-lg"
              id="floatingInput"
              name="term"
              placeholder="Enter Teacher ID"
              value={Course.teacher_id}
              onChange={(e) => onInputChange(e)}
            />
          </div>

          <h2 className="mb-4">Enrolled Students</h2>
          {Course.student.map((student, i) => (
            <div style={{ padding: "5px", alignItems: "center" }}>
              <div style={{ alignItems: "flex-start" }}>
                <span style={{ fontSize: "18px" }}>
                  <b> {i + 1} </b>
                </span>

                <input
                  variant="outlined"
                  name="text"
                  placeholder="Enter Student ID"
                  className="form-control-lg "
                  style={{
                    width: "300px",
                    marginLeft: "10px",
                  }}
                  onChange={(e) => handleChange(e, i)}
                  value={Course.student[i].user_id}
                />
              </div>
            </div>
          ))}
          <div>
            <button
              variant="contained"
              className="btn btn-outline-secondary me-2 "
              style={{
                height: "40px",
                borderRadius: "5px ",
                marginBottom: "50px",
              }}
              onClick={(e) => addStudent(e, Map.i)}
            >
              Add Student
            </button>
          </div>
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
