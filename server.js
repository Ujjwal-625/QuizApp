const express=require("express");
const path=require("path");
const app=express();
//app.set("view engine","ejs");
const client=require("mongodb").MongoClient;
app.use(express.urlencoded({extended:false}))
let dbinstacnce;
client.connect("mongodb+srv://ujjwal1:G9iTp5ziDnqlSf5L@cluster0.7z0racb.mongodb.net/?retryWrites=true&w=majority").then((server)=>{
    console.log("connected to db");
    dbinstacnce=server.db("Ujjwal_1280_D");
}).catch((err)=>{
    console.log("failed to connect");
    console.log(err);
})
app.use(express.static("./public"));
app.get('/',(req,res)=>{
   res.sendFile(path.join(__dirname,"public/login.html"));
})
app.post('/login',(req,res)=>{
    console.log("checking");
    // console.log(dbinstacnce);
    dbinstacnce.collection('Users').findOne({$and :[{"username":req.body.username},{"password":req.body.password}]}).then((response)=>{
        if(response){
            console.log("user exist");
            res.redirect("/attempts.html");
        }else{
            console.log("wrong username or password");
            res.redirect("/signup.html");
        }
    })
})
app.post("/signup",(req,res)=>{
    dbinstacnce.collection("User").findOne({"username":req.body.username}).then((response)=>{
        if(response){
            console.log("same userName");
            res.redirect("login.html");
        }else{
            console.log("User added to db");
            let obj=req.body;
            obj.attempts={};
             // console.log(req.body);
             dbinstacnce.collection("Users").insertOne(obj);
            res.redirect("login.html");
        }
    })
})
app.listen(3000,(err)=>{
    if(!err){
        console.log("Started listening");
    }
    else{
        console.log("error ");
    }
})