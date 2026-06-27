const express=require('express');

const app=express();
const artmithicMiddle=require('./artmithicMiddle.js');

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(express.static('public'));

app.post('/calculate',artmithicMiddle,(req,res)=>{
    res.send(`
            Result:${req.result.originalnumber}
            increment:${req.result.increment}
            decrement:${req.result.decrement}
            square:${req.result.square}

            <button 
        
            onclick="window.location.href='/'";
            
        
            > back</button>
             

        `)
})

app.listen(5000,()=>{
    console.log("server is started");
})