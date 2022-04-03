import React, {useState, useEffect} from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const QuizDashboard = () => {
     let nav = useNavigate();
     const [questions, setQuestions] = useState([]);

     useEffect( () => {
         loadQuestions();
     },
     []);

     const deleteQuestion = async id =>{
        console.log(id);
       await axios.delete('http://localhost:4000/question/' + id, {
           headers: {
               'Authorization': 'Bearer ' + localStorage.getItem('auth')
           }
       }, {
           data: { id: id }
       });
       loadQuestions();
    }

    const viewQuestion = async id => {
        nav('/TeacherDashboard/QuizTab/viewQuestion/'+id)
    }
    
     const loadQuestions = async () => {
        
        const result =
            await axios({
                method: 'get',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',

                },
                url: "http://localhost:4000/question/questions"
            })
        console.log(result.data._id)
        setQuestions(result.data)
     }
     
    return(
        <div className="container">
            <div>
            <br/>
            <Link className='btn btn-outline-dark me-3' to='/TeacherDashboard/QuizTab/addQuestion'>Add Question</Link>
            </div>
            <div className="py-4">
                <h1>Quiz Questions</h1>
                <table class="table border shadow">
                    <thead>
                         <tr>
                            <th scope="col">#</th>
                             <th scope="col">Question</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                 <tbody>
                 {
                questions.map((question,index) =>(
                 <tr>
                <th scope="row">{index+1}</th>
                <td>{question.description}</td> 
                <td>
                <button className="btn btn-outline-primary me-2" onClick={() => viewQuestion(question._id)} >View</button>
                <button className="btn btn-outline-danger me-2" onClick={() => deleteQuestion(question._id)} >Delete</button>

          </td>
          </tr> 
          ))
      }
    
  </tbody>
</table>
            </div>
        </div>
    )
}

export default QuizDashboard;