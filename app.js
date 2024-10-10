import express from 'express'
import routes from './src/Route/route.js'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/',routes);
app.get('/', (req, res) => {
  res.sendFile(join(__dirname, '/index.html'))
})

app.use((err, req, res, next) => {
    console.error(err.stack); 
  
    const statusCode = err.status || 500; 
  
    res.status(statusCode).json({
      success: false,
      err: err.message || "Internal Server Error",
      errStack: process.env.NODE_ENV === "development" ? err.stack : {}, 
    });
  });

export default app