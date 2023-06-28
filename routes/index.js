const express = require('express')
const router = express.Router()

const db = require('../db/index.js')
const bcrypt = require('bcrypt')
const ensuredLoggedOut = require('../middlewares/ensure_logged_out.js')

router.get('/', ensuredLoggedOut, (req, res) => {

    res.render('home')
})

router.get('/signup', ensuredLoggedOut, (req, res) => {

    res.render('signup', {usernameTaken: false})
})

router.get('/login', ensuredLoggedOut, (req, res) => {

    res.render('login')
})

router.post('/login', ensuredLoggedOut, (req, res) => {
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
  
  
                res.redirect('/cosplays')
            } else {
                res.render('login')
            }
        });
    })


})

router.post('/signup', ensuredLoggedOut, (req, res) =>{
    let username = req.body.username
    let password = req.body.password
    const saltRounds = 10;
    let sql = `select * from users where username = $1`
    db.query(sql, [username], (err, dbRes) => {
        if(dbRes.rows.length !== 0){
            res.render('signup', {usernameTaken: true})
            return
        }
        bcrypt.genSalt(saltRounds ,(err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
                let sql = `insert into users (username, password_digest)
                values ($1, $2);`
                db.query(sql, [username, hash] ,(err, dbRes2) => {
                    if(err){
                        console.log(err)
                    } else {
                        console.log('new user created')
                        res.redirect('/login')
                    }
                })
            })
        })
    })

})

router.delete('/logout', (req, res) => {
    req.session.userId = undefined
    res.redirect('/')
})

module.exports = router