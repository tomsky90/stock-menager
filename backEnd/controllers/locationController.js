const { default: mongoose } = require('mongoose');
const Location = require('../models/LocationModel');

//get all locations
const getAllLocations = async (req, res) => {
  const locations = await Location.find({}).sort({createdAt: -1})

  res.status(200).json(locations)
}

//find Items
const findItems = async (req, res) => {

  const { title } = req.params

  const location = await Location.find({'items.title': title})
  
  if(!location) {
    return res.status(404).json({error:"Can't find Item"})
  }
  
  if(location.length < 1) {
    return res.status(404).json({error:"Can't find Item"})
  }
  res.status(200).json(location)
}
 
//get single location
const getLocation = async (req, res) => {
  const { title } = req.params;
 

  const exist = await Location.findOne({title: title})

  // const location = await Location.findById(id);

  // if(!exist) {
  //   return res.status(404).json({error:'Location do not exist'})
  // }
console.log(exist)
  // res.status(200).json(exist)
}

//post new location
const createNewLocation = async (req, res) => {
  const {title, items} = req.body

  try{
    const location = await Location.create({title, items})
    res.status(200).json(location)
  }catch(error) {
   res.status(400).json({error: error.message})
  }
}

//update location
const updateLocation = async (req, res) => {
  const { id } = req.params;

  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such Location'})
  }

  const location = await Location.findOneAndUpdate({_id: id},{...req.body})

  if(!location) {
    return res.status(400).json({error: 'No such location'})
  }

  return res.status(200).json(location)
}


//push item
const pushItem = async (req, res) => {

  const { id } = req.params;
  const {title} = req.body

  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such Location'})
  }


  const location = await Location.findOne({_id: id});

  const exist = location.items.find(item => item.title === title)

  if(!location) {
    return res.status(400).json({error: 'No such location'})
  }

  if(exist) {
    return res.status(400).json({error: 'item alrady exists'})
  } else {
    const updatedlocation = await Location.findOneAndUpdate({_id: id},{$push: {'items': req.body}})

    return res.status(200).json(updatedlocation);
  }

  
}

//edit item
const editItem = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const { qty } = req.body;
  const { exp } = req.body;

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error: 'No such location'})
  }

  

const location = await Location.findOneAndUpdate({'items._id': id}, {'$set': {
  'items.$.title': title,
  'items.$.qty': qty,
  'items.$.exp' : exp,
}})


if(!location) {
  return res.status(400).json({error: 'No such location'})
}

return res.status(200).json(location)

}

//delete item
const deleteItem = async (req, res) => {
  const { id } = req.params;
  const { _id } = req.body;

  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such Location'})
  }


  const location = await Location.findOne({_id: id});

  if(!location) {
    return res.status(400).json({error: 'No such location'})
  }


  const updatedlocation = await Location.findOneAndUpdate({_id: id},{$pull: {'items': {'_id': _id}}})

  return res.status(200).json({updatedlocation})
    
  
}


//delete location
const deleteLocation = async (req, res) => {
  const { id } = req.params;

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error: 'No such location'})
  }

  const location = await Location.findOneAndDelete({_id: id});

  if(!location) {
    return res.status(400).json({error: 'No such location'})
  }

  return res.status(200).json(location)

}


module.exports = {
  getAllLocations,
  getLocation,
  createNewLocation,
  deleteLocation,
  updateLocation,
  pushItem,
  deleteItem,
  editItem,
  findItems
}