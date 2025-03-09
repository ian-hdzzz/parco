// import mysql from 'mysql2'
// import dotenv from 'dotenv'
const mysql = require('mysql2')
const dotenv = require('dotenv')
dotenv.config()
 
const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()


async function registerUser(user, pass) {
    try {
        const result = await pool.query(`
            INSERT INTO Users (name, password)
            VALUES (?, ?)
        `, [user, pass])
    } catch (error) {
        console.log(error)
    }

}

async function signIn(user, pass) {
    try {
        const [result] = await pool.query(`
            SELECT id FROM Users
            WHERE name = ? AND password = ?
        `, [user, pass])
        if (result.length > 0) {
            return result[0].id
        } else return ""
    } catch (error) {
        console.log(error)
    }
}

async function getUserInfo(userId) {
    try {
        const [result] = await pool.query(`
            SELECT * FROM UsersQR
            WHERE userId = ? 
            AND (status = 'open' OR status = 'paid')
        `, [userId])
        console.log("result of getUserInfo: ", result)

        const [ticketInfo] = await pool.query(`
            SELECT * FROM QRcodes
            WHERE id = ?;    
        `, [result[0].qrcodeId])
        console.log("ticket info: ", ticketInfo)
        const createdTime = new Date(ticketInfo[0]?.created);

        const createdTimeInt = createdTime.getTime(); // Get time as milliseconds
        console.log(createdTimeInt)

        const allUserData = { qrcodeId: ticketInfo[0].id, ticketNumber: createdTimeInt, entryTime: createdTime, status: result[0].status, paid: ticketInfo[0].paid }
        console.log(allUserData)

        return allUserData
    } catch (error) {
        console.log(error)
    }
}


async function getMalls(state) {
    console.log("in getMalls")
    try {
        const [result] = await pool.query(`
            SELECT name FROM Malls
            WHERE city = ?
        `, [state])
        console.log("result of get malls: ", result)
        return result
    } catch (error) {
        console.log(error)
    }

}

async function registerQR(userId) {
    try {
        const [result] = await pool.query(`
            INSERT INTO QRcodes (paid)
            VALUES (NULL);
        `)

        const [createdResult] = await pool.query(`
            SELECT id, created FROM QRcodes WHERE id = LAST_INSERT_ID();
        `);
        const qrcodeId = createdResult[0]?.id;
        const createdTime = new Date(createdResult[0]?.created);

        const createdTimeInt = createdTime.getTime(); // Get time as milliseconds
        console.log("Created Time (as integer): ", createdTimeInt);

        const createUserQR = await pool.query(`
            INSERT INTO UsersQR (userId, qrcodeId)
            VALUES (?, ?);
        `, [userId, qrcodeId])

        const [status] = await pool.query(`
            SELECT status FROM UsersQR WHERE qrcodeId = LAST_INSERT_ID();    
        `);
        console.log("status: ", status)

        const email = await pool.query(`
            SELECT name FROM Users
            WHERE id = ?    
        `, [userId])
        // console.log("email selected: ", email)

        const ticketInfo = {email: email[0][0].name, ticketNumber: createdTimeInt, entryTime: createdTime, status: status[0].status}

        return ticketInfo
    } catch (error) {
        console.error(error)
    }
}


async function payTicket(qrcodeId) {
    console.log("inside payticket db func")
    try {
        const [result] = await pool.query(`
            UPDATE QRcodes
            SET paid = NOW()
            WHERE id = ?
        `, [qrcodeId])

        const [datetime] = await pool.query(`
            SELECT paid FROM QRcodes
            WHERE id = ?
        `, [qrcodeId])
        console.log(datetime)

        const [response] = await pool.query(`
            UPDATE UsersQR
            SET status = 'paid'
            WHERE qrcodeId = ?
        `, [qrcodeId])

        const datetimePaid = datetime[0].paid

        return datetimePaid
    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    registerUser,
    // registerQRCode,
    getMalls,
    signIn,
    getUserInfo,
    registerQR,
    payTicket
};