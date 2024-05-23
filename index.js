const express = require('express');
const bodyparser = require("body-parser")
const app = express();
const port = 3000
users = [
    {
        "username": "samanyu103",
        "password" : "sam10"
    }
]
app.set('view engine','ejs');

app.use(bodyparser.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.render('index',{messege:null})
})

app.post('/response',(req , res) => {
    const username = req.body.username;
    const password = req.body.password;
    const body = req.body;
    if (username.trim() == '' || password.trim() == ''){
        console.log("alert sent");
        res.render('index',{messege:"alert"});    
    }else{
        console.log("username "+username.toString()+"\n" +"password "+password.toString());
        res.render('response',{user:username,pass:password});
    }
})
  
app.listen(port , () => {
    console.log('server running at port '+port.toString());
})