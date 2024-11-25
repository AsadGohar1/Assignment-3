var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
// telling my router that I have this model
let Assignment = require('../model/assignment.js');
const assignment = require('../model/assignment.js');
let assignmentController = require('../controllers/assignment.js')
/* Get route for the book list - Read Operation */
/*
GET,
Post,
Put --> Edit/Update
*/
/* Read Operation --> Get route for displaying the books list */
router.get('/',async(req,res,next)=>{
try{
    const AssignmentList = await Assignment.find();
    res.render('Assignment/list',{
        title:'Assignment Tracker',
        displayName:req.user ? req.user.displayName:"",
        AssignmentList:AssignmentList
    })}
    catch(err){
        console.error(err);
        res.render('Assignment/list',{
            error:'Error on the server'
        })
    }
    });
/* Create Operation --> Get route for displaying me the Add Page */
router.get('/add',async(req,res,next)=>{
    try{
        res.render('Assignment/add',{
            title: 'Add Assignment',
            displayName:req.user ? req.user.displayName:""
        })
    }
    catch(err)
    {
        console.error(err);
        res.render('Assignment/list',{
            error:'Error on the server'
        })
    }
});
/* Create Operation --> Post route for processing the Add Page */
router.post('/add',async(req,res,next)=>{
    try{
        let newAssignment = Assignment({
            "Course":req.body.Course,
            "Assignment":req.body.Assignment,
            "DuteDate":req.body.DuteDate,
            "AssignmentDescription":req.body.AssignmentDescription,
            "Statues":req.body.Statues
        });
        Assignment.create(newAssignment).then(()=>{
            res.redirect('/assignmentlist');
        })
    }
    catch(err)
    {
        console.error(err);
        res.render('Assignment/list',{
            error:'Error on the server'
        })
    }
});
/* Update Operation --> Get route for displaying me the Edit Page */
router.get('/edit/:id',async(req,res,next)=>{
    try{
        const id = req.params.id;
        const assignmentToEdit= await Assignment.findById(id);
        res.render('Assignment/edit',
            {
                title:'Edit Assignment',
                displayName:req.user ? req.user.displayName:"",
                Assignment:assignmentToEdit
            }
        )
    }
    catch(err)
    {
        console.error(err);
        next(err); // passing the error
    }
});
/* Update Operation --> Post route for processing the Edit Page */ 
router.post('/edit/:id',async(req,res,next)=>{
    try{
        let id=req.params.id;
        let updatedAssignment = Assignment({
            "_id":id,
            "Course":req.body.Course,
            "Assignment":req.body.Assignment,
            "DuteDate":req.body.DuteDate,
            "AssignmentDescription":req.body.AssignmentDescription,
            "Statues":req.body.Statues
        });
        Assignment.findByIdAndUpdate(id,updatedAssignment).then(()=>{
            res.redirect('/assignmentlist')
        })
    }
    catch(err){
        console.error(err);
        res.render('Assignment/list',{
            error:'Error on the server'
        })
    }
});
/* Delete Operation --> Get route to perform Delete Operation */
router.get('/delete/:id',async(req,res,next)=>{
    try{
        let id=req.params.id;
        Assignment.deleteOne({_id:id}).then(()=>{
            res.redirect('/assignmentlist')
        })
    }
    catch(error){
        console.error(err);
        res.render('Assignment/list',{
            error:'Error on the server'
        })
    }
});
module.exports = router;