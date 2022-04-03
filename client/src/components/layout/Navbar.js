import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import image from "../logo.png";
import "./Navbar.css";

const Navbar = () => {
  const history = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("user");

  var help = false;
  var help2 = false;

  if (user) {
    if (user.role === "admin") {
      help = true;
    }
  }
  if (user) {
    if (user.role === "teacher") {
      help2 = true;
    }
  }

  const logout = () => {
    history("/");
    localStorage.clear();
  };
  return (
    <nav className=" bg-new variant-light">
      <div className="container-new">
        <NavLink className="navbar-brand-new " exact to="/">
          <img
            src={image}
            alt="logo"
            display="block"
            height={100}
            width={100}
          />
        </NavLink>
        <div className="container-new">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse">
            {help && <h4 className="text-white"> Admin Dashboard</h4>}
            {help2 && <h4 className="text-white"> Teacher Dashboard</h4>}
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item"></li>
              <li className="nav-item">
                {help && (
                  <NavLink
                    className="nav-link"
                    aria-current="page"
                    exact
                    to="/adminDashboard/addTeacher"
                  >
                    {" "}
                    Add Teacher
                  </NavLink>
                )}
              </li>
              <li className="nav-item">
                {help && (
                  <NavLink
                    className="nav-link"
                    aria-current="page"
                    exact
                    to="/adminDashboard/addStudent"
                  >
                    {" "}
                    Add Student
                  </NavLink>
                )}

                {/*  {user ? user.role==='admin'&&
                            <NavLink className="nav-link" aria-current="page" exact to="/adminDashboard/addTeacher"> Add Teacher</NavLink>:
                                <></>
                            }*/}
              </li>
              <li className="nav-item">
                {!token && (
                  <NavLink
                    className="nav-link"
                    aria-current="page"
                    exact
                    to="/"
                  >
                    {" "}
                    Login
                  </NavLink>
                )}
              </li>

              <li className="nav-item">
                {token && (
                  <NavLink className="nav-link" exact to="/profilePage">
                    {" "}
                    Profile Page
                  </NavLink>
                )}
              </li>

              {/* <li className="nav-item">
                <NavLink className="nav-link" exact to="/about">
                  About
                </NavLink>
              </li> */}

              <li className="nav-item">
                {token && (
                  <button
                    className="btn btn-primary btn-block"
                    onClick={logout}
                  >
                    Logout
                  </button>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
