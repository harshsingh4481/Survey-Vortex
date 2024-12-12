//core modules eg http 
//create a web server in nodejs  

const port = process.env.PORT
const http=require('http')
require('./files')

const server=http.createServer((req,res)=>{
    res.write('running node server using http')
   // res.writeHead (200,{'content-type':'text/plain'});
    //response.writeHead(statusCode,[statusMessage],[headers])  number,string,object  
   // res.write(req.url);
    res.end()
});

server.listen(port,()=>console.log(`server is running on port:5000`));