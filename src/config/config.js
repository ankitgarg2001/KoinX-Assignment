import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

dotenv.config({ path: join(__dirname, '../../.env') })

const config = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  COIN_GECKO_API_KEY: process.env.COIN_GECKO_API_KEY,
  COIN_GECKO_URL: process.env.COIN_GECKO_URL
}

export default config
