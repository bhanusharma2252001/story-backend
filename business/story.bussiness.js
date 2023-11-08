const { Story } = require("../models/story.model");
const { Configuration, OpenAIApi } = require("openai");
const { paginateDBQueries } = require("../utils/paginate")
const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);
const limit = 20;

const createStory = async (user, data) => {
  // const completion = await openai.createChatCompletion({
  //   model: "gpt-3.5-turbo",
  //   messages: [
  //     { role: "system", content: "system message" },
  //     {
  //       role: "user",
  //       content: `Generate a story for this prompt ${data.prompt}`,
  //     },
  //   ],
  // });

  const newStory = new Story({
    ...data,
    // story: completion.data.choices[0].message.content,
    createdBy: user._id,
  });
  const createdStory = await newStory.save();

  if (createdStory) return { createdStory };
  throw new Error("Server Error");
};

const getStory = async (user, data, page) => {
  if (!page) page = 1;
  let skip = page > 0 ? limit * (page - 1) : 0;

  const count = await Story.countDocuments({ ...data.filters, createdBy: user._id });
  if (count < 1) throw new Error("Stories Does Not Exist");

  const stories = await Story.find({ ...data.filters, createdBy: user._id })
    .sort(data.sort)
    .skip(skip)
    .limit(+limit)
    .populate('upvoatedBy')
    .lean();
  return paginateDBQueries(stories, count);
};

const upvoteStory = async (user, id) => {

  const alreadyUpvoatedByUser = await Story.findOne({ upvoatedBy: user._id });
  if (alreadyUpvoatedByUser) throw new Error("you've already upvoted this story");

  const updatedStory = await Story.findByIdAndUpdate(
    id,
    { $push: { upvoatedBy: user._id } },
    { new: true }
  );
  if (updatedStory) {
    return { updatedStory };
  }
  throw new Error("Server Error");
};

const getTopVotedStories = async (user) => {
  const foundStories = await Story.find({})
  .sort({ upvoatedBy: -1 })
  .limit(30)
  .populate('createdBy');
  return { foundStories };
};

const deleteStory = async ( user, id ) => {
  const createdByUser = await Story.findOne({ _id:  id,createdBy: user._id });
  if (!createdByUser) throw new Error("This story is not created by you or does not exist.");
  
  const deletedStory = await Story.findByIdAndDelete(id);
  if(deletedStory) {
    return { deletedStory }
  }
  throw new Error("Not Exists.");

}

module.exports = {
  createStory,
  getStory,
  upvoteStory,
  getTopVotedStories,
  deleteStory
};
