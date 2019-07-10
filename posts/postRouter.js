const express = require('express');
const postDb = require('../posts/postDb');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const posts = await postDb.get();
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the posts'
    });
  }
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const posts = await postDb.getById(id);
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the posts'
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const count = await postDb.remove(req.params.id);
    if (count > 0) {
      res.status(200).json({ message: 'The Post has been deleted' });
    } else {
      res.status(404).json({ message: 'The Post could not be found' });
    }
  } catch (error) {
    // log error to server
    console.log(error);
    res.status(500).json({
      message: 'Error removing the Post'
    });
  }
});

router.put('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const updatedPost = await postDb.update(id, req.body);
    if (updatedPost) {
      res.status(200).json({ message: 'update was successful' });
    } else {
      res.status(404).json({ message: 'The Post could not be found' });
    }
  } catch (error) {
    // log error to server
    console.log(error);
    res.status(500).json({
      message: 'Error updating the Post'
    });
  }
});

// custom middleware

function validatePostId(req, res, next) {}

module.exports = router;
