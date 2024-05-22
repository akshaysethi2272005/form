const express = require('express');
const bodyparser = require("body-parser")
const app = express();
const port = 3000
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static('static'))
app.get('/', (req, res) => {
    res.sendFile(__dirname+'/index.html');
})
app.post('/',(req , res) => {
    const username = req.body.username;
    const password = req.body.password;
    console.log("username "+username.toString()+"\n" +"password "+password.toString());
    res.send('Your Username is : '+username+"\n"+"you are hacked !");
})
  
app.listen(port , () => {
    console.log('server running at port '+port.toString());
})