import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddQuestion = () => {
       let navigate = useNavigate()

    const [question, setQuestion] = useState({ 
        description:"",
        alternatives:[{
          "text":"",
          "isCorrect":""
      }]

    });  
        

  //const {description, alternative: {text, isCorrect}} = question;
  //console.log(text);

  const onInputChange = e => {
    
    setQuestion({...question,[e.target.name]: e.target.value})
    

  }

  const addAlternative = (e) => {
    let temp = {...question};
    temp.alternatives.push(
      {
        text: "",
        isCorrect: ""
      }
    );
    setQuestion(temp);
  };

  const handleAlternativeChange = (e, i) => {
    let temp = {...question}
    temp.alternatives[i][e.target.name] = e.target.value
    setQuestion(temp)
  } 
  
const onSubmit = async e => {
    
    e.preventDefault()
    await axios.post('http://localhost:4000/question/createQuestion',question,
          {headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('auth'),
          'Accept': 'application/json',
          'Content-Type': 'application/json'
          
      }})
    navigate('/QuizDashboard');
  
  }


    return(
        <div className="container">
        <div className="w-75 mx-auto shadow p-5">
          <h2 className="text-center mb-4">Add A Question</h2>
          <form onSubmit={e =>onSubmit(e) }>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Question Description"
              name="description"
              value={question.description}
              onChange ={e => onInputChange(e)} 
              
            />
          </div>
          <br/>
          {
        question.alternatives.map((alternative, i) => (
          <div style={{padding: '25px'}}>
            <span style={{fontSize: '18px'}}>Option {i+1}: </span>
            <input variant='outlined' name='text' placeholder='answer text'
               onChange={e => handleAlternativeChange(e, i)} value={question.alternatives[i].text}
            />
            
            <input variant='outlined' name='isCorrect' placeholder='true false?'
               onChange={e => handleAlternativeChange(e, i)} value={question.alternatives[i].isCorrect}
            />
           <div>
              <br/>
            </div>
            <button variant='contained' color='primary' onClick={e => addAlternative(e, i)}>Add Option</button>
          </div>
        ))
      }
          <br/>
          <button className="btn btn-primary btn-block">Add Question</button>
        </form>
        </div>
        </div>
    )
}

export default AddQuestion;
