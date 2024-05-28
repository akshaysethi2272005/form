const express = require('express');
const bodyparser = require("body-parser")
const app = express();
const port = 3000
const path = require('path');
const admin = require('firebase-admin');
var serviceAccount = require("./auth-samm-firebase-adminsdk-kk62o-5a82f9ceca.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const auth = admin.auth()
const firestore = admin.firestore();
app.set('view engine','ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyparser.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.render('index',{ale:null})
})
app.post('/',(req , res) => {
    const username = req.body.username;
    const password = req.body.password;
    const body = req.body;
    if (username.trim() == '' || password.trim() == ''){
        console.log("alert sent");
        res.render('index',{ale:null});
        // return;    
    }else{
        auth.getUserByEmail(username).then(value => {
            console.log(value.passwordHash)
        }).catch(err => {
            console.log(err);
            res.render('index',{ale:"invalid username"})
        })
    }
})
  
app.get("/create",(req,res)=> {
    res.render('create')
})
app.post('/create',(req , res) => {
    const username = req.body.cu;
    const password = req.body.cp;
    console.log(req.body)
    const body = req.body;
    if ( username.trim() == '' || password.trim() == ''){
        console.log("alert sent");
        res.render('create');
        // return;    
    }else{
        console.log("username "+username.toString()+"\n" +"password "+password.toString());
        auth.createUser({
            uid:"abcdefghi",
            email:username,
            disabled:false,
            password:password,
            displayName:"Akshay Sethi",
            emailVerified:false
        }).then((user) => {
            console.log(user.uid.toString() + " UID stored");
            try{
                firestore.collection('users').add({
                    username:username,
                    hash:user.passwordHash,
                    salt:user.passwordSalt
                })
            }catch(err){
                console.log(err)
            }
        }).catch((err) => {
            console.log(err);
        })
        res.render('created');

    }
})

app.listen(port , () => {
    console.log('server running at port '+port.toString());
})