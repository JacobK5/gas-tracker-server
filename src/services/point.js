import Point from "../models/point";

class PointService {
  // get = (req) => {
  //   return Point.find().exec(); //I think this should be good
  // };

  getMin = (earliest, latest) => {
    return Point.find({
      type: "min",
      time: { $gte: earliest },
      time: { lte: latest },
    });
  };

  getHour = (earliest, latest) => {
    return Point.find({
      type: "hour",
      time: { $gte: earliest },
      time: { lte: latest },
    });
  };

  getDay = (earliest, latest) => {
    return Point.find({
      type: "day",
      time: { $gte: earliest },
      time: { lte: latest },
    });
  };

  add = (gasPrice, time, type) => {
    //not sure exactly how this will work we'll see
    return new Point({ gasPrice, time, type }).save().then((pt) => {
      console.log(pt);
    });
  };
}

export default new PointService();
