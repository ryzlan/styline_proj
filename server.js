var express=require('express')
var cors= require('cors')
const request = require('superagent');
require('dotenv').config()

var app = express()


app.use(cors())
app.use(express.json())

app.get('/user/signin/callback' , (req, res)=>{
    const {query} = req
    const {code} = query

    const client_id = 'dec3fba300a20cb5e1e1'
    const client_secret = '7b22bca3cef0af35a5771eb51f606b2e0d50cf5b'
    
    if(!code){
        res.send({
            sucess: false,
            message: "Error: no Code from github"
        })
    }
    let url = 'https://github.com/login/oauth/access_token'
    request
    .post(url)
    .send({ 
        client_id: client_id, 
        client_secret: client_secret,
        code: code 
    }) 
    .set('accept', 'application/json')
    .end((err, result) => {
        const data = result.body
        res.send(data)
    });

})




let port = 5000 || process.env.PORT
app.listen(port,()=>{console.log('App Running at ', port )})