const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

//Submits a Post
router.post('/', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        done: req.body.done
    });
    try {
        const savedPost = await post.save();
        res.json(savedPost);
    } catch (err) {
        res.json({ message: err });
    }
});

//Delete a Post
router.delete('/:postId', async (req, res) => {
    try {
        const removedPost = await Post.deleteOne({ _id: req.params.postId });
        res.json(removedPost);
    } catch (err) {
        res.json({ message: err });
    }
});

//Update a Post
router.patch('/:postId', async (req, res) => {
    try {
        const updatedPost = await Post.updateOne(
            { _id: req.params.postId}, 
            { $set: { title: req.body.title, done: req.body.done } }
            );
            res.json(updatedPost);
    } catch (err) {
        res.json({ message: err});
    }
});

module.exports = router;