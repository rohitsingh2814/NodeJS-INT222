const express=require('express');

const path = require('path');

const app=express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const userRoutes=require('./routes/user');


// app.get('/',(req,res)=>{
//     res.send("hello");
// })

app.use('/user',userRoutes);
// app.get('/user/:id',(req,res)=>{
//     res.send(req.params.id);
// })

// app.get('/user/:id/:name',(req,res)=>{
//     res.send(req.params);
// })




const PORT=5000;
app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
})