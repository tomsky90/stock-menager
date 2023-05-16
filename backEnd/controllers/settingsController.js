const { default: mongoose } = require("mongoose");
const Settings = require("../models/settings");

const createNewSetting = async (req, res) => {
  const { title, qty } = req.body;
  const exist =  await Settings.findOne({ title: title })

  if(exist && exist !== undefined) {
    res.status(400).json({ error: 'exists' });
  }

  try {
    const setting = await Settings.create({ title, qty });
    res.status(200).json(setting);
  } catch (error) {
    res.status(400).json({ error });
  }
};

const getAllSettings = async (req, res) => {
  const settings = await Settings.find({});

  if(!settings) {
    return res.status(404).json({ error: "Can't load up settings" });
  }

  res.status(200).json(settings);
};

const editSetting = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such Location" });
  }

  const setting = await Settings.findOneAndUpdate(
    { _id: id },
    { ...req.body }
  );

  if (!setting) {
    return res.status(400).json({ error: "Can't change setting" });
  }

  return res.status(200).json(setting);
}

module.exports = {getAllSettings, createNewSetting, editSetting}