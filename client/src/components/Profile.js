import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import spiderman from "./spiderman.jpg";
import { useNavigate } from "react-router-dom";
const Profile = () => {
  const nav = useNavigate();
  const [User, setUser] = useState({
    firstName: "",
    lastName: "",
    user_id: "",
    role: "",
  });
  const id = useParams();

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user);

    const result = await axios({
      method: "get",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("auth"),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      url: "http://localhost:4000/admin/getById/" + user.id,
    });
    console.log(result.data);
    setUser(result.data);
  };

  return (
    <div className="container py-4 ">
      {/* <img src ={spiderman} alt='spidermna' width={200} height={200}></img> */}
      <h2 className="text-center mb-4">
        {User.firstName} {User.lastName}
      </h2>{" "}
      <div className="container-form shadow">
        <div class="row mb-3 ">
          <label
            for="inputText3"
            class="col-sm-2 col-form-label"
            style={{ width: "120px", margin: "auto" }}
          >
            First Name
          </label>

          <input
            type="text"
            class="form-control-lg"
            id="inputText3"
            name="firstname"
            value={User.firstName}
            readOnly
            style={{ width: "300px", margin: "auto" }}
          />
        </div>

        <div class="row mb-3">
          <label
            for="inputText3"
            class="col-sm-2 col-form-label"
            style={{ width: "120px", margin: "auto" }}
          >
            Last Name
          </label>

          <input
            type="text"
            class="form-control-lg"
            id="inputText3"
            name="lastname"
            value={User.lastName}
            readOnly
            style={{ width: "300px", margin: "auto" }}
          />
        </div>

        <div class="row mb-3">
          <label
            for="inputText3"
            class="col-sm-2 col-form-label"
            style={{ width: "120px", margin: "auto" }}
          >
            User ID
          </label>

          <input
            type="text"
            class="form-control-lg"
            id="inputText3"
            name="user ID"
            value={User.user_id}
            readOnly
            style={{ width: "300px", margin: "auto" }}
          />
        </div>

        <div class="row mb-3 ">
          <label
            for="inputText3"
            class="col-sm-2 col-form-label"
            style={{ width: "110px", margin: "auto" }}
          >
            Role
          </label>
          <input
            type="text"
            class="form-control-lg"
            id="inputText3"
            name="User Role"
            value={User.role}
            readOnly
            style={{ width: "300px", margin: "auto" }}
          />
        </div>
      </div>
      <br />
      <button
        className="btn btn-primary"
        onClick={() => nav(-1)}
        style={{ color: "white" }}
      >
        Back
      </button>
    </div>
  );
};

export default Profile;
