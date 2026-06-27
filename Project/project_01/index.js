const express =require('express');
const users=require('./MOCK_DATA.json');
const fs =require('fs');


const app=express();
app.use(express.urlencoded({extended:true}))

app.get('/api/user',(req,res)=>{
   return res.json(users)
})

app.get('/user',(req,res)=>{
    const html=`
    <ul>${users.map(user=>
        `<li>First name : ${user.first_name}<br>
            Email:${user.email}
        </li>
        `).join("")}
    </ul>`
    
    return res.send(html);
})


app.get('/api/user/:id',(req,res)=>{
    const id=Number(req.params.id);

    const user=users.find((user)=>user.id===id);

    return res.json(user);
})

app.post('/api/user',(req,res)=>{
 const data=req.body;
 console.log(data);

 users.push({...data,id:users.length+1});

 fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),err=>{
    if(err){
      console.error(err);
    }

    res.status(201).json({
        messsage:"user created succesfully",
        id:users.length
    });
 })

})

app.patch('/api/user/:id',(req,res)=>{
    const id=Number(req.params.id);

    const index=users.findIndex(user=>user.id===id);


    if(index===-1){
        return res.status(404).json({
            message:"User Not found"
        })
    }
    
    users[index]={id,...req.body};
    

    fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),err=>{
    if(err){
      console.error(err);
    }

    res.status(201).json({
        messsage:"user update successfully",
        id:users[index].id
    });
 })

})

app.delete('/api/user/:id',(req,res)=>{
    const id=Number(req.params.id);

     const index=users.findIndex(user=>user.id===id);



    if(index===-1){
        return res.status(404).json({
            message:"User Not found"
        })
    }
    
    users.splice(index,1);

    fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),err=>{
    if(err){
      console.error(err);
    }

    res.status(201).json({
        messsage:"user delete successfully",
        id:id
    });

})
})

const PORT=8000;

app.listen(PORT,()=>{
    console.log(`server is started in port ${PORT}`);
})