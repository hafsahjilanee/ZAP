import React, { useEffect, useState } from "react";
import axios from "axios";
import background from "./work-on-site.png";
import { Navbar } from "react-bootstrap";

const StudentDashboard = () => {
  return (
    <div
      className="container"
      style={{ marginTop: "0", backgroundImage: { background } }}
    >
      <img className="image1" src={background} alt="bg" marginTop="0" />
    </div>
  );
};

export default StudentDashboard;
