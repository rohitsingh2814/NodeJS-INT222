const http = require('http');
const fs = require('fs');


const server = http.createServer((req, res) => {


    // write-file
    if (req.url === '/create-file' && req.method === 'POST') {
        let body = "";


        req.on('data', (chunk) => {
            body += chunk;
        })

        req.on('end', () => {
            const formData = new URLSearchParams(body);

            const filename = formData.get('filename');
            const content = formData.get('content');

            fs.writeFile(filename, content, (err) => {
                if (err) console.log(error);
            })

            res.end(`
                     <script>
                       alert('File Created Successfully!');
                        window.location.href='/create';
                           </script>
                   `);
        })
        return;
    }




    //read-file

    if (req.url === '/read-file' && req.method === 'POST') {
        let body = "";

        req.on('data', (chunk) => {
            body += chunk;
        })

        req.on('end', () => {
            const formData = new URLSearchParams(body);

            const filename = formData.get('filename');;

            fs.readFile(filename, (err, data) => {
                if (err) {
                    return res.end(`<script>
                        alert("file not found")
                        window.location.href="/read"
                        </script>`)
                };
                res.writeHead(200, { 'content-type': 'text-plain' });
                res.end(`
                        <h1>File Content</h1>

                           <pre>
                          ${data.toString()}
                           </pre>

                      <a href="/read">
                 <button>Back</button>
                       </a>
                        `);
            });
        });

        return;
    }


    if (req.url === '/append-file' && req.method === 'POST') {

        let body = "";
        req.on('data', (chunk) => {
            body += chunk
        });


        req.on('end', () => {
            const formData = new URLSearchParams(body);

            const filename = formData.get('filename');
            const content = formData.get('content');


            //to check file is exist or not
            fs.access(filename, fs.constants.F_OK, (err) => {
                if (err) {
                    return res.end(`
                                    <script>
                                  alert("File does not exist!");
                                  window.location.href="/append";
                                  </script>
                                 `);
                }


                fs.appendFile(filename, content, (err) => {
                    if (err) {
                        console.log(err);
                        return res.end(`
                        <script>
                        alert("failed to append Data");
                        window.location.href="/append";
                        </script>`);

                    }

                    res.writeHead(200, { 'Content-type': 'text/html' });

                    return res.end(`<script>
                        alert("Append Data succesfuly");
                        window.location.href="/append";
                        </script>`);




                })
            })


        })
        return;

    }



    //detele file

    if(req.url==='/delete-file' && req.method==='POST'){
         let body="";
         
        req.on('data',(chunk)=>{
            body+=chunk;
        })
         req.on('end',()=>{
           let formData= new URLSearchParams(body);

           let filename=formData.get('filename');

           fs.unlink(filename,(err)=>{
                if(err){
                    return res.end(`
                        <script>
                        alert("failed to delete the file or file not found");
                        window.location.href="/delete";
                        </script>`)
                }

                return res.end(`
                        <script>
                        alert("succesfully delete the file");
                        window.location.href="/delete";
                        </script>`)

           })


         })

        return;
    }
   




    // view-page routing

    let filepath = '';

    if (req.url === '/favicon.ico') {
        return res.end();
    }
    if (req.url === '/') {
        filepath = './views/index.html';
    }
    else if (req.url === '/create') {
        filepath = './views/create.html';
    }
    else if (req.url === '/read') {
        filepath = './views/show.html';
    }
    else if (req.url === '/append') {
        filepath = './views/append.html';
    }
    else if (req.url === '/delete') {
        filepath = './views/delete.html';
    }
    else {
        res.writeHead(400, { 'content-type': 'text/html' });
        return res.end('<h1>404 Page Not Found</h1>');
    }

    fs.readFile(filepath, (err, data) => {
        if (err) {
            res.writeHead(500, { 'content-type': 'text/html' });

            return res.end('<h1>server Error</h1>');
        };
        res.writeHead(200, { 'content-type': 'text/html' });
        res.end(data);
    })


})

server.listen(8000, () => {
    console.log("your project is running yup!");
})