const express = require('express');
const router = express.Router();

//Item Model Requests

const Item = require('../../models/Item');

//Create routes


//@route  GET api/items
//@desc   Get all items
//@access Public

// '/' represents 'api/items'
router.get('/', (req,res) => {
    Item.find()
    .sort({ date: -1})  //sort by desc date
    .then(items => res.json(items))    
})  


//@route  POST api/items
//@desc   Create an Item
//@access Public

// '/' represents 'api/items'
router.post('/', (req,res) => {
    const newItem = new Item({
        name: req.body.name
    });   

    newItem.save().then(item => res.json(item));
    //.then(items => res.json(items))    
})  


//@route  DELETE api/items/:id
//@desc   DELETE an Item
//@access Public

// '/' represents 'api/items'  
router.delete('/:id', (req,res) => {
    Item.findById(req.params.id)
    .then(item => item.remove().
                    then(() => res.json({
                    success: true})
                    )
        )   
    .catch(err => res.status(404).json({ success: false}));

  })  


module.exports = router;