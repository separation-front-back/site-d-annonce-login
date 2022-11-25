import cors from 'cors'
import express from 'express'
import * as dotenv from 'dotenv'
import { DataSource } from 'typeorm'
import routes from './routes/routes'
import cookieSession from 'cookie-session'
import './auth/auth'
dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())
app.use(cookieSession({
    name: 'google-auth-session',
    keys: ['key1', 'key2']
  }))
  
const port = process.env.SERVER_PORT || 4000
const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME } = process.env

const AppDataSource = new DataSource({
    type: 'mysql',
    host: DB_HOST,
    port: Number(DB_PORT),
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    entities: ['src/model/*.ts'],
    synchronize: true,
})

AppDataSource.initialize()
    .then(() => {
        console.log('Data Source has been initialized!')
    })
    .catch((err) => {
        console.error('Error during Data Source initialization', err)
    })

app.use('/', routes)

app.listen(port, () => console.log('Silence, ça tourne sur le port : ' + port))
