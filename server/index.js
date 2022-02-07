const bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors')
const mysql = require('mysql2')
require('dotenv').config()
const multer  = require('multer')

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
        console.log('server file', file)
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

app.post('/imageUpload', upload.single('imageFile'), (req, res) => {
    res.send({file: req.file})
})

app.post('/api/food/new', (req, res) => {
    let data = { 
        name: req.body.name,
        description: req.body.description, 
        quantity: req.body.quantity, 
        unit: req.body.unit,
        foodGroup: req.body.group, 
        calories: req.body.calories,
        imageFileName: req.body.imageUrl
    } 
    let sql = "INSERT INTO food SET ?"
    let query = db.query(sql, data, (err) => {
        console.log('data', data)
        if (err) throw err
        res.send({ 
            name: req.body.name,
            description: req.body.description, 
            quantity: req.body.quantity, 
            unit: req.body.unit,
            foodGroup: req.body.group, 
            calories: req.body.calories,
            imageFileName: req.body.imageUrl
        } )
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

// app.get('/images', (req, res) => {
//     fs.readdir('/uploads/images', (err, files) => {
//         files.forEach(file => {
//             console('file', file)
//         })
//     })
// })

app.put('/api/food/', (req, res) => {
    const query ="UPDATE food SET name = ?, description = ?, quantity = ?, unit = ?, foodGroup = ?, calories = ? WHERE id = ?"
    db.query(
        query, 
        [req.body.name, req.body.description, req.body.quantity, req.body.unit, req.body.foodGroup, req.body.calories, req.body.id],
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