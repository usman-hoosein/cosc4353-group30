const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

//TODO: update when database is complete
// const pool = require('./util/database'); 

const app = express();

const loginRoutes = require('./routes/login');
const profileRoutes = require('./routes/client-profile');
const fuelRoutes = require('./routes/fuel-quote');

//TODO: update when database is complete
// pool.query("SET SCHEMA '';", (err, res) => {
//     if (err) {
//         console.log(err.stack)
//     }
// })

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/login', loginRoutes);
app.use('/profile', profileRoutes);
app.use('/fuel', fuelRoutes);

const PORT = process.env.PORT || 8080;
  
app.listen(PORT, console.log(`Server started on port ${PORT}`));
