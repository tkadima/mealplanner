const bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors')
const mysql = require('mysql2')
require('dotenv').config()
const multer  = require('multer')
const { response } = require('express')

const app = express()
const PORT = process.env.PORT || 3001

app.use(bodyParser.json())
app.use(express.json())
app.use(cors())
app.use(express.static('uploads/images'));

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB,
})

app.get("/api", (req, res) => {
    res.json({ message: 'Hello from the server!' })
})


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/images');
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-')
        cb(null, "IMAGE-" + Date.now() + '-' + fileName)
    }
})

const upload = multer({ 
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
})

app.post('/api/food/new', upload.single('imageFile'), (req, res) => {
    let food = { 
        name: req.body.name,
        description: req.body.description, 
        quantity: req.body.quantity, 
        unit: req.body.unit,
        foodGroup: req.body.group, 
        calories: req.body.calories,
        imageFileName: req.file.filename
    } 
    let sql = "INSERT INTO food SET ?"
    let query = db.query(sql, food, (err) => {
        if (err) throw err
        res.send({food, file: req.file})
    })
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


app.put('/api/food/', upload.single('imageFile'), (req, res) => {
    const query ="UPDATE food SET name = ?, description = ?, quantity = ?, unit = ?, foodGroup = ?, calories = ?, imageFileName = ? WHERE id = ?"
    db.query(
        query, 
        [req.body.name, req.body.description, req.body.quantity, req.body.unit, 
            req.body.foodGroup, req.body.calories, req.file.filename, req.body.id],
        (err, result) => {
            if (err) {
                console.log(err)
            }
            else {
                res.setHeader('Content-Type', 'application/json')
                let responseBody = {...req.body, imageFileName: req.file.filename}
                res.status(200).send(responseBody)
            }
        }
    )
})

app.delete('/api/food/:id', (req, res) => {
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

app.delete('/api/food', (req, res) => {
    db.query(
        'DELETE FROM food',
        (err, result) => {
            if(err){
                console.log(err)
            }else {
                res.send(result)
            }
        }
    )
})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})