/* eslint-disable no-useless-catch */

import { slugify } from '~/utils/formaters'
import { boardModel } from '~/models/boardModel'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import { cloneDeep } from 'lodash'
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

    // deep clone board tao ra mot cai moi de xu ly khong anh huong toi board ban dau tuy muc dich ma co clone deep hay khong
    const resBoard = cloneDeep(board)
    //Dua card ve dung column cua no

    resBoard.columns.forEach(column => {
      //cach 1
      // column.cards = resBoard.cards.filter(card => card.columnId.toString() === column._id.toString())

      //cach 2
      column.cards = resBoard.cards.filter(card => card.columnId.equals(column._id))
    })
    delete resBoard.cards

    return resBoard
  } catch (error) {throw error}

}

export const boardService = {
  createNew,
  getDetails
}