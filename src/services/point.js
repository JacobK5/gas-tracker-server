import Point from "../models/point";

class PointService {
  // get = (req) => {
  //   return Point.find().exec(); //I think this should be good
  // };

  getMin = (earliest, latest) => {
    return Point.find({
      type: "min",
      time: { $gte: earliest, $lte: latest },
    })
      .sort({ time: 1 })
      .exec();
  };

  getHour = (earliest, latest) => {
    return Point.find({
      type: "hour",
      time: { $gte: earliest, $lte: latest },
    }).exec();
  };

  getDay = (earliest, latest) => {
    return Point.find({
      type: "day",
      time: { $gte: earliest, $lte: latest },
    }).exec();
  };

  add = (gasPrice, time, type) => {
    // return new Point({ gasPrice, time, type }).save().then((pt) => {
    //   console.log("saved", pt);
    // });
  };
}

export default new PointService();
