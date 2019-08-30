var express=require('express')
var cors= require('cors')
const request = require('superagent');
require('dotenv').config()
var mongoose = require('mongoose')

var app = express()


app.use(cors())
app.use(express.json())


mongoose.connect('mongodb+srv://'+process.env.DB_NAME+
':'+process.env.DB_PASSWORD+'@ruzlancluster0-y4sih.mongodb.net/test?retryWrites=true&w=majority',{
    useNewUrlParser: true
})

const Commit = require('./models/commits')


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
  const access_token = request
    .post(url)
    .send({ 
        client_id: client_id, 
        client_secret: client_secret,
        code: code 
    }) 
    .set('accept', 'application/json')
    .end((err, result) => {
        const data = result.body.access_token
        console.log(data);
        
        return data
        // res.send(data)
    });
    //https://github.com/ryzlan/react_recipebook
    request
    .get('https://api.github.com/repos/ryzlan/react_recipebook/hooks')
    .set('Authorization', 'token '+ access_token)
    .then(result =>{
        console.log(result);
        res.sendStatus(200).send(result)
    })
    
})

app.post('/webhook' ,(req,res)=>{
    console.log(req.commits);
    let cc = []
    req.commits.forEach(c=>{
        let commit_id = c.id
        let message = c.message
        let timestamp = c.message
        let url = c.url 
        let author_name = c.author.name
        cc.push({
        commit_id:commit_id,
        message:message,
        timestamp:timestamp,
        url:url,
        author_name:author_name
        })
    })
    Commit.collection.insert(cc,(err, docs)=>{
        if(err){
            res.sendStatus(401).json({
                message:'Could not save commit'
            })
        } 
        res.sendStatus(200)
    })
})

app.get('/commits',(req,res) =>{
    Commit
    .find()
    .toArray()
    .then(result =>{
        if(result.length > 0){
            res.sendStatus(200).json(result)
        }
    })
    .catch(err =>{
        res.sendStatus(500)
    })
})



let port = 5000 || process.env.PORT
app.listen(port,()=>{console.log('App Running at ', port )})