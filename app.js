import express from 'express'
import routes from './src/Route/route.js'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import fetchData from './src/services/service.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/',routes);
app.get('/', (req, res) => {
  res.sendFile(join(__dirname, '/index.html'))
})

export default app