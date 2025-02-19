const router = require('express').Router();
const bcrypt = require('bcryptjs');
const Users = require('../jokes/jokes.model.js');

router.post('/register', (req, res) => {
  // implement registration
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 8);
  user.password = hash;

  Users.add(user)
    .then(saved => {
      req.session.user = saved
      res.status(201).json(saved)
    })
    .catch(err => {
      res.status(500).json(error)
    })

});

router.post('/login', (req, res) => {
  // implement login
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        req.session.user = user;
        res.status(201).json({ message: 'Welcome!' })
      } else {
        res.status(401).json({ message: 'Invalid credentials.' })
      }
    })
    .catch(err => {
      res.status(500).json(error)
    })
});

module.exports = router;
