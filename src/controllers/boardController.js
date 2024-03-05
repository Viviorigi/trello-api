import { StatusCodes } from 'http-status-codes'



const createNew = async (req, res, next) => {
  try {
    // console.log(req.body)

    // dieu huong du lieu sang tang Service

    res.status(StatusCodes.CREATED).json({ message:'POST from Controller: APIs create new board' })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: error.message
    })
  }
}


export const boardController = {
  createNew
}