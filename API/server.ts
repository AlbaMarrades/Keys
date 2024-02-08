import app from './src/api'
import { DBClient } from './src/infrastructure/DBClient'
import Logger from './src/infrastructure/logger'

const port = 3001

app.listen(port, () => {
  Logger.info(`Example app listening on port ${port}`)
})

const database = DBClient.getInstance()
void database.connect().then(() => Logger.info('Mongo connected'))

process.on('SIGTERM', async ()=>{
  Logger.info('Mongo disconnected')
  await database.disconnect()
})