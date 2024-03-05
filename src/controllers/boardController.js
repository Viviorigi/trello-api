import { StatusCodes } from 'http-status-codes'


const createNew = async (req, res, next) => {
  try {
    // console.log(req.body)

    // dieu huong du lieu sang tang Service


    res.status(StatusCodes.CREATED).json({ message:'POST from Controller: APIs create new board' })
  } catch (error) {next(error)}
}


export const boardController = {
  createNew
}