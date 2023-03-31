const express = require("express");
const {
  createNewLocation,
  getAllLocations,
  getLocation,
  deleteLocation,
  updateLocation,
  addToItem,
  takeOffItem,
  deleteItem,
  editItem,
  findItems,
  putItemAway,
  pushItem,
} = require("../controllers/locationController");

const router = express.Router();

//get all locations
router.get("/", getAllLocations);

//find items
router.get("/find-items/:title", findItems);

//get single location
router.get("/:title", getLocation);

//create new location
router.post("/", createNewLocation);

//delete location
router.delete("/:id", deleteLocation);

//edit location
router.patch("/:id", updateLocation);

//add to item
router.patch("/items/add-to-item/:id", addToItem);

//take off item
router.patch("/items/take-off-item/:id", takeOffItem);

//delete item
router.patch("/items/delete/:id", deleteItem);

//edit item
router.patch("/items/edit/:id", editItem);

//put item away
router.patch("/items/put-item-away/:id", putItemAway);

//push Item
router.patch("/items/push-item/:id", pushItem)

module.exports = router;
