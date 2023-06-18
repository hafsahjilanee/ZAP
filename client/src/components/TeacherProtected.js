import React, { Component } from 'react';
import {Navigate} from 'react-router-dom';

function TeacherProtected(props) {
    const Cmp = props.cmp
    var auth = (localStorage.getItem('auth'))
    console.warn(auth)

    return <div> {auth ? <Cmp/>:<Navigate to='/teacherLogin'/> }</div>
    
}

export default TeacherProtected;