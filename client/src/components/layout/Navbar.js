import React from "react";
import { Nav } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import image from "../logo.png";
import "./Navbar.css";

const Navbar = () => {
  const history = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("user");

  var roleteacher = false;
  var roleadmin = false;
  var rolestudent = false;
  var LoggedIn = true;

  if (user) {
    if (user.role === "admin") {
      roleadmin = true;
    }
  }
  if (user) {
    if (user.role === "teacher") {
      roleteacher = true;
    }
  }
  if (user) {
    if (user.role === "student") {
      rolestudent = true;
    }
  }
  const logonav = () => {
    rolestudent && history("/studentDashboard");
    roleteacher && history("/teacherDashboard");
    roleadmin && history("/adminDashboard");
  };
  const logout = () => {
    history("/");
    localStorage.clear();
    LoggedIn = false;
    roleteacher = false;
    roleadmin = false;
    rolestudent = false;
  };

  return (
    <React.StrictMode>
      <nav
        className="navbar navbar-expand-lg  bg-new"
        style={{ overflow: "auto" }}
      >
        <img
          src={image}
          alt="logo"
          display="block"
          style={{
            height: "100px",
            marginLeft: "200px",
            marginBottom: "1.5rem",
            borderRadius: "100px",
          }}
          onClick={logonav}
        />

        <div
          className=" collapse navbar-collapse"
          id="navbarSupportedContent"
          style={{
            marginLeft: "10%",
            justifyContent: "flex-end",
            marginRight: "12%",
          }}
        >
          {roleadmin && <h2 className="text-white"> Admin Dashboard</h2>}
          {roleteacher && <h2 className="text-white"> Teacher Dashboard</h2>}
          {rolestudent && <h2 className="text-white"> Student Dashboard</h2>}
          {!LoggedIn && <h2 className="text-white"> Login</h2>}

          <ul
            className="navbar-nav mr-auto"
            style={{ marginLeft: "55%", marginTop: "50px" }}
          >
            <li className="nav-item active">
              {token && (
                <a
                  className="nav-link"
                  href="/profilePage"
                  style={{
                    color: "white",
                    paddingTop: "10px",
                    paddingBottom: "30px",
                  }}
                >
                  {" "}
                  <h5> Profile</h5>
                </a>
              )}
            </li>

            <li className="nav-item active">
              {token && (
                <button
                  className="btn btn-primary btn-block shadow"
                  onClick={logout}
                  style={{
                    fontSize: "130%",
                    color: "white",
                    border: "none",
                  }}
                >
                  Logout
                </button>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </React.StrictMode>
  );
};

export default Navbar;
