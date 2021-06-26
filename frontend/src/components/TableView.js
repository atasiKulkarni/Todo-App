import React, {useState} from 'react'

import $ from 'jquery';
import {Update} from './Update';
import axios from 'axios';
import {FaEdit} from 'react-icons/fa';
import {RiDeleteBin7Line} from 'react-icons/ri';
export function TableView({tweetItem},{fetchList})
{
    
    async function deleteItems(item)
    {
        try{ 
            if(window.confirm('Are you sure you want to delete this item'))
            {
                const deleteResponse = await axios.delete(`${process.env.REACT_APP_API_KEY}/todoapp/deleteItem/${item}`,
                {
                    method: "DELETE",
                });
                console.log(deleteResponse );
                   

                $('.delete-action').on('click', function(){
                $(this).closest("#deleteRow").remove();
                });
                alert("Data deleted successfully");  
                return deleteResponse.json;
               
            }  
           
           fetchList();
            
        }
        catch(err){
            console.log(err);

        }

    }
    
    const [isOpen, setIsOpen] = useState(false);
  const togglePopup = () => 
  {
    
    setIsOpen(!isOpen);
    
  }
  function strikeItem()
  {
    $('button').click(function() {
        $('a').wrap("<strike>");
        //$('a').css("text-decoration", "line-through");
      });
  }
    return (
        <div>
            <div className="ms-4 sort-row">{tweetItem.Priority}</div>
                 <div className="d-flex ms-4 mx-4" id="deleteRow">
                 <div className="create-table">{tweetItem.Title}</div>
                 <div className="create-table">{tweetItem.Priority}</div>
                 <div className="create-table">{tweetItem.CreatedDate}</div>
                 <div className="create-table">{tweetItem.DueDate}</div>
                 <div className="d-flex create-table">
                    <div >
                        <button className="edit-action"  onClick={togglePopup}><FaEdit /></button>
                        {isOpen && 
                          <Update handleClose={togglePopup} 
                            />}
                    </div>

                    <div >
                        <button className="ms-2 done-action" value="click"   
                                 onClick={() => strikeItem()}>
                                     Done
                        </button>
                    </div>

                    <div>
                        
                    <button className="ms-2 delete-action" id="removeButton" 
                                onClick={() => deleteItems()}>
                                <RiDeleteBin7Line />
                        </button>
                      
                        </div>
                </div>
                
             </div>
            
        </div>
            

    )
}
