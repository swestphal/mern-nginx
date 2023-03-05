import express from 'express'
import cors from 'cors'

import { MongoClient } from 'mongodb'
const MONGO_PORT = process.env.MONGO_PORT || 27017
const MONGO_URL = process.env.MONGO_URL || '127.0.0.1'

const MONGODB = `mongodb://${MONGO_URL}:${MONGO_PORT}`


const PORT = process.env.PORT || 3001
const CORS_PORT = process.env.CORS_PORT || 3000
const CORS_URL = process.env.CORS_URL || 'localhost'

const app = express()

//const url = `mongodb://mongodb:${MONGO_PORT}`
const client = new MongoClient(MONGODB)

async function connectToMongo() {
    client.connect()
}

connectToMongo()

async function runMongo(){
    let isConnected = false
    try {
        await client.connect()
        await client.db("admin").command( {ping:1} )
        isConnected=true
        console.log('connected to mongo')
    } catch (err) {
        console.log(err)
    } finally {

        return isConnected
    }
}

//const corsOption = {
//    origin: `http://${CORS_URL}:${CORS_PORT}`
//}
app.use(cors())



app.get('/test', (req, res) => {
    res.send("Hello from express")
})

app.get('/healthcheck', async (req, res) => {

    const result = await runMongo()
    console.log(result)
    return res.status(201).json({response: result})
})

app.listen(PORT,() => {
    console.log(`Listening on port ${PORT}`);
})