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


async function registerUser(name, pass) {
    try {
        const result = await pool.query(`
            INSERT INTO Users (name, password)
            VALUES (?, ?)
        `, [name, pass])
    } catch (error) {
        console.log(error)
    }

}

async function registerQRCode(user, codeInfo) {
    try {
        const newCode = await pool.query(`
            INSERT INTO QRcodes (identifier)
            VALUES (?)
        `, [codeInfo])

        const userCode = await pool.query(`
            INSERT INTO UsersQR (userId, qrcodeId, status)
            VALUES (1, 1, 'open')
        `, [user, codeInfo])


    } catch (error) {
        console.log(error)
    }
}


async function getMalls(state) {
    try {
        const [result] = await pool.query(`
            SELECT name FROM Malls
            WHERE state = ?
        `, [state])
        return result
    } catch (error) {
        console.log(error)
    }

}

module.exports = {
    registerUser,
    registerQRCode,
    getMalls
};