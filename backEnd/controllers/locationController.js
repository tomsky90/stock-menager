const { default: mongoose } = require("mongoose");
const Location = require("../models/LocationModel");

//get all locations
const getAllLocations = async (req, res) => {
  const locations = await Location.find({}).sort({ createdAt: -1 });

  res.status(200).json(locations);
};

//find Items
const findItems = async (req, res) => {
  const { title } = req.params;

  const location = await Location.find({ "items.title": title });

  if (!location) {
    return res.status(404).json({ error: "Can't find Item" });
  }

  if (location.length < 1) {
    return res.status(404).json({ error: "Can't find Item" });
  }
  res.status(200).json(location);
};

//get single location
const getLocation = async (req, res) => {
  const { title } = req.params;

  const location = await Location.findOne({ title: title });

  if (!location) {
    return res.status(404).json({ error: "Location do not exist" });
  }
  res.status(200).json(location);
};

//post new location
const createNewLocation = async (req, res) => {
  const { title, items } = req.body;

  const exist = Location.findOne({ title: title })

  if(exist) {
    return res.status(404).json({ error: "Location alredy exists, please enter different name." });
  }

  try {
    const location = await Location.create({ title, items });
    res.status(200).json(location);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//update location
const updateLocation = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such Location" });
  }

  const location = await Location.findOneAndUpdate(
    { _id: id },
    { ...req.body }
  );

  if (!location) {
    return res.status(400).json({ error: "No such location" });
  }

  return res.status(200).json(location);
};

//take off item
const takeOffItem = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const { qty } = req.body;
  const { exp } = req.body;
  const { itemId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such location" });
  }
  const location = await Location.findOne({ "items._id": itemId });
  if (!location) {
    return res.status(400).json({ error: "Item dont exist" });
  }
  //check if item exist
  const exist = location.items.find((item) => item.title === title);
  if (exist) {
    //calculate new qty
    const newQty = parseInt(exist.qty) - parseInt(qty);
    //if new qty === 0 delete item from current bin 
    if (newQty === 0) {
      const updatedlocation = await Location.findOneAndUpdate(
        { _id: id },
        { $pull: { items: { _id: itemId } } }
      );
      return res.status(200).json({ updatedlocation });
      //if new qty would be less than 0 throw error
    } else if (newQty < 0) {
      return res.status(400).json({ error: `Not enough items max avalible: ${exist.qty}` });
    }
    //else update item with new qty
    const location = await Location.findOneAndUpdate(
      { "items._id": itemId },
      {
        $set: {
          "items.$.title": title,
          "items.$.qty": newQty,
          "items.$.exp": exp,
        },
      }
    );
    return res.status(200).json(location);
  }
};

//add to item
const addToItem = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const { qty } = req.body;
  const { exp } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such location" });
  }

  const location = await Location.findOne({ "items._id": id });
  if (!location) {
    return res.status(400).json({ error: "No such location" });
  }
  //find item if exist add to it
  const exist = location.items.find((item) => item.title === title);
  if (exist) {
    const newQty = parseInt(exist.qty) + parseInt(qty);
    const location = await Location.findOneAndUpdate(
      { "items._id": id },
      {
        $set: {
          "items.$.title": title,
          "items.$.qty": newQty,
          "items.$.exp": exp,
        },
      }
    );
    return res.status(200).json(location);
  } 
};

//edit item
const editItem = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const { qty } = req.body;
  const { exp } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such location" });
  }

  const location = await Location.findOneAndUpdate(
    { "items._id": id },
    {
      $set: {
        "items.$.title": title,
        "items.$.qty": qty,
        "items.$.exp": exp,
      },
    }
  );

  if (!location) {
    return res.status(400).json({ error: "No such location" });
  }

  return res.status(200).json(location);
};

//delete item
const deleteItem = async (req, res) => {
  const { id } = req.params;
  const { _id } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such Location" });
  }

  const location = await Location.findOne({ _id: id });

  if (!location) {
    return res.status(400).json({ error: "No such location" });
  }

  const updatedlocation = await Location.findOneAndUpdate(
    { _id: id },
    { $pull: { items: { _id: _id } } }
  );

  return res.status(200).json({ updatedlocation });
};

//delete location
const deleteLocation = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such location" });
  }

  const location = await Location.findOneAndDelete({ _id: id });

  if (!location) {
    return res.status(400).json({ error: "No such location" });
  }

  return res.status(200).json(location);
};

//putItemAway
const putItemAway = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const { qty } = req.body;
  const { exp } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such Location" });
  }

  const location = await Location.findOne({ _id: id });
  //check if item exist in current bin
  const exist = location.items.find((item) => item.title === title);

  if (!location) {
    return res.status(400).json({ error: "No such location" });
  }
  //if exists add qty and update
  if (exist) {
    const itemId = exist._id.toString();
    const newQty = parseInt(exist.qty) + parseInt(qty);
    const location = await Location.findOneAndUpdate(
      { "items._id": itemId },
      {
        $set: {
          "items.$.title": title,
          "items.$.qty": newQty,
          "items.$.exp": exp,
        },
      }
    );
    console.log(location);
    return res.status(200).json(location);
  } else {
    //if item don't exist push item into bin
    const updatedlocation = await Location.findOneAndUpdate(
      { _id: id },
      { $push: { items: req.body } }
    );

    return res.status(200).json(updatedlocation);
  }
};

//push Item
const pushItem = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such Location" });
  }

  const updatedlocation = await Location.findOneAndUpdate(
    { _id: id },
    { $push: { items: req.body } }
  );

  return res.status(200).json(updatedlocation);
}

module.exports = {
  getAllLocations,
  getLocation,
  createNewLocation,
  deleteLocation,
  updateLocation,
  addToItem,
  takeOffItem,
  deleteItem,
  editItem,
  findItems,
  putItemAway,
  pushItem
};
