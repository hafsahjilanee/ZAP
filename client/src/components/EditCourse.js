import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import TeacherDashboard from "./TeacherDashboard";

const EditCourse = () => {
  const { id } = useParams();
  let history = useNavigate();
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

  useEffect(() => {
    loadCourses();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    //await axios.put('http://localhost:4000/admin/'+id, student);
    console.log(id);
    await axios({
      method: "put",
      data: Course,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("auth"),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      url: " http://localhost:4000/courses/" + id,
    });

    history("/adminDashboard/CoursePage");
  };

  const loadCourses = async () => {
    const result = await axios({
      method: "get",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("auth"),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      url: "http://localhost:4000/courses/" + id,
    });
    console.log(result.data);
    setCourse(result.data);
  };
  return (
    <div className="container-main">
      <div className="container-form shadow ">
        <h2 className="text-center mb-4">{name}</h2>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="form-group mb-3">
            <input
              type="text"
              className=" form-control-lg mb-2"
              placeholder="Course Name"
              name="firstName"
              value={name}
              onChange={(e) => onInputChange(e)}
            />
            <br></br>
          </div>

          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control-lg mb-2"
              placeholder="Class code"
              name="class_code"
              value={class_code}
              onChange={(e) => onInputChange(e)}
            />
            <br></br>
          </div>

          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control-lg mb-2"
              placeholder="Active status"
              name="active_status"
              value={active_status}
              onChange={(e) => onInputChange(e)}
            />
            <br></br>
          </div>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control-lg mb-2"
              placeholder="Teacher user  ID"
              name="Teacher user ID"
              value={Course.name}
              onChange={(e) => onInputChange(e)}
            />
            <br></br>
          </div>

          <button
            className="btn btn-primary me-2 mb-2"
            to="/adminDashboard/EditCourse"
          >
            Update Course Details
          </button>
          <Link
            className="btn btn-outline-secondary me-2 mb-2"
            to="/adminDashboard/CoursesPage"
          >
            Back
          </Link>
        </form>
      </div>
    </div>
  );
};

export default EditCourse;
