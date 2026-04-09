

import express from "express";
const routes = express.Router();
import routeArray from "./route";
import commonUtils from "../utils/commonUtils"


commonUtils.routeArray(routeArray, routes );

export default  routes


