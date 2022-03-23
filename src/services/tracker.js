import PointService from "./point";
import axios from "axios";

class TrackerService {
  runTracker = async () => {
    let now = new Date();
    let timeTillHour =
      new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        now.getHours(),
        0,
        0,
        0
      ) - now;
    if (timeTillHour < 0) {
      timeTillHour += 3600000;
    }
    let timeTillDay =
      new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0) -
      now;

    if (timeTillDay < 0) {
      timeTillDay += 86400000;
    }

    console.log("time till hour:", timeTillHour);
    console.log("time till day:", timeTillDay);

    setTimeout(this.startMin, timeTillHour);
    setTimeout(this.startHour, timeTillHour);
    setTimeout(this.startDay, timeTillDay);
  };

  trackMinutes = () => {
    const { ETHERSCAN_API_KEY } = process.env;
    axios
      .get("https://api.etherscan.io/api", {
        params: {
          module: "gastracker",
          action: "gasoracle",
          apikey: ETHERSCAN_API_KEY,
        },
      })
      .then((result) => {
        PointService.add(
          result.data.result.ProposeGasPrice,
          new Date().getTime(),
          "min"
        );
      });
  };

  trackHours = async () => {
    const now = new Date().getTime();
    const earliest = now - 3600000; //hour
    const points = await PointService.getMin(earliest, now);
    let averagePrice = 0;
    for (const point of points) {
      averagePrice += point.gasPrice;
    }
    console.log("avg price before division:", averagePrice);
    averagePrice /= points.length;
    PointService.add(averagePrice, now - 1800000, "hour"); //save it as middle of the hour
  };

  trackDays = async () => {
    const now = new Date().getTime();
    const earliest = now - 86400000; //day
    const points = await PointService.getHour(earliest, now);
    let averagePrice = 0;
    for (const point of points) {
      averagePrice += point.gasPrice;
    }
    if (points.length != 0) averagePrice /= points.length;
    PointService.add(averagePrice, now - 43200000, "day"); //save it as being at noon
  };

  startMin = () => {
    console.log("starting to save minutes");
    this.trackMinutes();
    setInterval(this.trackMinutes, 300000);
  };

  startHour = async () => {
    console.log("starting to save hours");
    this.trackHours();
    setInterval(this.trackHours, 3600000);
  };

  startDay = async () => {
    console.log("starting to save days");
    this.trackDays();
    setInterval(this.trackDays, 86400000);
  };
}

export default new TrackerService();
