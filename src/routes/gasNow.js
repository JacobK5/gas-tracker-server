import express, { Router } from "express";
import axios from "axios";

const gasNowRoutes = Router();

const { ETHERSCAN_API_KEY } = process.env;

gasNowRoutes.route("/").get((req, res) => {
  const result = axios
    .get("https://api.etherscan.io/api", {
      params: {
        module: "gastracker",
        action: "gasoracle",
        apikey: ETHERSCAN_API_KEY,
      },
    })
    .then((result) => {
      console.log("result data: ", result.data);
      res.json(result.data);
    });
});

export default gasNowRoutes;
