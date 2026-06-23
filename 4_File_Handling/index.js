const fs=require("fs");
 

//WRITING FILE
//sync...
fs.writeFileSync('4_File_Handling/syncnewfile.txt','hello this is new file from sync method');
    console.log("file created successfully sync");

//async...
fs.writeFile('4_File_Handling/asyncnewfile.txt',"hello this is new file from asyc method", (err)=>{
          if(err){
              console.err(err);
              return;
          }
          console.log("file created succesfully async");
})

//promise based
const fspromise=require("fs").promises;

async function writeFile() {
    try{
        await fspromise.writeFile('4_File_Handling/promisenewfile.txt','Hello this file is created using promise method');
        console.log("file created succesfully promise");

    }
    catch(err){
        console.error(err);
    }
    
}
writeFile();



//READING FILE

//sync...
const data=fs.readFileSync('4_File_Handling/syncnewfile.txt','utf8');
console.log(data);

//async...
fs.readFile('4_File_Handling/asyncnewfile.txt',(err,data)=>{
    if(err){
        console.error(err);
    }
    console.log(data.toString());
})

//promise based...
async function readFile(){
    try{ const data= await fspromise.readFile('4_File_Handling/promisenewfile.txt','utf8')
            console.log(data);
    }
   catch{
        if(err){
            console.error(err);
        }
   }
}

readFile();



//APPENDING asyns...

fs.appendFile('4_File_Handling/asyncnewfile.txt','Append data',(err)=>{
    if(err){
        console.log(err);
    }
    console.log("append data Susscesuuly");
});

//DELETING 

fs.unlink('4_File_Handling/asyncnewfile.txt',err=>{
    if(err){ console.error(err)}
    console.log("file deleted succesfully");

})





