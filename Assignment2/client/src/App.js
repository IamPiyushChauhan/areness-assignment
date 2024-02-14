import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import React,{useState} from 'react';
import axios from 'axios';
import Task from './components/Task';
import AddTask from './components/AddTask';
function App() {
  const [todoData,setTodoData] = useState([])
  const [countUpdate,setCountUpdate] = useState(0)
  const [newTaskName,setNewTaskName] = useState("")
  useEffect(()=>{
    axios.get('/todo')
      .then(response => {
        setTodoData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  },[countUpdate])

  const toDelete = (id)=>{
    

    axios.delete(`/todo/?id=${id}`)
      .then(response => {
        if(response.status==201){
          setCountUpdate(prev => prev+1)
        }
      })
      .catch(error => {
        console.error('Error delete', error);
        alert("Error in deleting");
      });
  }

  const  addClicked =() =>{
   
    const regex = /^\\s*$/;
    if(!regex.test(newTaskName)){
      axios.post(`/todo/?taskName=${newTaskName}`)
      .then(response => {
        if(response.status==201){
          setCountUpdate(prev => prev+1)
          setNewTaskName("")
        }
      })
      .catch(error => {
        console.error('Error delete', error);
        alert("Error in deleting");
      });
    }else{
      alert("ENTER Task name")
    }
    
  }

  return (
    <div className="App">
      <div style={{width: "80%", marginLeft: "10%"}}>
      <h1 className='card-title' style={{marginBottom: "0.5em"}}>ToDo</h1>
      <AddTask newTaskName={newTaskName} setNewTaskName={setNewTaskName} addClicked={addClicked}/>
      {todoData.map(({_id,completed,task_name})=>(<Task key={_id} id={_id} task={task_name}  isDone={completed} toDelete={toDelete}/>))}
    </div>
    </div>
  );
}

export default App;
