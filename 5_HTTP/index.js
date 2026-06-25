const http=require('http');
const fs=require('fs');

const products = require('./product.json');



const server=http.createServer((req,res)=>{
    //set respose header
    res.writeHead(200,{'content-type':'text/plain'});

    //write response body 
    res.end("hello world");

})


const server2=http.createServer((req,res)=>{
    if(req.url=='/'){
         res.writeHead(200,{'content-type':'text/html'});
         res.end('<h1>Home Page</h1>');
    }
    else if(req.url=='/about'){
         res.writeHead(200,{'content-type':'text/html'});
         res.end('<h1>About Page</h1>');
    }

    else if(req.url=='/api'){
       res.writeHead(200,{'content-type':'application/json'});
       res.end(JSON.stringify(products));
    }
    else if(req.url=="/html"){
        fs.readFile('./index.html',(err,data)=>{
             if(err)console.log(err);

            res.writeHead(200,{'content-type':'text/html'});
            res.end(data);

        });

        
    }
    else{
         res.writeHead(400,{'content-type':'text/html'});
         res.end('<h1>Page Not Found</h1>');
    }
})




server2.listen(8000,()=>{
    console.log("server is started");
})