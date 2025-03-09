require('dotenv').config()
const express = require('express')
const axios = require('axios')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

const { registerUser, registerQR, getMalls, signIn, getUserInfo, payTicket } = require('./db/db')

// const API_KEY = process.env.GOOGLE_API_KEY; // Store key in .env

app.post('/create-user', async (req, res) => {
    console.log("in create-user route")
    console.log("req object: ", req.body)
    const { user, pass } = req.body

    try {
        const result = await registerUser(user, pass)
        res.status(200).json("success")
    } catch (error) {
        console.log(error)
    }
})

app.get('/sign-in', async (req, res) => {
    console.log("in sign in")
    const { user, pass } = req.query

    try {
        const userId = await signIn(user, pass)
        console.log("id returned: ", userId)
        if (userId) {
            const userInfo = await getUserInfo(userId)
            console.log("user data: ", userInfo)
            if (userInfo) {
                res.status(200).json({ email: user, id: userId, ticketInfo: userInfo})
            } else {
                res.status(200).json({ id:userId, ticketInfo: null })
            }
        } else {
            res.status(400).json("no user with those credentials found")
        }
    } catch (error) {
        console.error(error)
    }
})

app.get('/get-malls', async (req, res) => {
    console.log("in getting malls route")
    const { state } = req.query
    console.log("state passed: ", state)

    try {
        const result = await getMalls(state)
        console.log("result of db api: ", result)
        if (result.length > 0) {
            const malls = result.map(mall => mall.name)
            console.log("malls after map: ", malls)
            res.status(200).json(malls)
        } else {
            res.status(200).json([])
        }
    } catch (error) {
        console.log(error)
    }
})

app.post("/register-qr", async (req, res) => {
    try {
        const { userId } = req.body
        console.log("user id being passed: ", userId)
        const ticketInfo = await registerQR(userId)
        console.log(ticketInfo)
        if (ticketInfo) {
            res.status(200).json(ticketInfo)
        } else {
            res.status(400).json("Error creating qr registry and getting datetime")
        }
    } catch (error) {
        console.error(error)
    }
})

app.post('/get-qr', async (req, res) => {
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

app.post('/pay-ticket', async (req, res) => {
    console.log("in pay ticket")
    const { qrcodeId } = req.body
    console.log("qr code passed: ", qrcodeId)

    try {
        const result = await payTicket(qrcodeId)
        if (result) {
            res.status(200).json(result)
        } else {
            res.status(400).json("no ticket found with given id")
        }
    } catch (error) {
        console.error(error)
    }
})

app.listen(5707, () => console.log('Server running on port 5707'));
