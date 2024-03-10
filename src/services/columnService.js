
import { boardModel } from '~/models/boardModel'
import { columnModel } from '~/models/columnModel'

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


export const columnService = {
  createNew
}