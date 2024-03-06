/* eslint-disable no-useless-catch */

import { slugify } from '~/utils/formaters'

const createNew = async (reqBody) => {
  try {
    // xu ly logic du lieu tuy dac thu
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title)
    }
    // goi toi tang model


    //tra ket qua ve,trong service luon phai co return
    return newBoard
  } catch (error) {throw error}

}

export const boardService = {
  createNew
}