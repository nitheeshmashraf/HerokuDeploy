// server.js

const express = require('express'),
path = require('path'),
bodyParser = require('body-parser'),
cors = require('cors'),
mongoose = require('mongoose'),
config = require('./config/DB'),
coinRoutes = require('./expressRoutes/coinRoutes');

mongoose.Promise = global.Promise;
mongoose.connect(config.DB).then(
() => {console.log('Database is connected') },
err => { console.log('Can not connect to the database'+ err)}
);

const app = express();
// set static folder file
app.use(express.static(path.join(__dirname,'public')))

app.use(bodyParser.json());
app.use(cors());
const port = process.env.PORT || 4000;

app.use('/coins', coinRoutes);

// http method
app.get('/',(req,res)=>{
res.send("Invalid END point");
});

// other routes
app.get('*',(req,res)=>{
res.sendFile(path.join(__dirname,'public/index.html'));
});


const server = app.listen(port,()=>{
console.log('Listening on port ' + port);
});