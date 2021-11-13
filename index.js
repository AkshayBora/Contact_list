const express = require('express');
const path = require('path');
const port = 8000;

//database
const db = require('./config/mongoose');
const Contact = require('./models/contact');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded()); //Parser or middleware
app.use(express.static('assets'));


// Make some own middleware
// app.use(function(req , res , next){
//     console.log('middleware1');
//     next();
// });

// app.use(function(req , res , next){
//     console.log('middleware2');
//     next();
// });

 
var contactList = [
    {
        name : 'Akshay',
        phone : '1234567890'
    },
    {
        name : 'Pankaj',
        phone : '9876543210'
    },
    {
        name : 'Vikas',
        phone : '1111111111'
    },

];


app.get('/' , function(req , res){
    // console.log(__dirname);
    // res.send('<h1>Cool, it is running! or is it?</h1>');

    Contact.find({} , function(err,contacts){
        if (err){
            console.log('Error in fetching contact from DB');
            return;
        }
        return res.render('home' , {
            title : 'Contacts List',
            contact_list : contacts,
        });

    // return res.render('home' , {
    //     title : 'Contacts List',
    //     contact_list : contactList,
    });
    
});

app.get('/practice' , function(req , res){
    return res.render('practice' , {title : 'Lets play with ejs'});

});

app.post("/create-contact" , function(req ,res){
    // return res.redirect('/practice');
    // contactList.push({
    //     name : req.body.name,
    //     phone : req.body.phone

    // })

    // return res.redirect('/');

    // contactList.push(req.body);

    Contact.create({
        name : req.body.name,
        phone : req.body.phone
    } , function(err , newContact){
        if (err){
            console.log('error creating in contact'); 
            return;
        }
        console.log('*******' , newContact);
        return res.redirect('back');
        
    });
    
    // return res.redirect('back');

});

//for deleting the contact
app.get('/delete-contact', function(req , res){
    //get the query from the URL
    // let phone = req.query.phone;

    // let contactIndex = contactList.findIndex(contact => contact.phone == phone);

    // if (contactIndex != -1){
    //     contactList.splice(contactIndex , 1);
    // }

    // return res.redirect('back');

    // get the id from the query in the url
    let id = req.query.id;

    // find the contact in the DB using id and delete
    Contact.findByIdAndDelete(id ,function(err){
        if (err){
            console.log('Error in deleting an object from DB');
            return;
        }
        return res.redirect('back');
    });

});


app.listen(port , function(err){
    if (err){
        console.log('Error is running the server', err);
    }

    console.log('Yup! My Express Server is running on Port :' , port);

    });

