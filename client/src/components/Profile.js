import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import spiderman from './spiderman.jpg'
const Profile = () => {

    const [User, setUser] = useState({
        firstName: "",
        lastName: "",
        user_id: "",
        role:"",
    });
    const id = useParams();
    
    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        const user = JSON.parse(localStorage.getItem('user'))
        console.log(user)
        
        const result =
                await axios({
                    method: 'get',
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('auth'),
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
    
                    },
                    url: 'http://localhost:4000/admin/getById/' + user.id
                })        
            console.log(result.data)
            setUser(result.data)
      };


    return (
        <div className="container py-4 ">
            <div className="w-75 mx-auto shadow p-5">
            <img src ={spiderman} alt='spidermna' width={200} height={200}></img>
            <h1 className="display-4">{User.firstName} {User.lastName}</h1>
            <hr />
            <ul className="list-group w-50 mx-auto ">
                <div class="row mb-3 ">
                    <label for="inputText3" class="col-sm-2 col-form-label">First Name</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="inputText3" name="firstname" value={User.firstName} readOnly />
                    </div>
                </div>
                <div class="row mb-3">
                    <label for="inputText3" class="col-sm-2 col-form-label">Last Name</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="inputText3" name="lastname" value={User.lastName} readOnly />
                    </div>
                </div>
                <div class="row mb-3">
                    <label for="inputText3" class="col-sm-2 col-form-label">User ID</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="inputText3" name="user ID" value={User.user_id} readOnly />
                    </div>
                 
                </div>
                
                <div class="row mb-3 ">
                <label for="inputText3" class="col-sm-2 col-form-label">Role</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="inputText3" name="User Role" value={User.role} readOnly />
                    </div>
                </div>
                
            </ul>
            </div>
            <br />
            <Link className="btn btn-primary" to="/adminDashboard">
                Back to Dashboard
            </Link>
        </div>
    );
}

export default Profile;