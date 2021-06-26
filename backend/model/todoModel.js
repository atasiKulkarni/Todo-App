const mongoose = require('mongoose');
const TodoSchema = mongoose.Schema(
    {
       currentState: String,
       Title: String,
       Description: String,
       CreatedDate: Date,
       DueDate: Date,
       Priority: String,
      

    },
    {collection: "ToDoApp"}
);
module.exports = mongoose.model("ToDoApp", TodoSchema);
