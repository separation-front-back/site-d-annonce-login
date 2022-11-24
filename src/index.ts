import cors from 'cors'
import express from 'express'
import * as dotenv from 'dotenv'
import { DataSource } from 'typeorm'
import routes from './routes/routes'
import './auth/auth'

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())
const port = process.env.SERVER_PORT || 4000

const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'database',
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
