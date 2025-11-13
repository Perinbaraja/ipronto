import express from "express";
import { searchAllEvents } from "../controllers/eventController";

const router = express.Router();

router.get("/v3/events/searchAll", searchAllEvents);

const eventRoutes = router;
export default eventRoutes;
export { eventRoutes };
