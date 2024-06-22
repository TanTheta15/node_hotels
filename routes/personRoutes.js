const express = require('express');
const router = express.Router();
const Person = require('./../models/Persons');


//POST route to add a person 
router.post('/', async (req, res) => {
    try{
        const data = req.body; // Assuming the request body contains the person data 
        const newPerson = new Person(data);
        const savedPerson = await newPerson.save();
        console.log('Data saved');
        res.status(200).json(savedPerson);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error : 'Internal server error'});
    }
})

router.get('/', async(req, res) => {
    try{
        const data = await Person.find();
        console.log('Data fetched');
        res.status(200).json(data);
    }
    catch(err) {
        console.log(err);
        res.status(500).json({error : 'Internal server error'});
    }
})

router.get('/:workType', async (req, res) => {
    try{
        const workType = req.params.workType;   //Extract the work type from the URL parameter
        if(workType == 'chef' || workType == 'manager' || workType == 'waiter'){
            const response = await Person.find({work : workType});
            console.log('response fetched');
            res.status(200).json(response);
        }
        else{
            res.status(404).json({error : 'Invalid work type'});
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({error : 'Internal server error'});
    }
})

router.put('/:id', async (req, res) => {
    try{
        const personId = req.params.id;     //Extract the id from the URL parameter
        const updatedPersonData = req.body;
        const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
            new : true,     //Return the updated document 
            runValidators : true    //Run mongoose validation
        });
        if(!response){
            return res.status(404).json({error : 'Person not found'});
        }
        console.log('Data updated');
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error : 'Internal server error'});
    }
})

router.delete('/:id', async (req, res) => {
    try{
        const personId = req.params.id;     //Extract the id from the URL parameter

        //Assuming you have a Person model
        const response = await Person.findByIdAndUpdate(personId);

        if(!response){
            return res.status(404).json({error : 'Person not found'});
        }
        console.log('Data deleted');
        res.status(200).json({message : 'Person deleted successfully'});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error : 'Internal server error'});
    }
})

module.exports = router;