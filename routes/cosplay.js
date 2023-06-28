const express = require('express')
const router = express.Router()
const db = require('../db/index.js')
const ensuredLoggedIn = require('../middlewares/ensure_logged_in.js')

router.get('/', ensuredLoggedIn, (req, res) => {
    db.query("select * from cosplays where user_id = $1;", [req.session.userId],(err, dbRes) => {
        if(err){
            console.log(err)
        }
        res.render('cosplays/index', {cosplays: dbRes.rows})
    })
})

router.get('/:id/ConfirmDelete', ensuredLoggedIn, (req, res) => {
    db.query("select * from cosplays where user_id = $1;", [req.session.userId],(err, dbRes) => {
        if(err){
            console.log(err)
        }
        res.render('cosplays/confirm_delete', {cosplay: dbRes.rows[0]})
    })
})

router.delete('/:id', ensuredLoggedIn, (req, res) => {
    let id = req.params.id
    let sql = `DELETE FROM cosplays WHERE cos_id = $1;`
    let sql2 = `DELETE FROM tasks WHERE cos_id = $1;`
    db.query(sql, [req.params.id], (err, dbRes) => {
        db.query(sql2, [req.params.id], (err, dbRes2) => {
            res.redirect('/cosplays')
        })
    })

})

router.get('/new', ensuredLoggedIn, (req, res) => {

    res.render('cosplays/new')
})

router.post('/', ensuredLoggedIn, (req, res) => {
    let name = req.body.name
    let source = req.body.source
    let url = req.body.picture_url
    const sql = `INSERT INTO cosplays (name, source, picture_url, user_id)
    VALUES ($1, $2, $3, $4);`
    db.query(sql, [name, source, url, req.session.userId], (err, dbRes) => {
        res.redirect(`/cosplays`)
    })
})

router.get('/:id/edit', ensuredLoggedIn, (req, res) => {
    let id = req.params.id
    let sql = `select * from cosplays where cos_id = $1;`
    db.query(sql, [id], (err, dbRes) => {

        res.render('cosplays/edit', {cosplay: dbRes.rows[0]})
    })

})

router.put('/:id', ensuredLoggedIn, (req, res) => {
    let id = req.params.id
    let name = req.body.name
    let source = req.body.source
    let url = req.body.picture_url
    let sql = `UPDATE cosplays SET name = $1, source = $2, picture_url = $3 where cos_id = $4;`
    db.query(sql, [name, source, url, id], (err, dbRes) => {
        res.redirect(`/cosplays/${id}`)
    })
})

router.get('/:id', ensuredLoggedIn, (req, res) => {
    let id = req.params.id
    let sql = `select * from cosplays where cos_id = $1;`
    db.query(sql, [id], (err, dbRes) => {
        let sql2 = `select * from tasks a JOIN status b on a.status_id = b.status_id where cos_id = $1 AND task_type_id = 1;`
        db.query(sql2, [id], (err, dbRes2) => {
            let sql3 = `select * from tasks a JOIN status b on a.status_id = b.status_id where cos_id = $1 AND task_type_id = 2;`
            db.query(sql3, [id], (err, dbRes3) => {
                let sql4 = `select sum(cost) as total_cost, sum(time) as total_time from tasks where cos_id = $1;`

                db.query(sql4, [id], (err, dbRes4) => {
                    res.render('cosplays/show', {cosplay: dbRes.rows[0], buyTasks: dbRes2.rows, craftTasks: dbRes3.rows, sums: dbRes4.rows[0]})
                })

            })
        })
    })

})

router.get('/:id/tasks/new', ensuredLoggedIn, (req, res) => {

    res.render('cosplays/tasks/new')
})

router.get('/:id/tasks/:taskId/edit', ensuredLoggedIn, (req, res) => {

    res.render('cosplays/tasks/edit')
})

module.exports = router