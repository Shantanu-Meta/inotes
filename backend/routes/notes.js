const express = require('express');
const router = express.Router(); 
const Note = require('../models/Note');
const fetchUser = require('../middleware/fetchUser')
const { body, validationResult } = require('express-validator');

// Adding a note in db
router.post('/addnote', fetchUser, [body('title', "Not a valid title").isLength({ min: 3 }), body('description', "description must be minimum 5 chars.").isLength({ min: 5 })] ,async (req, res)=>{

    const result = validationResult(req);

    if (!result.isEmpty()){
        return res.send({ errors: result.array()});
    }

    try{
        const {title, description, tag, date} = req.body; 
        let newNote = await Note.create({
        title, description, date, tag, userId: req.user.id
        })
        res.send(newNote); 
    }catch(err){
        res.status(500).send("Some internal error occured" + err)
    }

})
// fetch notes for a single user from DB. 
router.get('/getnote', fetchUser, async (req, res)=>{
    try{
        const data = await Note.find({userId:req.user.id}); 
        res.json(data); 
    }catch(e){
        return res.status(500).json({error: " Server Error"});
    }

})

// update a note for a user in DB. 
router.post('/updatenote/:id', fetchUser, async (req, res)=>{
    try{
        const {title, description, tag} = req.body; 
        const newNote = {}; 
        if(title)newNote.title = title
        if(description)newNote.description = description
        if(tag)newNote.tag = tag
        
        let fetchedNote = await Note.findById(req.params.id);
        // no such note with this id exist. 
        if(!fetchedNote){
            return res.status(404).json({error: "Note note found"});
        }

        // verify authentication. 
        if(fetchedNote.userId.toString() !== req.user.id){
            return res.status(404).json({error: "User not matched"});
        }
        fetchedNote =await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})
        res.send(fetchedNote);  
    }catch(e){
        return res.status(500).json({error: " Server Error"});
    }

})

// delete a note for a user from DB. 
router.post('/deletenote/:id', fetchUser, async (req, res)=>{
    try{
        
        let fetchedNote = await Note.findById(req.params.id);
        // no such note with this id exist. 
        if(!fetchedNote){
            return res.status(404).json({error: "Note note found"});
        }

        // verify authentication. 
        if(fetchedNote.userId.toString() !== req.user.id){
            return res.status(404).json({error: "User not matched"});
        }
        fetchedNote = await Note.findByIdAndDelete(req.params.id)
        res.send(fetchedNote);  
    }catch(e){
        return res.status(500).json({error: " Server Error"});
    }

})

module.exports = router; 