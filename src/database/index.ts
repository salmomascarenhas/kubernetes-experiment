import * as dotenv from 'dotenv'
import "reflect-metadata"
import { DataSource } from "typeorm"
dotenv.config()

const dataSource = new DataSource({
    type: 'postgres',
    host: process.env.POSTGRES_HOST || 'localhost',
    port: parseInt(process.env.POSTGRES_PORT) || 5432,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    ssl: false,
    synchronize: true,
    logging: false,
    entities: ['src/database/entities/*.entity.ts'],
    migrations: ['src/database/migrations/*.ts'],
    subscribers: [],
})

const createConnection = (host = 'postgres'): Promise<DataSource> => {
    return dataSource.setOptions({ host }).initialize()
}

export { createConnection }

export default dataSource