const express = require("express");
const router = express.Router();

const requireAuth = require("../middleware/requireAuth");
const requireAdminAuth = require("../middleware/requireAdminAuthorization");

// controller functions
const {
  createNewItem,
  getAllItems,
  getItem,
  addToItemListItem,
  takeOffItemItemsList,
} = require("../controllers/itemsListController");

//require auth for all routes
router.use(requireAuth);

//get all items
router.get("/get-items", getAllItems);

//create new Item
router.post("/create-item", requireAdminAuth, createNewItem);

//get Item
router.get("/get-item/:title", getItem);

//add to Item qty
router.patch("/add-item/:title", addToItemListItem);

//take off item qty
router.patch("/take-off-item/:title", takeOffItemItemsList);

module.exports = router;
