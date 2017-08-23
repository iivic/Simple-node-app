let Router = require('express').Router
let passport = require('passport')

/*
 *  GET http://localhost:8000/login
 *  POST http://localhost:8000/login
 *  GET http://localhost:8000/logout
 *  GET http://localhost:8000/
 */

module.exports = Router()
  .get('/', (req, res) => res.render('index'))
  .get('/login', (req, res) => res.render('login'))
  .post('/login', passport.authenticate('login', {
    successRedirect: '/',
    failureRedirect: '/login'
  }))
  .get('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
  })
