require("dotenv").config();
const express = require('express')
const ejs = require('ejs')
const app = express()
const PORT = process.env.PORT || 4000
const bodyParser = require('body-parser')
const connectDB = require('./connection');
const userModel = require('./login');
app.use(bodyParser.urlencoded({ extended: false }))
app.set('view engine','ejs');
app.use( express.static( "image" ) );

// login page
// parameters = none

app.get("/",(req,res)=>{
        try{
         res.render('login')
        }
        catch(err)
        {
           console.log("3000 is not ") 
        }
})

// students page
// parameters = none

app.get("/student",(req,res)=>{
     try{
      res.render('students.ejs')
     }
     catch(err)
     {
        console.log("3000 is not ") 
     }
})

// post route students
// parameter req.body

app.post("/student",async(req,res)=>{
     try{
          const newUser = req.body;
          const rollno = newUser.rollno;
          const num = newUser.num;
          let errors=0;
          const alreadyUser = await userModel.findOne({ rollno: req.body.rollno })
          
          if(alreadyUser)
          {
               res.send("user Already exists");
               errors+=1;
          }
           if(rollno.length<8){
                res.send("check your roll Number");
                errors+=1;
           }
          if(num.length<10 || num.length>11){
               res.send("check your Number");
               errors+=1;
          }
          if(errors === 0){
          await userModel.create(newUser);
          res.send("user created")
        }
       
     }
        catch(err){
          res.status(500).send("error");
      
        }
})
//                                teachers route
app.get('/teacher',async(req,res)=>{
     try{

     res.render('techer.ejs')
     }
     catch(err){
          res.status(500).send("error");
     }
     
})

app.post('/teacher',async(req,res)=>{
     const teacher = req.body;
     
     try{
          if(teacher.id === "02")
          {
               const data = await userModel.find().sort({rollno:1})
               res.render('fetch',{data});
          }
          else
          {
               res.redirect('/')
          }
     }
    catch(err){
     res.redirect('/')
    }
})
// sever 

app.listen(PORT,async()=>{
     connectDB().
     then(()=>console.log("connected"))
     .catch((err)=>{console.log("not conneted")
     })
})