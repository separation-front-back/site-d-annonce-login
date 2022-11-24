import cors from 'cors'
import express from 'express'
import * as dotenv from 'dotenv'
dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => res.send('🏠'))

/**
 * On demande à Express d'ecouter les requêtes sur le port défini dans la config
 */
app.listen(process.env.API_PORT, () => console.log('Silence, ça tourne.'))