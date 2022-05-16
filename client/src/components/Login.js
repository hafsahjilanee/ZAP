import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./_helpers/AuthContext";
import "./Login.css";
import Navbar from "./layout/Navbar";

function Login() {
  const [user_id, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [User, setUser] = useState([]);

  const { setAuthState } = useContext(AuthContext);
  let history = useNavigate();

  const login = () => {
    const user = { user_id: user_id, password: password };
    console.log(user);
    axios
      .post("http://localhost:4000/admin/login", user)
      .then((response) => {
        if (response.data.error) {
          alert("Login Failed!");
        } else {
          localStorage.setItem("auth", response.data.accessToken);
          localStorage.setItem("user", JSON.stringify(response.data));
          //console.log(localStorage.getItem('auth'))
          console.log(localStorage.getItem("user"));
          //console.log(JSON.parse(localStorage.getItem('user')).id);
          const id = JSON.parse(localStorage.getItem("user")).id;
          setAuthState(true);
          //alert("Login Successful!");
          if (response.data.role === "admin") {
            history("/adminDashboard");
          } else if (response.data.role === "teacher") {
            history(`/teacherDashboard/${id}`);
          } else if (response.data.role === "student") {
            history("/studentDashboard");
          }
        }
      })

      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          alert(error.response.data.message);
        }
      });
  };
  return (
    <div className="bg" style={{ paddingTop: "1px" }}>
      <div
        style={{
          marginTop: "50px",
          paddingTop: "100px",
          width: "200px",
          paddingRight: "650px",
          paddingLeft: "700px",
          align: "center",
        }}
      >
        <div
          className=" m-2 container-login  shadow p-5"
          style={{
            width: "max-content",
            align: "center",
          }}
        >
          <div className="py-4">
            <h1> Welcome to ZAP!</h1>
          </div>
          <div className="py-5">
            <input
              type="text"
              className="form-control-lg"
              placeholder="User ID"
              onChange={(event) => {
                setUsername(event.target.value);
              }}
            />
            <br />
            <br />
            <input
              type="password"
              className="form-control-lg"
              placeholder="Password"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            <br />
            <br />
            <button
              className=" button"
              onClick={login}
              style={{
                borderRadius: "8px",
                height: "fit-content",
                width: "fit-content",
              }}
            >
              {" "}
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
