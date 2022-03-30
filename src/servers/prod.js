import app from "~/app";
import cors from "cors";
import compression from "compression";
import mongoose from "mongoose-fill";
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

app.use(cors({ origin: ["https://eth-gas-tracker.netlify.app", "*"] })); //allow everything for now
app.use(compression());
app.use(function (req, res, next) {
  //console.log(app.get('env'))
  console.log(req.headers.origin);
  /* switch (req.headers.origin) {
		case 'https://api.halvedcut.com':
			app.set('env', 'production')
			break
	} */
  app.set("env", "production");
  console.log(app.get("env"));

  next();
});

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
