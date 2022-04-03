import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const TeacherDashboard = () => {
    const [students, setStudent] = useState([]);

    useEffect(() => {
        loadStudents();
      }, []);

      const loadStudents = async () => {
        
        const result =
            await axios({
                method: 'get',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('auth'),
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',

                },
                url: "http://localhost:4000/teacher/students"
            })
            
            
        console.log(result.data)
        setStudent(result.data)

        //setUser(result.data.reverse());
    };

    return (
        <div className="container">
          <br></br>
          <Link className="btn btn-outline-secondary me-2" to='/QuizDashboard'  >Quiz Tab</Link>
            
            </div>
       
    );
};

export default TeacherDashboard;