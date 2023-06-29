function ensuredLoggedIn(req, res, next){
    if(req.session.userId) {
        return next()
    }
    res.redirect('/')
}

// let sql = `select user_id from cosplays where cos_id = $1;`
// db.query(sql, [cos_id], (err, dbRes) => {
//     if(dbRes.rows[0].user_id === req.session.userId){
//         next()
//         return
//     }
//     res.redirect('/')
// })

module.exports = ensuredLoggedIn