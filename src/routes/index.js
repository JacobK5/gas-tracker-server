import { Router } from "express";
import gasNow from "./gasNow";
import point from "./point";

const router = Router();

router.use("/gasNow", gasNow);
router.use("/point", point);

export default router;
