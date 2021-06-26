import React, {useState, useEffect} from 'react'
import {Popup} from './Popup';

import {TableView} from './TableView';
import axios from 'axios';
import {FaPlus} from 'react-icons/fa';
import CreatableSelect from "react-select/creatable";

const options = [
  { value: "Priority", label: "Priority" },
  { value: "Created On", label: "Created On" },
  { value: "Due Date", label: "Due Date" }
];

export function Header(props) 
{

  const handleChange = (newValue, actionMeta) => 
  {
    try{ 
         alert('Arranged Items Priority Wise');
       
        <TableView />
       
}
catch(err)
{
console.log("Error Occurred",err);
}
    console.log(newValue);
    console.log(`action: ${actionMeta.action}`);
  };
  const handleInputChange = (inputValue, actionMeta) => 
  {
    console.log(inputValue);
    console.log(`action: ${actionMeta.action}`);
  };


    const[setArray, updateArray] = useState([]);
    async function fetchList()
    {
      try{
        const response = await axios.get(`${process.env.REACT_APP_API_KEY}/todoapp/getAll`);
        console.log("Response", response);
        const listArry = response.data.result;
        console.log(listArry);
        updateArray(listArry);
      }
      catch(err) 
      {
        console.log("Error Occurred", err);
      }
      
      
    }
    useEffect(() => {
      fetchList();
    },[setArray])
  
    const [isOpen, setIsOpen] = useState(false);
  const togglePopup = () => 
  {
    setIsOpen(!isOpen);
  }
    function renderHeader(props)
    {
        return(
            <div className="d-flex todo-head mt-3 p-3 fw-bold fs-4">
            <div>ToDo App</div>
            <div className="ms-auto">
                  <button type="button" className="plus-icon" onClick={togglePopup}>
                      <FaPlus />
                  </button>

                 {isOpen && 
                 <Popup handleClose={togglePopup} fetchList={fetchList}/>}
        </div>
        </div>

        )
    }
  
    function renderDropDown()
    {
        return(
             <div className="d-flex ms-4 p-1">
           <div >
               <h6>Group By</h6>
               
               <div>
               <CreatableSelect className="creatable-select"
                   isClearable
                   onChange={handleChange}
                   onInputChange={handleInputChange}
                   options={options}
                  
                />
               </div>
               
           </div>
           <div className="ms-5">
               <h6>Search</h6>
               <input type="text" placeholder="Search Tasks" className="search-tab"></input>
           </div>
           </div>
        )
    }
    
    function renderTask()
    {
        return(
               <div className="d-flex task-list ms-4 mt-5 mx-4">
                 <div className="ms-2">All</div>
                 <div className="ms-5">Pending</div>
                 <div className="ms-5">Completed</div>
               </div>
        )
    }
function renderTableCaption()
{
   return(
    <div className="d-flex ms-4 mt-3 mx-4 fw-bold">
    <div className="create-table">Summary</div>
    <div className="create-table">Priority</div>
    <div className="create-table">Created On</div>
    <div className="create-table">Due By</div>
   <div className="create-table">Actions</div>
  </div>
   )
}
    function renderTable()
  {

    return setArray.map((tweetItem, index) =>
    {
      return(
        <div key={index}>
           <TableView tweetItem={tweetItem} />
          </div>
      )
    })
    
  }
    return(
        
           <div>
               {renderHeader()}
               {renderDropDown()}
                {renderTask()}
                {renderTableCaption()}
                {renderTable()}
                
          </div>   
    )
}
