const mongoose = require("mongoose");
const { Types, Schema } = mongoose;
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
