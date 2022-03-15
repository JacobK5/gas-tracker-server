import mongoose from "mongoose";

import schema from "./schemas";

const Point = mongoose.model("Point", schema);

export default Point;
