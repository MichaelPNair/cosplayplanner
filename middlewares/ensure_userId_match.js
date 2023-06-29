const db = require('../db/index.js')

function ensuredUserIdMatch(req, res, next){

    let sql = `select user_id from cosplays where cos_id = $1;`
    let cos_id = req.params.id
    db.query(sql, [cos_id], (err, dbRes) => {
        if(dbRes.rows[0].user_id === req.session.userId){
            next()
            return
        }
        res.redirect('/')
    })
}

module.exports = ensuredUserIdMatch