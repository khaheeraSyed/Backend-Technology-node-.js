const express = require('express');
const app = express();
const adminRoute = require('./routes/admin');
const userRoute = require('./routes/user');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/admin', adminRoute);
app.use('/user', userRoute);

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
