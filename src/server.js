/* eslint-disable no-console */

import express from 'express'
import { CONNECT_DB, GET_DB } from '~/config/mongodb'

const START_SERVER =() => {

  const app = express()

  const hostname = 'localhost'
  const port = 8017

  app.get('/', async (req, res) => {
    console.log(await GET_DB().listCollections().toArray())
    res.end('<h1>Hello World!</h1><hr>')
  })
  app.listen(port, hostname, () => {
    // eslint-disable-next-line no-console
    console.log(`Hello Duong Dev, I am running at http://${hostname}:${port}/`)
  })

}

// iife
(async () =>{
  try {
    console.log('Connecting to MongoDB Cloud Atlas!')
    CONNECT_DB()
    console.log('Connected to MongoDB Cloud Atlas!')

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