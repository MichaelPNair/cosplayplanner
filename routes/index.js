const express = require('express')
const router = express.Router()

const db = require('../db/index.js')
const bcrypt = require('bcrypt')

router.get('/', (req, res) => {

    res.render('home')
})

router.get('/signup', (req, res) => {

    res.render('signup')
})

router.get('/login', (req, res) => {

    res.render('login')
})

router.post('/login', (req, res) => {
    let username = req.body.username
    let password = req.body.password
    let sql = `select * from users where username = $1`
    db.query(sql, [username], (err, dbRes) => {
        if(err){
            console.log(err)
        }

        if(dbRes.rows.length === 0){
            res.render('login')
            return
        }
        bcrypt.compare(password, dbRes.rows[0].password_digest, function(err, result) {
            if(result){
                req.session.userId = dbRes.rows[0].id
  
  
                res.redirect('/cosplay')
            } else {
                res.render('login')
            }
        });
    })


})

router.delete('/logout', (req, res) => {
    req.session.userId = undefined
    res.redirect('/')
})

module.exports = router