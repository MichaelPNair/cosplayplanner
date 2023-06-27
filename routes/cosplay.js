const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {

    res.render('cosplays/index')
})

router.get('/ConfirmDelete', (req, res) => {

    res.render('cosplays/confirm_delete')
})

router.get('/new', (req, res) => {

    res.render('cosplays/new')
})

router.get('/:id/edit', (req, res) => {

    res.render('cosplays/edit')
})

router.get('/:id/show', (req, res) => {

    res.render('cosplays/show')
})

router.get('/:id/tasks/new', (req, res) => {

    res.render('cosplays/tasks/new')
})

router.get('/:id/tasks/:taskId/edit', (req, res) => {

    res.render('cosplays/tasks/edit')
})

module.exports = router