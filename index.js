//imported module
var express=require("express")
var bodyParser=require("body-parser")
var mongoose=require("mongoose")

//created an app
const app=express()

//used modules
app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

//connected to mongoose database
mongoose.connect("mongodb://localhost:27017/Database")
var db=mongoose.connection
db.on('error',()=>console.log('error in conecting to database'))
db.once('open',()=>console.log('conected to database'))

//input values
app.post("/sign_up",(req,res)=>{
    var frstname=req.body.frstname
    var midname=req.body.midname
    var lstname=req.body.lstname
    
   // var country=req.body.country
    var bday=req.body.bday
    var email=req.body.email
    var  phone=req.body.phone
    var phno=req.body.phno
    var gender=req.body.gender
    var add=req.body.add
    var password=req.body.password
    var cnfrm=req.body.cnfrm
   //object data is created 
    var data={
        "frstname":frstname,
        "midname":midname,
        "lstname":lstname,
        "bday":bday,
        "email":email,
        "phone":phone,
        "phno":phno,
        "gender":gender,
        "add":add,
        "password":password,
        "cnfrm":cnfrm
    }
    //checking if error occurs
    db.collection('users').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Recorrd inserted successully")
    })
    //redirected to html page
    return res.redirect('signup.html')
})

//establish connection btw localhost & file
app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin":'*'
    })
    return res.redirect('index.html')
}).listen(3000);
console.log("Listening on port 3000")
