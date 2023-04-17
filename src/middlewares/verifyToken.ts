import { Request, Response, NextFunction } from 'express'
require('dotenv').config()
import * as jwt from 'jsonwebtoken'
import express from "express";

declare module 'express'{
    export interface Request{
        user?: any
    }
}


export const verifyToken = async (req: Request, _: Response, next: NextFunction) => {
    try{    
        if(!req.headers.authorization) return next("No token")
        jwt.verify(req.headers.authorization, process.env.SECRET_KEY, (err, decoded) => {
            if(err) return next("Invalid token")
            
            req.user = decoded
        })
        return next()

        



    }catch(err){
        return next(err)
    }
}
