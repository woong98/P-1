const http = require("http");
const url = require("url");
const fs = require("fs");
const { dir } = require("console");

let mysql = require('mysql2');

let con = mysql.createConnection(
  {
    host:"localhost",
    user:"nodejs",
    password: '545493',
    port : "3306",
    database : "mongsite"
  }
)

con.connect(function(err)
{
  if (err) throw err;
  console.log("connected");
})

var app = http.createServer(function(request,response){ //여기서의 function은 requestlistener로써 작용함
  
    var _url = request.url; 
    console.log(_url);
    //var queryData = url.parse(_url, true).query;
    //console.log(queryData);

    if(_url == '/'){ 
      _url = '/mong.html'; 
    }
    if(_url == '/favicon.ico'){ 
      response.writeHead(404); 
      response.end(); 
      return;
    }

    response.writeHead(200);
    response.end(fs.readFileSync(__dirname + _url));
    console.dir(response)
    //response.end(queryData.id); 
});

app.listen(3000, function() //listen 뒤의 function은 결국에 서버가 최초로 열릴때만 나오는거지 
{   //이 listen은 결국에 request요청에 대해서 event가 존재하는지 지속적으로 체크하는 역할  
    //이 function은 결국 이 listener가 added될때 호출되는 함수이므로 한 번만 호출되는거임 
    console.log("서버가 실행");
});