import express from 'express'
import cors from 'cors'
const PORT = process.env.PORT || 3001
const CORS_PORT = process.env.CORS_PORT || 3000
const CORS_URL = process.env.CORS_URL || 'localhost'
console.log(PORT, CORS_PORT, CORS_URL)
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