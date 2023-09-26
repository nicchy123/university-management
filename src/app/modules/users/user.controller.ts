import { RequestHandler } from 'express'
import { usersService } from './user.service'
// import {z} from 'zod'

const createUser: RequestHandler = async (req, res, next) => {
  try {
    const { user } = req.body

    // const createUserZodSchema = z.object({

    // })

    const result = await usersService.createUser(user)
    res.status(200).json({
      success: true,
      message: 'user crated successfully',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}
export const userController = { createUser }
