const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');

//POST method to add Menu item 
router.post('/', async (req, res) => {
    try{
        const data = req.body;
        const newMenu = new MenuItem(data);
        const response = await newMenu.save();
        console.log('Data saved');
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error : 'Internal server error'});
    }
})

router.get('/', async (req, res) => {
    try{
        const data = await MenuItem.find();
        console.log('data fetched');
        res.status(200).json(data);
    }
    catch(err) {
        console.log(err);
        res.status(500).json({error : 'Internal Server error'});
    }
})

router.get('/:taste', async (req, res) =>{
    try{
        const tasteType = req.params.taste;
        if(tasteType == 'Sweet' || tasteType == 'Sour' || tasteType == 'Spicy'){
            const response = await MenuItem.find({taste : tasteType});
            console.log('Response fetched');
            res.status(200).json(response);
        }
        else{
            res.status(404).json('Invalid taste type');
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({error : 'Internal Server error'})
    }
})

router.put('/:id', async (req, res) => {
    try{
        const menuId = req.params.id;     //Extract the id from the URL parameter
        const updatedMenuItem = req.body;
        const response = await MenuItem.findByIdAndUpdate(menuId, updatedMenuItem, {
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
        const menuId = req.params.id;     //Extract the id from the URL parameter

        //Assuming you have a Person model
        const response = await MenuItem.findByIdAndUpdate(menuId);

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