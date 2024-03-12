/* eslint-disable no-useless-catch */

import { slugify } from '~/utils/formaters'
import { boardModel } from '~/models/boardModel'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import { cloneDeep } from 'lodash'
import { columnModel } from '~/models/columnModel'
import { cardModel } from '~/models/cardModel'

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

const update = async (boardId, reqBody) => {
  try {
    const updateData={
      ...reqBody,
      updatedAt: Date.now()
    }
    const updatedBoard = await boardModel.update(boardId, updateData)


    return updatedBoard
  } catch (error) {throw error}

}
const moveCardToDifferentColumn = async (reqBody) => {
  try {
    //b1 :Cap nhat mang cardOrderIds cua column ban dau chua no
    await columnModel.update(reqBody.preColumnId, {
      cardOrderIds:reqBody.prevCardOrderIds,
      updatedAt: Date.now()
    })
    //b2: cap nhat mang cardOrderIds cua column tiep theo
    await columnModel.update(reqBody.nextColumnId, {
      cardOrderIds:reqBody.nextCardOrderIds,
      updatedAt: Date.now()
    })
    //b3: cap nhat la truong columnId moi cua card da keo
    await cardModel.update(reqBody.currentCardId, {
      columnId: reqBody.nextColumnId
    })
    return { updateResult: 'Successfully' }
  } catch (error) {throw error}

}

export const boardService = {
  createNew,
  getDetails,
  update,
  moveCardToDifferentColumn
}