require('dotenv').config()
import { NextFunction, Request, Response } from 'express';
import { loginSchema } from '../utils/validators/auth';
import { Asserts } from 'yup'
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import db from '../models'
import { SECRET_KEY } from '../constants';

interface LoginInput extends Asserts<typeof loginSchema> {}


class AuthController {
  async login(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try{
      const {
        email,
        password
      }: LoginInput = loginSchema.validateSync(req.body)
      const user = await db.Admin.findOne({
        where:{
          email
        }
      })
      if(!user) return next("User not found")

      
      bcrypt.compare(password, user.password, async (err: any, res: any) => {
        if(err){
          throw new Error(err)
        }
        if(!res){
          throw new Error("Invalid password")
        }
      })
      
      const key = jwt.sign(user.toJSON(), SECRET_KEY)
      
      res.json({
        success: true,
        token: key
      })
    }catch(err){
      console.log("Somethig fucked up")
      return next(err)
    }
  }

  async me(req: Request, res: Response, next: NextFunction){
    try{
      res.json({
        success: true,
        data: req.user
      })
    }catch(err){
      console.log("Error")
    }
  }
}

export default new AuthController();
