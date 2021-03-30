const router = require('express').Router();
const users = require('./users');
const themes = require('./themes');
const posts = require('./posts');
const likes = require('./likes');
const test = require('./test');
const shoppinglists = require('./shoppinglists');
const item = require('./item');

router.use('/shoppinglists', shoppinglists);
router.use('/item', item);
router.use('/users', users);
router.use('/themes', themes);
router.use('/posts', posts);
router.use('/likes', likes);
router.use('/test', test);

router.use('/*', test);

module.exports = router;
