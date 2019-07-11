const express = require('express');
const userDB = require('../users/userDb');

const router = express.Router();

router.post('/', validateUser, async (req, res) => {
  const newUser = {
    name: req.body.name,
  };
  try {
    const newUserId = await userDB.insert(newUser);
    const newUserData = await userDB.getById(newUserId.id);
    return res.status(201).json(newUserData);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: 'There was an error while saving the user to the database',
    });
  }
});

router.post('/:id/posts', (req, res) => {});

router.get('/', async (req, res) => {
  try {
    const users = await userDB.get();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the users',
    });
  }
});

router.get('/:id', validateUserId, async (req, res) => {
  const {id} = req.params;
  try {
    const users = await userDB.getById(id);
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the users',
    });
  }
});

router.get('/:id/posts', async (req, res) => {
  const {id} = req.params;
  try {
    const users = await userDB.getUserPosts(id);
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the users',
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
      message: 'Error removing the User',
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
      message: 'Error updating the User',
    });
  }
});

// custom middleware

async function validateUserId(req, res, next) {
  const id = Number(req.params.id);
  if (Number.isNaN(id) || id % 1 !== 0 || id < 0) {
    return res.status(400).send({
      message: 'invalid post id',
    });
  }
  try {
    const user = await userDB.getById(id);
    if (!user) {
      return res.status(400).send({
        message: 'invalid post id',
      });
    }
    req.user = user;
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      error: 'The user information could not be retrieved.',
    });
  }
  return next();
}

function validateUser(req, res, next) {
  if (!Object.keys(req.body).length) {
    return res.status(400).send({
      message: 'missing user data',
    });
  }
  if (!req.body.name) {
    return res.status(400).send({
      message: 'missing required name field',
    });
  }
  return next();
}

function validatePost(req, res, next) {}

module.exports = router;
