import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { boardRoutes } from './boardRoutes'
const Router = express.Router()

//check APIs_V1 status
Router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({ message:'APIs v1 are ready to use' })
})
//board APIs
Router.use('/boards', boardRoutes)

export const APIs_V1 = Router