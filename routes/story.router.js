const express = require('express');
const router = express.Router();

const { wrapAsync } = require("../helpers/routerHelper");
const { createStory } = require("../controller/story.controller");

router.post("/", wrapAsync(createStory));

module.exports = router;