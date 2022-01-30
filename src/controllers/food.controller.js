var db = require('../../server/index')

exports.getAllFood = (req, res) => {
    db.query("SELECT * FROM food", (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
           res.send(result)
        }
    })
}

exports.createNewFood = (req, res) => {
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
        res.send(JSON.stringify({ 'status': 200, 'error': null, 'results': results}))
    })
}

exports.updateFood = (req, res) => {
    const query ="UPDATE food SET name = ?, description = ?, quantity = ?, unit = ?, foodGroup = ?, calories = ?, imageUrl = ? WHERE id = ?"
    db.query(
        query, 
        [req.body.name, req.body.description, req.body.quantity, req.body.unit, req.body.foodGroup, req.body.calories, req.body.imageUrl, req.body.id],
        (err, result) => {
            if (err) {
                console.log(err)
            }
            else {
                console.log(result.affectedRows)
                res.send(result)
            }
        }
    )
}

exports.deleteFood = (req, res) => {
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
}