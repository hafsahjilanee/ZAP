import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const ViewQuestion = () => {
    let nav = useNavigate();
    const [question, setQuestion] = useState({ 
        description:"",
        alternatives:[{
            "text":"",
            "isCorrect":""
        }]
     });


    const {id} = useParams();

    useEffect(() =>{
        loadQuestion();
    }, []);

    const loadQuestion = async () =>
    {
        const result =
        await axios.get('http://localhost:4000/question/' + id, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('auth')
            }
        }, {
            data: { id: id }
        });
        console.log(id)
        setQuestion(result.data);
    }
    return(
        <div className="container py-4">
        <Link className="btn btn-primary" to="/QuizDashboard">
          Back
        </Link>
        <h1 className="display-4">Question: {question.description}</h1>
        
        <hr/>
        <table class="table border shadow">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th>Options</th>
                <th>isCorrect</th>
                </tr>
            </thead>
        <tbody>
        {


        question.alternatives.map((option,index) =>(
 <tr>
<th scope="row">{index+1}</th>
<td>{option.text}</td>
<td>{option.isCorrect.toString()}</td>
</tr> 
))
}
     </tbody>
  </table>
      </div>
    )
}

export default ViewQuestion;
