let express = require('express');
let user = require('./user');
let learn = require('./learn');
let team = require('./team');

let router = express.Router();

router.use('/user', user);
router.use('/learn', learn);
router.use('/team', team);

module.exports = router;
