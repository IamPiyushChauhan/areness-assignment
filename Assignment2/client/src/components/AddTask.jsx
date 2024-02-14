import React from 'react';

function AddTask({newTaskName,setNewTaskName,addClicked}) {
const onEnter =(e) =>{
    if (e.key === "Enter"){
        addClicked()
    }
}

const onClick = ()=>{
    addClicked()
}
  return (
    <div className='card' style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', margin: "0.5em", padding: "0.2em" }}>
      <input
      type="text"
      value={newTaskName}
      onChange={(e) => {setNewTaskName(e.target.value)}}
      onKeyDown={onEnter}
      className='form-control'
      style={{ width: '80%', textAlign: 'center' }}
    />
    <button className='btn btn-primary' onClick={onClick}>Add</button>
    </div>
  );
}

export default AddTask;
