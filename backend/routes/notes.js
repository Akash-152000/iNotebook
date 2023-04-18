const express = require('express')
const router= express.Router();
const Notes = require("../models/Notes");
const fetchUser = require("../middleware/fetchUser");
const { body, validationResult } = require("express-validator");

// Route 1: get all notes using Get "/api/notes/fetchallnotes" login required

router.get('/fetchallnotes',fetchUser,async (req,res)=>{
    try {
        const notes = await Notes.find({user:req.user.id});
        res.json(notes);
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Some Error Occured");
    }
    
})


//Route 2: Add note using Post "/api/notes/addnotes" login required

router.post('/addnotes',fetchUser,[
    body('title','Enter a valid title').isLength({min:3}),
    body('description','Enter a valid description').isLength({min:7})
],async (req,res) => {
    
    try {
        const {title,description,tag} = req.body;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const notes = new Notes({
            title,description,tag,user:req.user.id
        })
        const savedNotes = await notes.save()
        res.json(savedNotes);
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Some Error Occured");
    }
})


// Route 3: Update notes using PUT "/api/notes/updatenotes/:id" login required

router.put('/updatenotes/:id',fetchUser,async (req,res)=>{
    const {title,description,tag} = req.body;

    const newNote ={};
    if(title){newNote.title = title}
    if(description){newNote.description = description}
    if(tag){newNote.tag = tag}

    //find the note to be updated and update it

    let note = await Notes.findById(req.params.id);
    if(!note){return res.status(404).send("Not found")}

    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not allowed")
    }
  
    note = await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
    res.json(note)
 }) 


 // Route 4: Delete notes using DELETE "/api/notes/deletenotes/:id" login required

router.delete('/deletenotes/:id',fetchUser,async (req,res)=>{
    const {title,description,tag} = req.body;

    //find the note to be deleted and delete it

    let note = await Notes.findById(req.params.id);
    if(!note){return res.status(404).send("Not found")}

    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not allowed")
    }
  
    note = await Notes.findByIdAndDelete(req.params.id)
    res.json({"Succes":"Note has been deleted"})
 }) 
 
module.exports = router