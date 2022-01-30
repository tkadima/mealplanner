const express = require('express')
const cors = require('cors')
const path = require('path')
const bodyParser = require('body-parser')
const mysql = require('mysql2')

require('dotenv').config()

const PORT = process.env.PORT || 3001
const app = express()

app.use(cors())
app.use(express.json())
app.use(bodyParser.json())

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB,
})

app.get("/api", (req, res) => {
    res.json({ message: 'Hello from the server!' })
})

app.get('/api/food/', (req, res) => {
    db.query("SELECT * FROM food", (err, result) => {
        if (err) {
            console.log(err)
        }
        else{
            res.send(result)
        }
    })
})
app.post('/api/food/new', (req, res) => {
    console.log('server req', req)
    let data = { 
        name: req.body.name,
        description: req.body.description, 
        quantity: req.body.quantity, 
        unit: req.body.unit,
        foodGroup: req.body.group, 
        calories: req.body.calories,
        imageUrl: req.body.imageUrl
    } 
    let sql = "INSERT INTO food SET ?"
    let query = db.query(sql, data, (err, results) => {
        if (err) throw err
        res.send(JSON.stringify({ 'status': 200, 'error': null}))
    })
})

app.put('/api/food/', (req, res) => {
    console.log('updating in server')
    const query ="UPDATE food SET name = ?, description = ?, quantity = ?, unit = ?, foodGroup = ?, calories = ?, imageUrl = ? WHERE id = ?"
    db.query(
        query, 
        [req.body.name, req.body.description, req.body.quantity, req.body.unit, req.body.foodGroup, req.body.calories, req.body.imageUrl, req.body.id],
        (err, result) => {
            if (err) {
                console.log(err)
            }
            else {
                res.send(result)
            }
        }
    )
})

app.delete('/api/food/:id', (req, res) => {
    console.log('reach delete')
    db.query(
        'DELETE FROM food WHERE id = ?', 
        req.params.id, 
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        }
    )
})
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})