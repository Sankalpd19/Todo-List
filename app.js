const express=require("express");
const bodyParser=require("body-parser");
const date= require(__dirname+"/date.js");
const app=express();

app.use(bodyParser.urlencoded({extended:true}));;
app.set('view engine','ejs');
app.use(express.static("public"));
let items=["Buy Food","Cook Food","Eat Food"];
let workItems=[];
app.get("/",(req,res)=>{
    let day=date.getDate();
    res.render("list",{Wday: day,newListItem: items});
});

app.get("/work",(req,res)=>{
    res.render("list",{Wday:"Work List",newListItem: workItems})
})
app.post("/work",(req,res)=>{
    let item=req.body.newItem;
    workItems.push(item);
    res.redirect("/work");

})
app.post("/",(req,res)=>{
    let item=req.body.newItem;
    // console.log(req.body);
    if(req.body.list=== "Work")
    {
        workItems.push(item);
        res.redirect("/work");
    }
    else{
            items.push(item);
    res.redirect("/");
    }

    // res.send(console.log(item)); 
})

app.get("/about",(req,res)=>{
    res.render("about");
})
app.listen(3000,()=>
{
    console.log("Server started");
});