import React, {useState} from 'react'
import axios from 'axios';
export function Update(props,{fetchList}) 
{
  const [listTitle, updateTitle] = useState("");
  const [date, updateDate] = useState("");
  const [priority, updatePriority] = useState("");
  const [description, updateDescription] = useState("");
  
  async function updateText()
  {
   
    try
    {
     
      const sendResponse = await axios.put(`${process.env.REACT_APP_API_KEY}/todoapp/updateItem`,
      {
       
        "Title" : "atasi",
         "Description" : description,
          "CreatedDate" :Date.now(),
          "DueDate" : date,
           "Priority" : priority
      })
      console.log("Response", sendResponse);
      updateTitle("");
      updateDate("");
      updatePriority("");
      updateDescription("");
      fetchList();
    }
    catch(err){
      console.log("Error Occurred", err);
    }
  }
    return (
        <div className="popup-box">
          <div className="box">
          <div className=" ms-4">
            <h6 className="edit-task fs-4">Edit Task</h6>

            <h6>Summary</h6>
            <input type="text"
                   placeholder="Summary"
                   className="summary-text fs-6"
                   value={listTitle}
                   onChange={(e) => updateTitle(e.target.value)}
                   ></input>

            <h6 className="mt-2">Description</h6>
            <textarea className="desc-field fs-6" 
                      placeholder="Description"
                      value={description}
                      onChange={(e) =>updateDescription(e.target.value)}>
                
            </textarea>

            <div className="d-flex mt-1 date-border pb-4 fs-6">
                <div className="">
                <h6>Due Date</h6>
                <input type="date" 
                       placeholder="28-04-2020" 
                      className="dropdown-menu-list"
                      value={date}
                      onChange={(e) => updateDate(e.target.value)}></input>
                </div>
                <div className="ms-auto">
                    <h6>Priority</h6>
                    <select className="dropdown-menu-list"
                            value={priority}
                            onChange={(e) => updatePriority(e.target.value)}>
                                <option></option>
                                <optopn>None</optopn>
                                 <option>Low</option>
                                 <option>Medium</option>
                                 <option>High</option>
                     </select>
                </div>
               
                
            </div>
            <div className="d-flex mt-3 ">
                {/* <button className="btn btn-secondary ms-auto">Cancel</button> */}
                   
                <button className="btn btn-success ms-auto"
                        onClick={() => updateText()}>
                  Update
                </button>
            </div>
        </div>
            <span className="close-icon btn btn-secondary ms-auto" 
            onClick={props.handleClose}>
              Close
            </span>
            
          </div>
        </div>
    )
}
