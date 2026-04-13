
const appStrings = require("../utils/appString");
const ENUM = require("./enum");
const Validator = require("validatorjs");

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

const sendSuccessResponse = (req: Request, res: Response, message: String, data: any = null, status: number = 200) => {
  return res.status(status).json({
    success: true,
    message,
    data,
  })
};


//=========================Set access token cookie ==================//

function storeAcessTokenInCookie(res: Response, token: String) {
  res.cookie("accessToken", token, {
    httpOnly: true,
    sameSite: "lax",
  });
}


// ===========================Set refresh token cookie====================//

function storeRefreshTokenInCookie(res: Response, token: String) {
  res.cookie("refreshToken", token, {
    httpOnly: true,
    sameSite: "lax",
  });
}

const routeArray = (array_: any[], prefix: any) => {
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

const validatorUtilWithCallback = (req: Request, res: Response, next: any, rules: any, customMessages: any = {}) => {
    const validation = new Validator(req.body, rules, customMessages);
    validation.passes(() => next());
    validation.fails(() => {
        const errors = validation.errors.all();
        const firstErrorKey = Object.keys(errors)[0];
        if (!firstErrorKey) return sendErrorResponse(req, res, "Validation failed", null, 400);
        
        const firstErrorMessage = (errors as any)[firstErrorKey][0];
        return sendErrorResponse(req, res, firstErrorMessage, null, 400);
    });
};

export default { sendErrorResponse, sendSuccessResponse, storeAcessTokenInCookie, storeRefreshTokenInCookie, routeArray, validatorUtilWithCallback }


