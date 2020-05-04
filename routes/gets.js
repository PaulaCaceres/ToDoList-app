const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

//Get back all the posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (err) {
        res.json({ message: err })
    }
});

//Specific Get
router.get('/:getId', async (req, res) => {
    try {
        const get = await Post.findById(req.params.getId);
        res.json(get);
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;