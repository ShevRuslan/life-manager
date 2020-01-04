require('./db');
const http = require("http");

let message = "Hello World!";
http.createServer(function(request,response){
     
    console.log(message);
    response.end(message);
     
}).listen(3001, "127.0.0.1",()=>{
    console.log("Сервер начал прослушивание запросов");
});