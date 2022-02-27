const config = require('../config')
const multer  = require('multer')
const mysql = require('mysql2')


module.exports = (router) => {   
    const db = mysql.createPool(config)

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

    router.get('/food/', (req, res) => {
        db.query("SELECT * FROM food", (err, result) => {
            if (err) {
                console.log(err)
            }
            else {
                res.send(result)
            }
        })
    })

    router.post('/food/new', upload.single('imageFile'), (req, res) => {
        let food = { 
            name: req.body.name,
            description: req.body.description, 
            quantity: req.body.quantity, 
            unit: req.body.unit,
            foodGroup: req.body.group, 
            calories: req.body.calories,
            imageFileName: req.file.name
        } 
        let sql = "INSERT INTO food SET ?"
        let query = db.query(sql, food, (err) => {
            if (err) throw err
            res.send({food, file: req.file})
        })
    })



    router.put('/food/', upload.single('imageFile'), (req, res) => {
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

    router.delete('/food/:id', (req, res) => {
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
    
    router.delete('/api/food', (req, res) => {
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
}