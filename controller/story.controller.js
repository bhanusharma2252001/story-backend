const { createStory, getStory, upvoteStory, getTopVotedStories, deleteStory } = require("../business/story.bussiness");

exports.createStory = async (req, res) => await createStory(req.user, req.body);
exports.getStory = async (req, res) => await getStory(req.user, req.body, req.query.page);
exports.upvoteStory = async (req, res) => await upvoteStory(req.user, req.query.id);
exports.getTopVotedStories = async ( req, res ) => await getTopVotedStories(req.user);
exports.deleteStory = async (req, res ) => await deleteStory(req.user, req.query.id);
