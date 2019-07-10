const express = require('express');
const userDB = require('../users/userDb');

const router = express.Router();

router.post('/', (req, res) => {});

router.post('/:id/posts', (req, res) => {});

router.get('/', async (req, res) => {
  try {
    const users = await userDB.get();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the users'
    });
  }
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const users = await userDB.getById(id);
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the users'
    });
  }
});

router.get('/:id/posts', async (req, res) => {
  const id = req.params.id;
  try {
    const users = await userDB.getUserPosts(id);
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the users'
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const count = await userDB.remove(req.params.id);
    if (count > 0) {
      res.status(200).json({ message: 'The User has been deleted' });
    } else {
      res.status(404).json({ message: 'The User could not be found' });
    }
  } catch (error) {
    // log error to server
    console.log(error);
    res.status(500).json({
      message: 'Error removing the User'
    });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedUser = await userDB.update(req.params.id, req.body);
    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ message: 'The User could not be found' });
    }
  } catch (error) {
    // log error to server
    console.log(error);
    res.status(500).json({
      message: 'Error updating the User'
    });
  }
});

// custom middleware

function validateUserId(req, res, next) {}

function validateUser(req, res, next) {}

function validatePost(req, res, next) {}

module.exports = router;
