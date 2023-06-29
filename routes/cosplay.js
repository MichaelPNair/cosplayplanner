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
    db.query("select * from cosplays where cos_id = $1;", [req.params.id],(err, dbRes) => {
        if(err){
            console.log(err)
        }
        console.log(dbRes.rows)
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
                    let sql5 = `select sum(cost) as not_done_cost, sum(time) as not_done_time from tasks where cos_id = $1 AND status_id <> 3;`
                    db.query(sql5, [id], (err, dbRes5) => {

                        res.render('cosplays/show', {cosplay: dbRes.rows[0], buyTasks: dbRes2.rows, craftTasks: dbRes3.rows, sums: dbRes4.rows[0], notDoneSums: dbRes5.rows[0]})
                    })
                })

            })
        })
    })

})

router.get('/:id/tasks/new', ensuredLoggedIn, (req, res) => {
    let id = req.params.id
    res.render('cosplays/tasks/new', {cosId: id})
})

router.post('/:id/tasks', ensuredLoggedIn, (req, res) => {
    let task_type_id = Number(req.body.task_type_id)
    let name = req.body.name
    let cost = Number(req.body.cost)
    let time = Number(req.body.time)
    let description = req.body.description
    let status_id = Number(req.body.status_id)
    let cos_id = Number(req.params.id)
    let sql = `INSERT INTO tasks (task_type_id, name, cost, time,description, status_id, cos_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7);`
    db.query(sql, [task_type_id, name, cost, time, description, status_id,  cos_id], (err, dbRes) => {
        console.log(sql)
        res.redirect(`/cosplays/${req.params.id}`)
    })

})

router.get('/:id/tasks/:taskId/edit', ensuredLoggedIn, (req, res) => {
    let id = req.params.id
    let taskId = Number(req.params.taskId)
    let sql = `select * from tasks where task_id = $1;`
    db.query(sql, [taskId], (err, dbRes) => {
        res.render('cosplays/tasks/edit', {task: dbRes.rows[0]})
    })
})

router.put('/:id/tasks/:taskId', ensuredLoggedIn, (req, res) => {
    let id = req.params.id
    let task_id = Number(req.params.taskId)
    let task_type_id = Number(req.body.task_type_id)
    let name = req.body.name
    let cost = Number(req.body.cost)
    let time = Number(req.body.time)
    let status_id = Number(req.body.status_id)
    let description = req.body.description
    let sql = `UPDATE tasks SET task_type_id = $1, name = $2, cost = $3, time = $4, status_id = $5, description = $6
    where task_id = $7;`
    db.query(sql, [task_type_id, name, cost, time, status_id, description, task_id], (err, dbRes) => {
        res.redirect(`/cosplays/${id}`)
    })
})

router.delete('/:id/tasks/:taskId', ensuredLoggedIn, (req, res) => {
    let task_id = Number(req.params.taskId)
    let sql = `DELETE FROM tasks WHERE task_id = $1;`
    db.query(sql, [task_id], (err, dbRes) => {
        res.redirect(`/cosplays/${req.params.id}`)
    })

})


router.get('/:id/progress', ensuredLoggedIn, (req, res) => {
    let id = req.params.id
    let sql = `select * from progress_pics where cos_id = $1;`
    let sql2 = `select * from cosplays where cos_id = $1;`
    db.query(sql, [id], (err, dbRes) => {
        db.query(sql2, [id], (err, dbRes2) => {

            res.render('cosplays/progress/index', {cosId: id, progressPics: dbRes.rows, cosplay: dbRes2.rows[0]})
        })
    })
})
router.get('/:id/progress/new', ensuredLoggedIn, (req, res) => {
    let id = req.params.id
    let sql = `select * from cosplays where cos_id = $1;`
    db.query(sql, [id], (err, dbRes) => {
        res.render('cosplays/progress/new', {cosId: id, cosplay: dbRes.rows[0]})
    })
})

router.get('/:id/progress/:progressId/edit', ensuredLoggedIn, (req, res) => {
    let id = req.params.id
    let progressId = Number(req.params.progressId)
    let sql = `select * from progress_pics where progress_pic_id = $1;`
    let sql2 = `select * from cosplays where cos_id = $1;`
    db.query(sql, [progressId], (err, dbRes) => {
        
        db.query(sql2, [id], (err, dbRes2) => {

            res.render('cosplays/progress/edit', {progressPic: dbRes.rows[0], cosplay: dbRes2.rows[0]})
        })
    })
})

router.get('/:id/progress/:progressId/ConfirmDelete', ensuredLoggedIn, (req, res) => {
    let id = req.params.id
    let progressId = Number(req.params.progressId)
    let sql = `select * from progress_pics where progress_pic_id = $1;`
    let sql2 = `select * from cosplays where cos_id = $1;`
    db.query(sql, [progressId], (err, dbRes) => {
        
        db.query(sql2, [id], (err, dbRes2) => {

            res.render('cosplays/progress/confirm_delete', {progressPic: dbRes.rows[0], cosplay: dbRes2.rows[0]})
        })
    })
})

router.post('/:id/progress/', ensuredLoggedIn, (req, res) => {
    let name = req.body.name
    let picture_url = req.body.picture_url
    let cos_id = Number(req.params.id)
    let sql = `INSERT INTO progress_pics (name, picture_url, cos_id) 
        VALUES ($1, $2, $3);`
    db.query(sql, [name, picture_url, cos_id], (err, dbRes) => {
        res.redirect(`/cosplays/${req.params.id}/progress`)
    })

})

router.put('/:id/progress/:progressId', ensuredLoggedIn, (req, res) => {
    let id = req.params.id
    let progressId = req.params.progressId
    let name = req.body.name
    let picture_url = req.body.picture_url
    let sql = `UPDATE progress_pics SET name = $1, picture_url = $2
    where progress_pic_id = $3;`
    db.query(sql, [name, picture_url, progressId], (err, dbRes) => {
        res.redirect(`/cosplays/${id}/progress`)
    })
})

router.delete('/:id/progress/:progressId', ensuredLoggedIn, (req, res) => {
    let progress_pic_id = Number(req.params.progressId)
    let sql = `DELETE FROM progress_pics WHERE progress_pic_id = $1;`
    db.query(sql, [progress_pic_id], (err, dbRes) => {
        res.redirect(`/cosplays/${req.params.id}/progress`)
    })
})


module.exports = router