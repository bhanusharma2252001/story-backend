const express = require('express');
const router = express.Router();

const { wrapAsync } = require("../helpers/routerHelper");
const { createStory, getStory, upvoteStory, getTopVotedStories, deleteStory } = require("../controller/story.controller");
const {  authenticate } = require("../middlewares/authenticate")

router.post("/", authenticate, wrapAsync(createStory));
router.post("/get", authenticate, wrapAsync(getStory));
router.put("/upvoteStory", authenticate, wrapAsync(upvoteStory));
router.get("/getTopVotedStories", authenticate, wrapAsync(getTopVotedStories));
router.delete("/", authenticate, wrapAsync(deleteStory));


module.exports = router;