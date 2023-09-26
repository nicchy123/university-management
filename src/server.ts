import mongoose from 'mongoose'
import app from './app'
import config from './config'
import { Server } from 'http'
import { errorLogger, logger } from './shared/logger'

process.on('unhandledRejection', err => {
  errorLogger.error(err)
  process.exit(1)
})

let server: Server
async function main() {
  try {
    await mongoose.connect(config.database_url as string)
    logger.info('db connected')
    server = app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`)
    })
  } catch (er) {
    errorLogger.error(`db can not connect due to ${er}`)
  }

  process.on('unhandledRejection', err => {
    console.log(err)
    if (server) {
      console.log('server is closing....')
      server.close(() => {
        errorLogger.error(err)
        process.exit(1)
      })
    } else {
      process.exit(1)
    }
  })
}
main()

process.on('SIGTERM', () => {
  logger.info('SIGTERM is received')
  if (server) {
    server.close()
  }
})
