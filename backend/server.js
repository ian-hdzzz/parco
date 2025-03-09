require('dotenv').config()
const express = require('express')
const axios = require('axios')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

const { registerUser, registerQRCode, getMalls } = require('./db/db')

// const API_KEY = process.env.GOOGLE_API_KEY; // Store key in .env

app.post('/create-user', async (req, res) => {
    console.log("in create-user route")
    console.log("req object: ", req.body)
    const { name, pass } = req.body

    try {
        const result = await registerUser(name, pass)
    } catch (error) {
        console.log(error)
    }
})

app.post('/register-qr', async (req, res) => {
    console.log("in register qr code func")
    const { user, codeInfo } = req.body
    if (!qrCode || !mall) {
        return res.status(400).json({ error: "QR Code and Mall are required" });
    }

    try {
        const result = await registerQRCode(user, codeInfo)
    } catch (error) {
        console.log(error)
    }
})

app.get('/get-malls', async (req, res) => {
    console.log("in getting malls route")
    const { state } = req.body

    try {
        const result = getMalls(state)
        res.json(result)
    } catch (error) {
        console.log(error)
    }
})

// app.get('/api/malls', async (req, res) => {
//     console.log("made it to backend")
//     const { lat, lng } = req.query;
//     const radius = 5000;

//     const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=shopping_mall&key=${API_KEY}`;

//     try {
//         const response = await axios.get(url);
//         console.log(response.data)
//         res.json(response.data);
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to fetch places' });
//     }
// });

app.listen(5707, () => console.log('Server running on port 5707'));
