import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const StudentPage = () => {
    const nav = useNavigate();
    const [students, setStudent] = useState([]);

    useEffect(() => {
        
        loadStudents();
    }, []);


    
    const viewStudent = async id => {
        nav('/adminDashboard/viewStudent/' + id)

    };

    

    const editStudent = async id => {
        nav('/adminDashboard/editStudent/' + id)
    };
    
    const deleteStudent = async id => {
        await axios.delete('http://localhost:4000/admin/' + id, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('auth')
            }
        }, {
            data: { id: id }
        });
        loadStudents();
    };

    const loadStudents = async () => {
        const result =
            await axios({
                method: 'get',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('auth'),
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',

                },
                url: "http://localhost:4000/admin/getStudents"
            })
        console.log(result.data.data.users)
        setStudent(result.data.data.users)

        //setUser(result.data.reverse());
    };

    /*try {

        console.log(localStorage.getItem("auth"))

        /*fetch("http://localhost:4000/admin/admins", {
            method: 'get',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('auth'),
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then((result) => {
            result.json().then((resp) => {
                console.log(resp); 
            })
        })

    } catch (e) {
        console.log(e)
    }*/
    return (

        <div className="container"> <br></br>

            <Link className="btn btn-primary btn-block me-2" to='/adminDashboard/addStudent'>Add Student</Link>
            
                <div className='py-4'>
                    <h1> Students</h1>
                    <table class="table table-hover border shadow">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">First Name</th>
                                <th scope="col">Last Name</th>
                                <th scope="col">user ID</th>
                                <th> Action </th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student, index) => (
                                <tr>
                                    <th scope="row">{index + 1}</th>
                                    <td>{student.firstName}</td>
                                    <td>{student.lastName}</td>
                                    <td>{student.user_id}</td>
                                    <td>
                                        <button className="btn btn-outline-secondary me-2" onClick={() => viewStudent(student.id)} >View</button>
                                        <button className="btn btn-outline-primary me-2" onClick={() => editStudent(student.id)} >Edit </button>
                                        <button className="btn btn-outline-danger" onClick={() => deleteStudent(student.user_id)} >Delete</button>

                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
    );
};

export default StudentPage;