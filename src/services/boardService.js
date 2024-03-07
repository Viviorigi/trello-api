/* eslint-disable no-useless-catch */

import { slugify } from '~/utils/formaters'
import { boardModel } from '~/models/boardModel'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'

const createNew = async (reqBody) => {
  try {
    // xu ly logic du lieu tuy dac thu
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title)
    }
    // goi toi tang model
    const createdBoard = await boardModel.createNew(newBoard)

    //lay ban ghi board sau khi goi
    const getNewBoard = await boardModel.findOneById(createdBoard.insertedId)


    //tra ket qua ve,trong service luon phai co return
    return getNewBoard
  } catch (error) {throw error}

}

const getDetails = async (boardId) => {
  try {

    const board = await boardModel.getDetails(boardId)
    if (!board) {throw new ApiError(StatusCodes.NOT_FOUND, 'Board NOT FOUND!')}
    return board
  } catch (error) {throw error}

}

export const boardService = {
  createNew,
  getDetails
}