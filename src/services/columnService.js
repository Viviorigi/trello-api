
import { boardModel } from '~/models/boardModel'
import { cardModel } from '~/models/cardModel'
import { columnModel } from '~/models/columnModel'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'

const createNew = async (reqBody) => {
  try {

    const newColumn = {
      ...reqBody
    }

    const createdColumn = await columnModel.createNew(newColumn)

    const getNewColumn = await columnModel.findOneById(createdColumn.insertedId)


    if ( getNewColumn) {
      // xu ly cau truc data truoc khi tra du lieu
      getNewColumn.cards = []

      //cap nhat mang columnOrderid trong collection board

      await boardModel.pushColumnOrderIds(getNewColumn)
    }
    return getNewColumn
  } catch (error) {throw error}

}

const update = async (columnId, reqBody) => {
  try {
    const updateData={
      ...reqBody,
      updatedAt: Date.now()
    }
    const updatedColumn = await columnModel.update(columnId, updateData)


    return updatedColumn
  } catch (error) {throw error}

}

const deleteItem = async (columnId) => {
  try {
    const targetColumn = await columnModel.findOneById(columnId)

    if (!targetColumn) {throw new ApiError(StatusCodes.NOT_FOUND, 'COLUMN NOT FOUND!')}

    //xoa column
    await columnModel.deleteOneById(columnId)
    //xoa toan bo card thuoc column tren
    await cardModel.deleteManyByColumnId(columnId)

    //xoa column id trong mang columnOrderIds cua board chua no
    await boardModel.pullColumnOrderIds(targetColumn)

    return { deleteResult: 'Card and Columns deleted successfully!' }
  } catch (error) {throw error}

}
export const columnService = {
  createNew,
  update,
  deleteItem
}