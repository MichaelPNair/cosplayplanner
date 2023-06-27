const db = require('../db/index.js')

function setUser(req, res, next)  {
    
    res.locals.userId = req.session.userId
    if (!req.session.userId){
        next()
        return
    }


    let sql = `select * from users where id = ${req.session.userId};`
    db.query(sql, (err, dbRes) => {
        if(err){
            console.log(err)
        } else {
            res.locals.user = dbRes.rows[0]
        }
        next()
    })

}

module.exports = setUser