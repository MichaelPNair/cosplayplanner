require('dotenv').config()

const db = require('./index.js')
const bcrypt = require('bcrypt');

const saltRounds = 10;

let username = 'Michael'
let plainTextPassword = 'pudding';



bcrypt.genSalt(saltRounds ,(err, salt) => {

    bcrypt.hash(plainTextPassword, salt, (err, hash) => {

        let sql = `insert into users (username, password_digest)
        values ($1, $2);`
        db.query(sql, [username, hash] ,(err, res) => {
            if(err){
                console.log(err)
            } else {
                console.log('new user created')
            }
        })

    })

})