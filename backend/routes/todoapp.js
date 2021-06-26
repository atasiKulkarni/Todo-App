const express = require('express');
const router = express.Router();
const todoModel = require('../model/todoModel');

/* Creating data using POST API*/
router.post('/add', function(req, res) 
{
  console.log("Request Body", req.body);
  const listData = new todoModel(req.body);
  listData.save(function(err)
  {
       if(err){
           console.log("Error Occurred while adding list", err);
       }
       else
       {
           console.log("Todo List added successfully");
           res.send("Todo list added successfully");
       }
  })
});

/* Fetching data from database using GET API*/
router.get('/getAll', function(req, res) 
{
  todoModel.find({}, {__v:0},{sort:{timeStamp:-1}},function(err, data)
    {
        if(err){
            console.log("Error Occurred while fetching data", err);
        }
        else
        {
            console.log("Data", data);
            res.send({result: data});
        }
    });
});

/* Updating data from database using PUT API*/
router.put("/updateItem", function (req, res) {
    todoModel.findOneAndUpdate(
      {
        _id: req.body._id,
      },
      {
        isPurchased: true,
      },
      function (err) {
        if (err) {
          console.log("err", err);
          res.status(400).send({
            message: err,
          });
        } else {
          res.send("Purchased status updated successfully");
        }
      }
    );
  });

/* Deleting data from database using DELETE API*/
router.delete("/deleteItem", function (req, res) {
    const ItemId = req.body._id;
    todoModel.remove({ _id: ItemId }, function (err) {
      if (err) {
        console.log("err", err);
        res.status(400).send({
          message: err,
        });
      } else {
        res.send({ result: " Item removed successfully" });
      }
    });
  });

module.exports = router;