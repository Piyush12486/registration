const express=require("express");
const app = express();
const path = require("path")
const port=8000;
const staticpath=path.join(__dirname,"/views") 
app.use(express.json())
app.get(express.static(staticpath))
app.set("view engine","ejs")
app.set("views",staticpath)
console.log(staticpath)
const cybersecurity=require("./models/registration")
const cors=require("cors")
require('./db/conn')
const bodyparser = require("body-parser")
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cors())
app.get("/",(req,res)=>{
    res.render("hello world")
})
app.get("/about",(req,res)=>{
    res.render("about")
})
app.get("/students",(req,res)=>{
    res.render('registration')
})
 app.post("/students/all",(req,res)=>{
    console.log(req.body);
    res.send("hello from server side")
    const user=new cybersecurity(req.body)
    user.save()
 })
 app.get("/students/all",async(req,res)=>{
    const mydata=await cybersecurity.find({});
    res.json({mydata})
 })
 app.get("/students/specific",async(req,res)=>{
    const mydata=await cybersecurity.find(req.query);
    res.json({mydata})
 })
app.listen(8000),()=>{
    console.log("port:8000");
}

