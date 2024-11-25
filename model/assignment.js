//const { Collection, default: mongoose } = require("mongoose");

const mongoose = require("mongoose");

let assignmentModel = mongoose.Schema({
    Course: String,
    Assignment : String,
    DuteDate: String,
    AssignmentDescription: String,
    Statues: String
},
{
    collection:"Assignment_Tracker"
});
module.exports = mongoose.model('Assignment',assignmentModel);
