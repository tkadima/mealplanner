'use strict'

let requiredVariables = ['DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB', 'PORT']

requiredVariables.forEach((variable) => {
    if(!process.env[variable]) throw new Error(`Missing env variable ${variable}`)
})

const config = {
    server: {
        port: Number(process.env.PORT)
    }
}

module.exports = config