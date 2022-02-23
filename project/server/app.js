const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

//TODO: update when database is complete
// const pool = require('./util/database'); 

const app = express();

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

//TODO: update when database is complete
// pool.query("SET SCHEMA '';", (err, res) => {
//     if (err) {
//         console.log(err.stack)
//     }
// })

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.listen(3000);
