import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

const MONGO_PORT = process.env.MONGO_PORT || 27017
const MONGO_URL = process.env.MONGO_URL || 'localhost'
const MONGODB = `mongodb://${MONGO_URL}:${MONGO_PORT}`

mongoose.connect(MONGODB).then(() => {
    server.listen(port)
    server.on('error', onError)
    server.on('listening', onListening)
    console.log(`mongodb connected ${MONGODB_URL}`)
}).catch(err => {
    console.log(err)
    process.exit(1)
})

const PORT = process.env.PORT || 3001
const CORS_PORT = process.env.CORS_PORT || 3000
const CORS_URL = process.env.CORS_URL || 'localhost'

const app = express()

const corsOption = {
    origin: `http://${CORS_URL}:${CORS_PORT}`
}
app.use(cors(corsOption))

app.get('/test', (req, res) => {
    res.send("Hello from express")
})

app.listen(PORT,() => {
    console.log(`Listening on port ${PORT}`);
})