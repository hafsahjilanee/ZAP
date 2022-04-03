import React, { useEffect, useState } from 'react'
import axios from 'axios';

const StudentDashboard = () => {
    return (
        <div className="container">
            <div className='py-4'>
                <h1> Teacher Dashboard</h1>
                <table class="table border shadow">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">username</th>
                            <th> Action </th>
                        </tr>
                    </thead>
                    <tbody>
                        
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StudentDashboard;