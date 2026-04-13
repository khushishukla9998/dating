import commonUtils from '../components/utils/commonUtils';
import appStrings from "../components/utils/appString";
import config from "../../config/dev.json";
// import redisClient from "../components/utils/redisClient";
// const User = require("../components/user/model/userModel");
import ENUM from "../components/utils/enum";
import appString from "../components/utils/appString";

import { Request, Response, NextFunction } from 'express';
import jwt, { TokenExpiredError, JsonWebTokenError,SignOptions } from 'jsonwebtoken';


// Define interface for the decoded JWT payload
interface UserPayload {
    id: string;
    userId?: string | object | undefined;
    admimId?: string | undefined; 
    type: string;
    [key: string]: any; 
}

declare global {
    namespace Express {
        interface Request {
            accessToken?: string | undefined;
            refreshToken?: string | undefined;
            userId?: string | object | undefined; 
            adminId?: string | object | undefined;
            type?: string | undefined;
            user?: UserPayload | undefined;
        }
    }
}
const REFRESH_SECRET = config.REFRESH_TOKEN_SECRET as string;
const REFRESH_TIME = config.REFRESH_TOKEN_TIME as string | number;


// Access token function
export function generateAccessToken(payload:any,expiresIn:any=config.REFRESH_TOKEN_TIME) {
    return jwt.sign(payload, config.ACCESS_TOKEN_SECRET,{expiresIn});
}

// Refresh token function
export function generateRefreshToken(payload:any,expiresIn:any=config.REFRESH_TOKEN_TIME) {
    return jwt.sign(payload, config.REFRESH_TOKEN_SECRET, {
        expiresIn
    });
 
}


// Verify accessToken
export async function verifyAcessToken(req: Request, res: Response, next: NextFunction) {
    try {
        console.log("verify acess token");
        // Strict extraction requiring explicit Authorization Header natively
        let token = req.headers.authorization?.split(' ')[1];
        console.log("token==========",token);

        if (!token) {
            return commonUtils.sendErrorResponse(req, res, appStrings.TOKEN_NOT_PROVIDED, null, 401);
        }

        console.log("decode");
        const decode = jwt.verify(token, config.ACCESS_TOKEN_SECRET) as UserPayload;
        console.log("decode:===================", decode);

        req.accessToken = token;
        req.refreshToken = req.cookies?.refreshToken;
        req.userId= decode.id || decode.userId;
        req.adminId = decode.id || decode.admimId;
        req.type = decode.type;
        req.user = decode;

        // Check if token exists in Redis for this user
        // const redisKey = `user:access:${decode.id}`;
        // const tokenInRedis = await redisClient.get(redisKey);

        // if (!tokenInRedis || tokenInRedis !== token) {
        //     return commonUtils.sendErrorResponse(req, res, appStrings.INVALID_TOKEN_IN_REDISH, null, 401);
        // }

        next();
    } catch (err: any) {
        console.error("Token verification error:", err.message);
        if (err instanceof TokenExpiredError) {
            return commonUtils.sendErrorResponse(req, res, appStrings.TOKEN_EXPIRED, null, 401);
        } else if (err instanceof JsonWebTokenError) {
            return commonUtils.sendErrorResponse(req, res, appStrings.INVALID_TOKEN, null, 401);
        } else {
            return commonUtils.sendErrorResponse(req, res, appStrings.SERVER_ERROR || "Internal Server Error", null, 500);
        }
    }
}

// Verify refresh token
export function verifyRefreshToken(token: string) {
    return jwt.verify(token, config.REFRESH_TOKEN_SECRET);
}
