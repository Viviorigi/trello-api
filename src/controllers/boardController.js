import { StatusCodes } from 'http-status-codes'
import { boardService } from '~/services/boardService'

const createNew = async (req, res, next) => {
  try {

    // dieu huong du lieu sang tang Service
    const createdBoard = await boardService.createNew(req.body)
    // co ket qua tra ve client
    res.status(StatusCodes.CREATED).json(createdBoard)
  } catch (error) {next(error)}
}

const getDetails = async (req, res, next) => {
  try {

    // console.log(req.params);
    const boardId = req.params.id
    const board = await boardService.getDetails(boardId)

    res.status(StatusCodes.OK).json(board)
  } catch (error) {next(error)}
}

const update = async (req, res, next) => {
  try {
    const boardId = req.params.id
    const updatedBoard = await boardService.update(boardId, req.body)

    res.status(StatusCodes.OK).json(updatedBoard)
  } catch (error) {next(error)}
}


export const boardController = {
  createNew,
  getDetails,
  update
}