function ensuredLoggedOut(req, res, next){
    if(!req.session.userId) {
        return next()
    }
    res.redirect('/cosplays')
}

module.exports = ensuredLoggedOut