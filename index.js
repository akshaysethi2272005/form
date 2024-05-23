const express = require('express');
const bodyparser = require("body-parser")
const app = express();
const port = 3000
const path = require('path');

users = [
    {
        "username": "samanyu103",
        "password" : "sam10"
    },
    {
        "username": "akshay",
        "password" : "hi"    
    }
]
app.set('view engine','ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyparser.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.render('index')
})

app.post('/',(req , res) => {
    const username = req.body.username;
    const password = req.body.password;
    const body = req.body;
    if (username.trim() == '' || password.trim() == ''){
        console.log("alert sent");
        res.render('index');
        // return;    
    }else{
        let ok= false;
        users.forEach(user => {
            if (user.username==username && user.password==password) {
                ok=true;
            }
        });
        if (ok) {
            console.log("username "+username.toString()+"\n" +"password "+password.toString());
            // res.render('index',{message:null});

            res.render('response',{user:username,pass:password});
        }else{
            alert("incorrect credentials");
            res.render('index');
        }
    }
})
  
app.listen(port , () => {
    console.log('server running at port '+port.toString());
})