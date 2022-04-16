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
    <nav class="navbar navbar-expand-lg  bg-new">
      {/* <a class="navbar-brand" href="./"> */}
      <a class="navbar-brand" href="../">
        <img
          src={image}
          alt="logo"
          display="block"
          style={{ height: "100px", marginLeft: "20px", marginTop: "10px" }}
        />{" "}
      </a>

      <div className=" collapse navbar-collapse" id="navbarSupportedContent">
        {roleadmin && <h4 className="text-white"> Admin Dashboard</h4>}
        {roleteacher && <h4 className="text-white"> Teacher Dashboard</h4>}
        {rolestudent && <h4 className="text-white"> Student Dashboard</h4>}

        <ul class="navbar-nav mr-auto" style={{ align: "left" }}>
          <li className="nav-item active">
            {token && (
              <a class="nav-link" href="/profilePage">
                {" "}
                Profile
              </a>
            )}
          </li>

          <li className="nav-item active">
            {token && (
              <button className="btn btn-primary btn-block" onClick={logout}>
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
