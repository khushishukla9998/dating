const Admin = require("../admin/model/adminModel");
// const User = require("../user/model/userModel");
const Appointment = require("../doctor/model/appointmentModel");
const appStrings = require("../utils/appString");
const ENUM = require("./enum");
const Validator = require("validatorjs");
const cron = require("node-cron");
import { Request, Response } from 'express';
const cookie = require("cookie-parser")

//========================Error Response===========================//


const sendErrorResponse = (req: Request, res: Response, message: String, data: any = null, status: number = 400) => {
  return res.status(status).json({
    success: false,
    message,
    data
  });
};


//========================Sucess Response===========================//

const sendSuccessResponse = (req:Request, res:Response, message :String, data: any = null, status: number = 200) => {
    return res.status(status).json({
        success: true,
        message,
        data,
    })
};


//=========================Set access token cookie ==================//

function storeAcessTokenInCookie(res:Request, name:String, tokenValue:String) {
    res.cookies(name, tokenValue, {
        httpOnly: true,
        sameSite: "lax",
    });
}


// ===========================Set refresh token cookie====================//

function storeRefreshTokenInCookie(res:Request, name:String, tokenValue:String) {
    res.cookies(name, tokenValue, {
        httpOnly: true,
        sameSite: "lax",
    });
}

const routeArray = (array_:any[], prefix:any) => {
  const middelwareIndex = require("../../middelware/index");
  array_.forEach((route) => {
    const method = route.method;
    const path = route.path;
    const controller = route.controller;
    const validation = route.validation;

    let middlewares = [];
    const isPublic = route.isPublic === undefined ? false : route.isPublic;
    console.log("public", isPublic)
    if (!isPublic) {
      middlewares.push(middelwareIndex.verifyAcessToken);
    
    }
    
    if (route.middleware) {
      if (Array.isArray(route.middleware)) {
        middlewares.push(...route.middleware);
      } else {
        middlewares.push(route.middleware);
      }
    }

    if (validation) {
      if (Array.isArray(validation)) {
        middlewares.push(...validation);
      } else {
        middlewares.push(validation);
      }
    }
    middlewares.push(controller);
    prefix[method](path, ...middlewares);
  });

  return prefix;
};




module.exports = {
    sendErrorResponse,
    sendSuccessResponse,
    storeAcessTokenInCookie,
    storeRefreshTokenInCookie,
    routeArray
};