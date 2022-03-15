import { Mongoose, Schema } from "mongoose";

const schema = new Schema(
  {
    gasPrice: {
      type: Number,
      required: true,
    },
    time: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  {
    collection: "Point",
  }
);

export default schema;
