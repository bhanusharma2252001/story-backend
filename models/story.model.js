const mongoose = require("mongoose");
const { Types, Schema, model  } = mongoose;
const storySchema = new Schema(
  {
    prompt: {
      type: String,
      required: true,
    },
    story: {
      type: String,
      required: true,
    },
    createdBy: {
      type: Types.ObjectId,
      ref: "User",
    },
    upvoatedBy: [
      {
        type: Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Story = model('Story', storySchema);
module.exports = {
  Story
}
