/* eslint-disable no-console */

import express from 'express'
import cors from 'cors'
import { corsOptions } from '~/config/cors'
import exitHook from 'async-exit-hook'
import { CONNECT_DB, CLOSE_DB } from '~/config/mongodb'
import { env } from '~/config/environment'
import { APIs_V1 } from '~/routes/v1'
import { errorHandlingMiddleware } from './middlewares/errorHandlingMiddleware'
const START_SERVER =() => {

  const app = express()

  app.use(cors(corsOptions))

  app.use(express.json())
  //USE APIs_V1
  app.use('/v1', APIs_V1)

  //Middleware xu li loi tap trung

  app.use(errorHandlingMiddleware)

  //moi truong production (cu the la dang support cho render)
  if (env.BUILD_MODE==='production') {
    app.listen(process.env.PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`3.Hello ${env.AUTHOR}, I am running at ${process.env.PORT}/`)
    })
  } else {
    //Moi truong local dev
    app.listen(env.LOCAL_DEV_APP_PORT, env.LOCAL_DEV_APP_HOST, () => {
      // eslint-disable-next-line no-console
      console.log(`3.Hello ${env.AUTHOR}, I am running at http://${env.LOCAL_DEV_APP_HOST}:${env.LOCAL_DEV_APP_PORT}/`)
    })
  }

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