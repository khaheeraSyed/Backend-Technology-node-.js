const express = require('express');
const router = express.Router();

router.get('/login', (req, res) => {
  res.render('user-login', { title: 'Assignment for Quadiro Technologies' });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'user' && password === 'password') {
    req.session.user = true;
    res.redirect('/user/cars');
  } else {
    res.render('user-login', { error: 'Invalid credentials' });
  }
});

router.get('/cars', (req, res) => {
  if (req.session.user) {
    const cars = [
      { name: 'Car 1', manufacturingYear: 2020, price: 20000 },
      { name: 'Car 2', manufacturingYear: 2021, price: 25000 },
      { name: 'Car 3', manufacturingYear: 2022, price: 30000 },
    ];
    res.json(cars);
  } else {
    res.status(401).send('Unauthorized');
  }
});

module.exports = router;
