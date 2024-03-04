
import {env} from '~/config/environment'

import { MongoClient, ServerApiVersion } from 'mongodb'

//khoi tao 1 doi tuong instance  ban dau la null (vi chua connect)
let trelloDatabaseInstance = null

//khoi tao 1 doi tuong client clientinstance de connect mongodb
const mongoClientInstance = new MongoClient(env.MONGODB_URI, {
  serverApi:{
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

export const CONNECT_DB = async () => {
  // goi ket noi voi mongodb atlas voi uri da khai bao
  await mongoClientInstance.connect()

  //ket noi thanh con thi lay database theo ten va gan nguoc no la len cai bien o tren
  trelloDatabaseInstance = mongoClientInstance.db(env.DATABASE_NAME)
}

// dong ket noi mongodb
export const CLOSE_DB = async () => {

  await mongoClientInstance.close()

}


// func get_db : nay co nhiem vu export ra trello database instance sau khi da connect thanh cong
//den mongodb de su dung o nhieu noi va phai dam bao chi luon goi get Db nay sau khi ket noi thanh cong
export const GET_DB = () => {
  if (!trelloDatabaseInstance) throw new Error('Must connect to Database first!')
  return trelloDatabaseInstance
}
