import React, {useState, useEffect} from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

const QuizDashboard = () => {

     //used to store data
     const [questions, setQuestions] = useState([]);

     const [pageCount, setpageCount] = useState(0);

     let limit = 3;

     

     const fetchQuestions = async (currentPage) => {

        const result =
            await axios({
                method: 'get',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('auth'),
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',

                },
                url: `http://localhost:4000/question/?page=${currentPage}&pagination=6`
            })
            console.log(result.data)
            setQuestions(result.data.data)
        
      };

      const handlePageClick = async (data) =>{
        //console.log(data.selected);

        let currentPage = data.selected + 1;

         await fetchQuestions(currentPage);

     }

     useEffect( () => {
         loadQuestions();
     },
     [limit]);

     
 
     const loadQuestions = async () => {
        
        const result =
            await axios({
                method: 'get',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('auth'),
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',

                },
                url: "http://localhost:4000/question/?page=1&pagination=6"
            })
        //console.log(result.data)
        setQuestions(result.data.data)
        //console.log(questions)
        //setUser(result.data.reverse());
        
    };
    
     const deleteQuestion = async id =>{
         //console.log(id);
        await axios.delete('http://localhost:4000/question/' + id, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('auth')
            }
        }, {
            data: { id: id }
        });
        loadQuestions();
     }

     
    return(
        <div className="container">
            <div>
            <br/>
            <Link className='btn btn-outline-dark me-3' to='/quizDashboard/addQuestion'>Add Question</Link>
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
                 {questions &&
                questions.map((question,index) =>(
                 <tr>
                <th scope="row">{index+1}</th>
                <td>{question.description}</td>
                <td>
              <Link class="btn btn-primary me-2" to={`/quizDashboard/ViewQuestion/${question._id}`}>View</Link>
              <Link className="btn btn-outline-primary me-2" to={`/quizDashboard/EditQuestion/${question._id}`}>Edit</Link>
              <button to class="btn btn-danger" onClick={() => deleteQuestion(question._id)}>Delete</button>
          </td>
          </tr> 
          ))
          
            }
            
            </tbody>
            
            </table>
            
            </div>
            <ReactPaginate 
            previousLabel = {'previous'}
            nextLabel = {'next'}
            breakLabel = {'...'}
            pageCount = {5}
            onPageChange={handlePageClick}
            containerClassName={"pagination justify-content-center"}
            pageClassName={'page-item'}
            pageLinkClassName={'page-link'}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            breakClassName={"page-item"}
            breakLinkClassName={"page-link"}
            activeClassName={"active"}
            />
        </div>
    )
}

export default QuizDashboard;