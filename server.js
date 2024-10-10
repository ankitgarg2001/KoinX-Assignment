import mongoose from 'mongoose'
import app from './app.js'
import config from './src/config/config.js'

let server
mongoose.connect(config.MONGO_URI).then(() => {
  console.info('Connected to MongoDB')
  server = app.listen(config.PORT, '0.0.0.0', () => {
    console.info(`Listening to port ${config.PORT}`)
  })
})

const exitHandler = () => {
  if (server) {
    server.close(() => {
      console.info('Server Closed')
      process.exit(1)
    })
  } else {
    process.exit(1)
  }
}

const unexpectedErrorHandler = (error) => {
  console.error(error)
  exitHandler()
}

process.on('uncaughtException', unexpectedErrorHandler)
process.on('unhandledRejection', unexpectedErrorHandler)

process.on('SIGTERM', () => {
  console.info('SIGTERM Recieved')
  if (server) {
    server.close()
  }
})

