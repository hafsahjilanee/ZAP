import React, { useState, useEffect } from "react";
import axios from "axios";
import {Link, useNavigate, useParams } from "react-router-dom";

const EditTeacher = () => {
  let history = useNavigate();
  const { id } = useParams();
  const [teacher, setTeacher] = useState({
    firstName: "",
    lastname:"",
    user_id: "",
    
  });

  const { firstName, lastName, user_id} = teacher;
  const onInputChange = e => {
    setTeacher({ ...teacher, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadTeacher();
  }, []);

  const onSubmit = async e => {
    e.preventDefault();
    //await axios.put('http://localhost:4000/admin/'+id, student);
    console.log(id)
    await axios({
      method: 'put',
      data: teacher,
      headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('auth'),
          'Accept': 'application/json',
          'Content-Type': 'application/json',

      },
      url: 'http://localhost:4000/admin/' + id
  })        
            
    history("/adminDashboard");
  };

  const loadTeacher = async () => {
    const result =
            await axios({
                method: 'get',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('auth'),
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',

                },
                url: 'http://localhost:4000/admin/getById/' + id
            })        
        console.log(result.data)
        setTeacher(result.data)
  };
  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Edit Information of: {firstName} {lastName}</h2>
        <form onSubmit={e => onSubmit(e)}>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter first Name"
              name="firstName"
              value={firstName}
              onChange={e => onInputChange(e)}
            />
            <br></br>
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Last Name"
              name="lastName"
              value={lastName}
              onChange={e => onInputChange(e)}
            />
            <br></br>
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter User ID"
              name="user_id"
              value={user_id}
              onChange={e => onInputChange(e)}
            />
            <br></br>
          </div>

          
          <button className="btn btn-primary me-2 mb-2">Update Teacher</button>
          <Link className="btn btn-primary me-2 mb-2" to="/adminDashboard">
                Back to Dashboard
            </Link>
        </form>
      </div>
    </div>
  );
};

export default EditTeacher;