import app from "~/app";
import cors from "cors";
import compression from "compression";
import mongoose from "mongoose-fill";
import axios from "axios";
import PointService from "../services/point";
import TrackerService from "../services/tracker";

const { PORT, MONGODB_USER, MONGODB_PASSWORD, MONGODB_CLUSTER, MONGODB_DB } =
  process.env;

const toPrint = {
  PORT,
  MONGODB_USER,
  MONGODB_PASSWORD,
  MONGODB_CLUSTER,
  MONGODB_DB,
};

console.log("proccess.env: ", toPrint);
console.log(
  `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_CLUSTER}/${MONGODB_DB}?retryWrites=true&w=majority`
);

import routes from "~/routes";
import tracker from "../services/tracker";
app.use(function (req, res, next) {
  app.set("env", "development");
  next();
});

app.use(cors({ origin: ["https://eth-gas-tracker.netlify.app", "*"] }));
app.use(compression());

app.get("/", function (req, res, next) {
  res.send("It works!");
});
app.use("/api/v1", routes);

//note the 3 options for connect in the crm are now defaults and shouldn't be added
mongoose
  .connect(
    `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_CLUSTER}/${MONGODB_DB}?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log(`Connected to MongoDB [${MONGODB_CLUSTER}/${MONGODB_DB}]`);

    app.use(function (err, req, res, next) {
      console.log("error", err);
      if (err.name === "UnauthorizedError") {
        res.status(401).json(err);
      } else {
        res.json({ msg: err.toString() });
      }
    });

    const port = PORT || 3000;
    app.listen(port, () => {
      console.log(`API listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB connection failed: ");
    console.log(error);
  });

TrackerService.runTracker();
