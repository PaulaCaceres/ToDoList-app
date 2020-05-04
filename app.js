const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

//Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname + "/views"));
//Connect to DB
mongoose.connect(
    process.env.DB_CONNECTION, 
    { useNewUrlParser: true, useUnifiedTopology: true }, 
    () => console.log('Connected to DB')
    );

//Import routes
const postsRoute = require('./routes/posts');
const getsRoute = require('./routes/gets');

app.use('/posts', postsRoute);
app.use('/todos', getsRoute);

//Settings
// app.set('port', process.env.PORT || 3000);

//Routes
app.get('/', (req, res) => {
    res.send('We are on home');
});

//Listen to the server
/*app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});
*/
app.listen(3000);