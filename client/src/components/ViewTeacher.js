import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const ViewTeacher = () => {

    const [Teacher, setTeacher] = useState({
        firstName: "",
        lastName: "",
        user_id: "",
    });
    const id = useParams();
    
    useEffect(() => {
        loadTeacher();
    }, []);

    const loadTeacher = async () => {
        console.log(id.id)
        const result =
                await axios({
                    method: 'get',
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('auth'),
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
    
                    },
                    url: 'http://localhost:4000/admin/getById/' + id.id
                })        
            console.log(result.data)
            setTeacher(result.data)
      };


    return (
        <div className="container py-4 ">

            <h1 className="display-4">Teacher Name: {Teacher.firstName} {Teacher.lastName}</h1>
            <hr />
            <ul className="list-group w-50 ">
                <div class="row mb-3">
                    <label for="inputText3" class="col-sm-2 col-form-label">First Name</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="inputText3" name="firstname" value={Teacher.firstName} readOnly />
                    </div>
                </div>
                <div class="row mb-3">
                    <label for="inputText3" class="col-sm-2 col-form-label">Last Name</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="inputText3" name="lastname" value={Teacher.lastName} readOnly />
                    </div>
                </div><div class="row mb-3">
                    <label for="inputText3" class="col-sm-2 col-form-label">User ID</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="inputText3" name="user ID" value={Teacher.user_id} readOnly />
                    </div>
                </div>
                <div class="row mb-3">
                
                </div>
            </ul>
            <br />
            <Link className="btn btn-primary" to="/adminDashboard">
                Back to Dashboard
            </Link>
        </div>
    );
}

export default ViewTeacher;