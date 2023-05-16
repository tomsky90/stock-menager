const express = require('express');
const router = express.Router();

const requireAdminAuth = require('../middleware/requireAdminAuthorization');

const { getAllSettings, createNewSetting, editSetting } = require('../controllers/settingsController')

//get all settings
router.get('/get-settings', getAllSettings);

//create new setting
router.post("/create", requireAdminAuth, createNewSetting);

//edit setting
router.patch("/edit/:id", requireAdminAuth, editSetting);

module.exports = router;