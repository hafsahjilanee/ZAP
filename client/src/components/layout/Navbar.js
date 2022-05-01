import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import image from "../logo.png";
import "./Navbar.css";

const Navbar = () => {
  const history = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("user");

  var roleteacher = false;
  var roleadmin = false;
  var rolestudent = false;

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
  const logout = () => {
    history("/");
    localStorage.clear();
  };
  return (
    <nav class="navbar navbar-expand-lg  bg-new" style={{ overflow: "auto" }}>
      {/* <a class="navbar-brand" href="./"> */}
      <a class="navbar-brand" href="../">
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
        />{" "}
      </a>

      <div
        className=" collapse navbar-collapse"
        id="navbarSupportedContent"
        style={{
          marginLeft: "10%",
          justifyContent: "flex-end",
          marginRight: "123%",
        }}
      >
        {roleadmin && <h4 className="text-white"> Admin Dashboard</h4>}
        {roleteacher && <h4 className="text-white"> Teacher Dashboard</h4>}
        {rolestudent && <h4 className="text-white"> Student Dashboard</h4>}

        <ul class="navbar-nav mr-auto" style={{ marginLeft: "55%" }}>
          <li className="nav-item active">
            {token && (
              <a
                class="nav-link"
                href="/profilePage"
                style={{ color: "white", paddingTop: "28px" }}
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
                }}
              >
                Logout
              </button>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
