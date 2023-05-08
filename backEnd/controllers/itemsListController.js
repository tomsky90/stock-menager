const Item = require("../models/ItemsListModel");

//find single item
const getItem = async (req, res) => {
  const { title } = req.params;

  const item = await Item.findOne({ title: title });

  if (!item) {
    return res.status(404).json({ error: "item do not exist" });
  }
  res.status(200).json(item);
};

//get list of items
const getAllItems = async (req, res) => {
  const items = await Item.find({}).sort({ createdAt: -1 });

  if(!items) {
    return res.status(404).json({ error: "No Items yet." });
  }

  res.status(200).json(items);
};

//create new Item
const createNewItem = async (req, res) => {
  const { title, description } = req.body;

  const exist =  await Item.findOne({ title: title })

  if(exist && exist !== undefined) {
    return res.status(404).json({ error: "Item alredy exists." });
  }

  try {
    const item = await Item.create({ title, description });
    res.status(200).json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//up item qty in items list
const addToItemListItem = async (req, res) => {
  const { title } = req.params;
  const { qty } = req.body;
  
  const exist = await Item.findOne({title: title})

  const item = await Item.findOneAndUpdate(
    { title: title },
    { $set: {
      "qty": parseInt(exist.qty) + parseInt(qty),
    }, }
  );

  if (!item) {
    return res.status(400).json({ error: "No such Item" });
  }

  return res.status(200).json(Item);
}; 

//take of item in items List
const takeOffItemItemsList = async (req, res) => {
  const { title } = req.params;
  const { qty } = req.body

  const item = await Item.findOne({ title: title });
  const newQty = parseInt(item.qty) - parseInt(qty)
  const itemQty = item.qty
  if (!item) {
    return res.status(400).json({ error: "Item dont exist" });
  }
 
  if (item) {
    //calculate new qty
    ;
      //if new qty would be less than 0 throw error
      if (newQty < 0) {
      return res.status(400).json({ error: `Not enough items max avalible: ${itemQty}` });
    }
    //else update item with new qty
    const item = await Item.findOneAndUpdate(
      { "title": title },
      {
        $set: {
          "qty": newQty,
        },
      }
    );
    return res.status(200).json(item);
  }
};

module.exports = { createNewItem, getAllItems, getItem, addToItemListItem, takeOffItemItemsList }