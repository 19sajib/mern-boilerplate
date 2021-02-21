const express = require('express')

const  { signin, signup, signout, profile } = require('../controllers/user.js')

const router = express.Router()

router.post('/signin', signin)
router.post('/signup', signup)
router.get('/signout', signout)
router.get('/profile', profile)

module.exports = router;