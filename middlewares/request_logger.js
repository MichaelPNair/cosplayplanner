function requestLogger(req, res, next){
    console.log(`\n+---------+`)
    console.log(new Date())
    console.log(`${req.method} ${req.path}`)
    console.log('query ', req.query)
    console.log('body ', req.body)    
    console.log(`+---------+\n`)  
    next()
}

module.exports = requestLogger