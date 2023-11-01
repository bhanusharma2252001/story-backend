const { createStory } = require("../business/story.bussiness");

exports.createStory = async (req, res) => await createStory(req.body);
