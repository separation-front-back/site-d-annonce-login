import cors from 'cors'
import express from 'express'
import * as dotenv from 'dotenv'
dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())
const port = process.env.SERVER_PORT || 4000

app.get('/', (req, res) => res.send('🏠'))

app.get('/login', (req, res) => {
    res.send('🔑')
})

app.listen(port, () => console.log('Silence, ça tourne sur le port : ' + port))
