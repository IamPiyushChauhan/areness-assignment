import React, { useState } from 'react';
import axios from 'axios';

function Task({id,task,isDone, toDelete}) {
    const [isCheck,setIsCheck] = useState(isDone)
    const [taskName,setTaskName] = useState(task)
    const [isEditClick,setIsEditClick] = useState(false)
    const onCheckBoxClick = ()=> {
        axios.put('/todo/',null,{
            params: {
                id: id,
                field: "completed",
                value: (!isCheck)
            }
        }).then(response => {
            console.log(response.status)
            if(response.status === 201){
                setIsCheck(prev => !prev)
            }else{
                alert("error in updating")
            }
          })
          .catch(error => {
            console.error('Error fetching data:', error);
            alert("error in updating");
          });
    }

    const onEnter = (e) => {
        if (e.key === "Enter")
            axios.put('/todo/',null,{
                params: {
                    id: id,
                    field: "task_name",
                    value: taskName
                }
            }).then(response => {
                console.log(response.status)
                if(response.status === 201){
                    console.log("Successfully Update");
                    setIsEditClick(false)
                }else{
                    setTaskName(task)
                    alert("error in updating")
                    setIsEditClick(false)
                }
              })
              .catch(error => {
                setTaskName(task)
                console.error('Error fetching data:', error);
                alert("error in updating");
              }); 
        }
    
    const onClickEdit = ()=>{
        setIsEditClick(true)
    }

    const onClickDelete = () =>{
        toDelete(id)
    }
    
  return (
    <div>
    <div className='card' style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', margin: "0.5em", padding: "0.2em" }}>
    <input
      type="checkbox"
      checked={isCheck}
      onChange={onCheckBoxClick}
      className="form-check-label"
    />
    <div style={{ width: '60%', textAlign: 'center' }}>
    <p className="card-subtitle mb-2 text-muted"> {isEditClick? "Press Enter to Update Task name":""} </p>
    <input
      type="text"
      value={taskName}
      onChange={(e) => {setTaskName(e.target.value)}}
      onKeyDown={onEnter}
      disabled={!isEditClick}
      className='form-control'
      style={{ width: '80%', textAlign: 'center', marginLeft: "10%"}}
    />
    </div>
    
    <button className='btn btn-warning'  onClick={onClickEdit}>Edit</button>
    <button className='btn btn-danger'  onClick={onClickDelete}>Delete</button>
  </div>
  </div>
  );
}

export default Task;
