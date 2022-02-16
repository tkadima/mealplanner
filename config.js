'use strict'
require('dotenv').config()

let requiredVariables = ['DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB', 'PORT']

requiredVariables.forEach((variable) => {
    if(!process.env[variable]) throw new Error(`Missing env variable ${variable}`)
})

const config = {
   db: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB,
   }
}

module.exports = config