// require the library
const mongoose = require('mongoose');

// connect to database
mongoose.connect('mongodb://localhost/contacts_list_db');

// acquire the connection ( to check if it is successfull)
const db = mongoose.connection;

// if is error 
db.on('error' , console.error.bind(console , 'error connecting to db'));

// up and running then print the message
db.once('open', function(){
    console.log('Successfully connected to database');
});

