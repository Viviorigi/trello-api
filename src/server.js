/* eslint-disable no-console */

import express from 'express'
import exitHook from 'async-exit-hook'
import { CONNECT_DB, CLOSE_DB } from '~/config/mongodb'
import { env } from '~/config/environment'

const START_SERVER =() => {

  const app = express()

  const hostname = env.APP_HOST
  const port = env.APP_PORT

  app.get('/', (req, res) => {

    res.end('<h1>Hello World!</h1><hr>')
  })
  app.listen(port, hostname, () => {
    // eslint-disable-next-line no-console
    console.log(`3.Hello ${env.AUTHOR}, I am running at http://${hostname}:${port}/`)
  })

  //thuc hien cac tac vu cleanup truoc khi dung server
  exitHook(() => {
    console.log('4. Server is shuttingdown')
    CLOSE_DB()
    console.log('5. Disconnected MongoDb Cloud atlas')
  })
}

// iife
(async () => {
  try {
    console.log('1.Connecting to MongoDB Cloud Atlas!')
    CONNECT_DB()
    console.log('2.Connected to MongoDB Cloud Atlas!')

    //Khoi dong server backend sau khi connect database
    START_SERVER()
  } catch (error) {
    console.error(error)
    process.exit(0)
  }
})()

// // chi khi ket noi database thanh cong thi moi start server backend
// CONNECT_DB()
//   .then(() => {console.log('Connected to MongoDB Cloud Atlas!')})
//   .then(() => START_SERVER())
//   .catch(error => {
//     console.error(error)
//     process.exit(0)
//   })