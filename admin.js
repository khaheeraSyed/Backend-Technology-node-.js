const express = require('express');
const router = express.Router();

router.get('/login', (req, res) => {
  res.render('admin-login', { title: 'Assignment for Quadiro Technologies' });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'password') {
    req.session.admin = true;
    res.redirect('/admin/dashboard');
  } else {
    res.render('admin-login', { error: 'Invalid credentials' });
  }
});

router.get('/dashboard', (req, res) => {
  if (req.session.admin) {
    const cars = [
      { name: 'Car 1', manufacturingYear: 2020, price: 20000 },
      { name: 'Car 2', manufacturingYear: 2021, price: 25000 },
      { name: 'Car 3', manufacturingYear: 2022, price: 30000 },
    ];
    res.render('admin-dashboard', { cars });
  } else {
    res.redirect('/admin/login');
  }
});

router.get('/cars', (req, res) => {
  if (req.session.admin) {
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

router.post('/cars', (req, res) => {
  if (req.session.admin) {
    const { name, manufacturingYear, price } = req.body;
    const car = { name, manufacturingYear, price };
    // Save car to database
    res.json(car);
  } else {
    res.status(401).send('Unauthorized');
  }
});

router.put('/cars/:id', (req, res) => {
  if (req.session.admin) {
    const { id } = req.params;
    const { name, manufacturingYear, price } = req.body;
    const car = { name, manufacturingYear, price };
    // Update car in database
    res.json(car);
  } else {
    res.status(401).send('Unauthorized');
  }
});

router.delete('/cars/:id', (req, res) => {
  if (req.session.admin) {
    const { id } = req.params;
    // Delete car from database
    res.json({ message: 'Car deleted successfully' });
  } else {
    res.status(401).send('Unauthorized');
  }
});

module.exports = router;
