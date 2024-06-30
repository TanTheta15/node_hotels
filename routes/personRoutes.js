const express = require('express');
const router = express.Router();
const Person = require('./../models/Persons');
const {jwtAuthMiddleware, generateToken} = require('./../jwt');
 
//POST route to add a person 
router.post('/signup', async (req, res) => {
    try{
        const data = req.body; // Assuming the request body contains the person data 
        const newPerson = new Person(data);
        const savedPerson = await newPerson.save();
        console.log('Data saved');

        const payload = {
            id : savedPerson.id,
            username : savedPerson.username
        }
        console.log(JSON.stringify(payload));
        const token = generateToken(payload);
        console.log('Token is : ', token);

        res.status(200).json({response : savedPerson, token : token});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error : 'Internal server error'});
    }
})

//Login Routes 
router.post('/login', async (req, res) => {
    try{
        //Extract username and password from request body
        const {username, password} = req.body;

        //Find the user by username
        const user = await Person.findOne({username : username});

        //If user doesn't exist or password doesn't match, return error
        if(!user || !(await user.comparePassword(password))){
            return res.status(401).json({error : 'Invalid username or password'});
        }

        //Generate token
        const payload = {
            id : user.id,
            username : user.username
        }
        const token = generateToken(payload);

        //Return token as response 
        res.json({token});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error : 'Internal server error'});
    }
})

//Profile route 
router.get('/profile', jwtAuthMiddleware, async (req, res) => {
    try{
        const userData = req.user;
        console.log("User data : ", userData);

        const userId = userData.id;
        const user = await Person.findById(userId);

        res.status(200).json({user});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error : 'Internal server error'});
    }
})

router.get('/', jwtAuthMiddleware, async(req, res) => {
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

//Comment added for testing purpose
module.exports = router;