

const MONGODB_URI = 'mongodb+srv://duong2801:KaoTJH1og6Hak23Q@cluster0-duongdev.hp929qa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0-DuongDev'

const DATABASE_NAME = 'trello-duong-mern-stack'

import { MongoClient, ServerApiVersion } from 'mongodb'

//khoi tao 1 doi tuong instance  ban dau la null (vi chua connect)
let trelloDatabaseInstance = null

//khoi tao 1 doi tuong client clientinstance de connect mongodb
const mongoClientInstance = new MongoClient(MONGODB_URI, {
  serverApi:{
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

export const CONNECT_DB = async () => {
  // goi ket ni voi mongodb atlas voi uri da khai bao
  await mongoClientInstance.connect()

  //ket noi thanh con thi lay database theo ten va gan nguoc no la len cai bien o tren
  trelloDatabaseInstance = mongoClientInstance.db(DATABASE_NAME)
}

// func get_db : nay co nhiem vu export ra trello database instance sau khi da connect thanh cong
//den mongodb de su dung o nhieu noi va phai dam bao chi luon goi get Db nay sau khi ket noi thanh cong
export const GET_DB = () => {
  if (!trelloDatabaseInstance) throw new Error('Must connect to Database first!')
  return trelloDatabaseInstance
}