import bodyParser from 'body-parser'
import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import 'reflect-metadata'
import { createConnection } from './database'
import { routes } from './routes'

const app = express()

createConnection(process.env.POSTGRES_HOST)
    .then(() => console.log('Database connection created successfully'))
    .catch((error) => console.log(error))

// app.use(express.json())
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(routes)

export { app }
