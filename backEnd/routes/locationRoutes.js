const express = require('express');
const {createNewLocation, getAllLocations, getLocation, deleteLocation, updateLocation, pushItem, deleteItem, editItem, findItems} = require('../controllers/locationController');

const router = express.Router();

//get all locations
router.get('/', getAllLocations);

//find items
router.get('/find-items/:title', findItems);

//get single location
router.get('/:title', getLocation);

//create new location
router.post('/', createNewLocation);

//delete location
router.delete('/:id', deleteLocation);

//edit location
router.patch('/:id', updateLocation);

//push item
router.patch('/items/:id', pushItem);

//delete item
router.patch('/items/delete/:id', deleteItem);

//edit item 
router.patch('/items/edit/:id', editItem);

module.exports = router;