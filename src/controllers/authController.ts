require('dotenv').config()
import { NextFunction, Request, Response } from 'express';
import { loginSchema } from '../utils/validators/auth';
import { Asserts } from 'yup'
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import db from '../models'

interface LoginInput extends Asserts<typeof loginSchema> {}


class AuthController {
  async login(req: Request, res: Response, next: NextFunction){
    try{
      const {
        email,
        password
      }: LoginInput = loginSchema.validateSync(req.body)
      const user = await db.User.findOne({
        where:{
          email
        }
      })
      if(!user) throw new Error("User not found")
      const key = bcrypt.compare(password, user.password, (err: any, res: any) => {
        if(err) throw new Error("Invalid password")
        const accessToken = jwt.sign(user, process.env.SECRET_KEY)
        return accessToken
      })
      
      res.json({
        success: true,
        token: key
      })
    }catch(err){
      throw new Error(err)
    }
  }
}

export default new AuthController;
