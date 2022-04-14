import React from "react";
import "./App.css";
import About from "./components/About";
import Login from "./components/Login";
import Navbar from "./components/layout/Navbar";
import Protected from "./components/Protected";
import TeacherProtected from "./components/TeacherProtected";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NotFound from "./components/NotFound";
import AdminDashboard from "./components/AdminDashboard";
import TeacherDashboard from "./components/TeacherDashboard";
import StudentDashboard from "./components/StudentDashboard";
import AddTeacher from "./components/AddTeacher";
import AddStudent from "./components/AddStudent";
import ViewTeacher from "./components/ViewTeacher";
import ViewStudent from "./components/ViewStudent";
import EditTeacher from "./components/EditTeacher";
import EditStudent from "./components/EditStudent";
import QuizDashboard from "./components/QuizDashboard";
import ViewQuestion from "./components/ViewQuestion";
import EditQuestion from "./components/EditQuestion";
import { AuthContext } from "./components/_helpers/AuthContext";
import AddQuestion from "./components/AddQuestion";
import TeacherPage from "./components/TeacherPage";
import StudentPage from "./components/StudentPage";
import Profile from "./components/Profile";
import { useState } from "react";

function App() {
  const [authState, setAuthState] = useState(false);
  return (
    <Router>
      <div className="App">
        <Navbar />
        <AuthContext.Provider value={{ authState, setAuthState }}>
          <Routes>
            <Route exact path="/about" element={<About />} />

            <Route exact path="/" element={<Login />} />
            <Route
              path="/adminDashboard"
              element={<Protected cmp={AdminDashboard}></Protected>}
            />
            <Route
              path="/teacherDashboard"
              element={
                <TeacherProtected cmp={TeacherDashboard}></TeacherProtected>
              }
            />
            <Route
              exact
              path="/studentDashboard"
              element={<StudentDashboard />}
            />
            <Route
              exact
              path="/adminDashboard/addTeacher"
              element={<AddTeacher />}
            />
            <Route
              exact
              path="/adminDashboard/addStudent"
              element={<AddStudent />}
            />
            <Route
              exact
              path="/adminDashboard/viewTeacher/:id"
              element={<ViewTeacher />}
            />
            <Route
              exact
              path="/adminDashboard/viewStudent/:id"
              element={<ViewStudent />}
            />
            <Route
              exact
              path="/adminDashboard/editTeacher/:id"
              element={<EditTeacher />}
            />
            <Route
              exact
              path="/adminDashboard/editStudent/:id"
              element={<EditStudent />}
            />
            <Route
              exact
              path="/adminDashboard/teacherPage"
              element={<TeacherPage />}
            />
            <Route
              exact
              path="/adminDashboard/studentPage"
              element={<StudentPage />}
            />
            <Route exact path="/QuizDashboard" element={<QuizDashboard />} />
            <Route
              exact
              path="/QuizDashboard/AddQuestion/"
              element={<AddQuestion />}
            />
            <Route
              exact
              path="/QuizDashboard/viewQuestion/:id"
              element={<ViewQuestion />}
            />
            <Route
              exact
              path="/QuizDashboard/EditQuestion/:id"
              element={<EditQuestion />}
            />
            <Route
              exact
              path="/profilePage"
              element={<Protected cmp={Profile}></Protected>}
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthContext.Provider>
      </div>
    </Router>
  );
}

export default App;
