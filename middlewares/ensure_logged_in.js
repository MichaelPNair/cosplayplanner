function ensuredLoggedIn(req, res, next){
    if(req.session.userId) {
        return next()
    }
    res.redirect('/')
}

module.exports = ensuredLoggedIn