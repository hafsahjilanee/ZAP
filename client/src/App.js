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
import AddCourse from "./components/AddCourse";
import ViewTeacher from "./components/ViewTeacher";
import ViewStudent from "./components/ViewStudent";
import ViewCourse from "./components/ViewCourse";
import EditTeacher from "./components/EditTeacher";
import EditStudent from "./components/EditStudent";
import EditCourse from "./components/EditCourse";
import QuizDashboard from "./components/QuizDashboard";
import ViewQuestion from "./components/ViewQuestion";
import EditQuestion from "./components/EditQuestion";
import { AuthContext } from "./components/_helpers/AuthContext";
import AddQuestion from "./components/AddQuestion";
import TeacherPage from "./components/TeacherPage";
import StudentPage from "./components/StudentPage";
import ExamPage from "./components/ExamPage";
import CoursesPage from "./components/CoursesPage";
import TeacherStudentPage from "./components/TeacherStudentPage";
import Profile from "./components/Profile";
import TeacherCoursePage from "./components/TeacherCoursePage";
import ViewExam from "./components/ViewExam";
import EditExam from "./components/EditExam";
import StudentCoursePage from "./components/StudentCoursePage";
import AddExam from "./components/AddExam";
import ViewGrades from "./components/ViewGrades";
import { useState } from "react";
import StudentViewExam from "./components/StudentViewExam";
import AttemptExam from "./components/AttemptExam";

function App() {
  const [authState, setAuthState] = useState(false);
  return (
    <Router>
      <div className="App">
        <Navbar />
        <AuthContext.Provider value={{ authState, setAuthState }}>
          <Routes>
            {/* <Route exact path="/about" element={<About />} /> */}
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
              path="/StudentDashboard/StudentViewExam"
              element={<StudentViewExam />}
            />
            <Route
              exact
              path="/StudentDashboard/AttemptExam"
              element={<AttemptExam />}
            />
            <Route
              exact
              path="/studentDashboard/StudentCoursePage"
              element={<StudentCoursePage />}
            />
            <Route
              exact
              path="/adminDashboard/addTeacher"
              element={<AddTeacher />}
            />
            <Route
              exact
              path="/adminDashboard/AddStudent"
              element={<AddStudent />}
            />
            <Route
              exact
              path="/adminDashboard/AddCourse"
              element={<AddCourse />}
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
              path="/adminDashboard/viewCourse/:id"
              element={<ViewCourse />}
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
              path="/adminDashboard/editCourse/:id"
              element={<EditCourse />}
            />
            <Route
              exact
              path="/adminDashboard/TeacherPage"
              element={<TeacherPage />}
            />
            <Route
              exact
              path="/adminDashboard/studentPage"
              element={<StudentPage />}
            />
            <Route
              exact
              path="/adminDashboard/coursesPage"
              element={<CoursesPage />}
            />
            <Route
              exact
              path="/TeacherDashboard/ExamPage"
              element={<ExamPage />}
            />
            <Route
              exact
              path="/TeacherDashboard/TeacherStudentPage/"
              element={<TeacherStudentPage />}
            />
            <Route
              exact
              path="/TeacherDashboard/TeacherCoursePage"
              element={<TeacherCoursePage />}
            />
            <Route
              exact
              path="/TeacherDashboard/ViewExam/"
              element={<ViewExam />}
            />{" "}
            <Route
              exact
              path="/TeacherDashboard/EditExam/"
              element={<EditExam />}
            />
            <Route
              exact
              path="/TeacherDashboard/AddExam/"
              element={<AddExam />}
            />
            <Route
              exact
              path="/TeacherDashboard/ViewGrades/"
              element={<ViewGrades />}
            />
            <Route
              exact
              path="/TeacherDashboard/QuizDashboard"
              element={<QuizDashboard />}
            />
            <Route
              exact
              path="/TeacherDashboard/AddQuestion/"
              element={<AddQuestion />}
            />
            <Route
              exact
              path="/TeacherDashboard/viewQuestion/:id"
              element={<ViewQuestion />}
            />
            <Route
              exact
              path="/TeacherDashboard/EditQuestion/"
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
