import express, { Router } from "express";
import PointService from "../services/point";

const pointRoutes = Router();

pointRoutes.route("/min").get((req, res) => {
  console.log("req:", req);
  PointService.getMin(req.params.earliest, req.params.latest).then((result) => {
    console.log(result);
    const formattedResult = result.map((point) => [point.gasPrice, point.time]);
    console.log(formattedResult);
    res.json(formattedResult);
  });
});

pointRoutes.route("/hour").get((req, res) => {
  PointService.getHour(req.params.earliest, req.params.latest).then(
    (result) => {
      console.log(result);
      const formattedResult = result.map((point) => [
        point.gasPrice,
        point.time,
      ]);
      console.log(formattedResult);
      res.json(formattedResult);
    }
  );
});

pointRoutes.route("/day").get((req, res) => {
  PointService.getDay(req.params.earliest, req.params.latest).then((result) => {
    console.log(result);
    const formattedResult = result.map((point) => [point.gasPrice, point.time]);
    console.log(formattedResult);
    res.json(formattedResult);
  });
});

export default pointRoutes;
