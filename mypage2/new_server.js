const http = require("http");
const url = require("url");
const fs = require("fs");
const { dir } = require("console");
let mysql = require('mysql2');
const express = require('express');
const path = require('path');

let con = mysql.createConnection(
    {
      host:"localhost",
      user:"nodejs",
      password: '545493',
      port : "3306",
      database : "mongsite"
    }
  ); //데이터베이스 관련 connection 

let app = express();
app.use(express.static(__dirname));
app.get('/', function(req, res)
{
    res.sendFile(path.join(__dirname, '/mong.html'));
});

app.get('/free', function(req, res) //free형태의 url을 전달받은 경우에
{ 
    con.connect(function(err) //연결. 안의 function은 콜백함수 
    {
      if (err) throw err; //에러처리 
     //유효한 경우 
     con.query("SELECT * FROM free", function(err, result, fields)
     { //query문에서의 function에대한 정보를 찾아봐야 할 듯 
        if (err) throw err;
        console.log(result);
        res.send(result);
      });
     //서버에서 table에 접근해서 정보를 불러올 수 있음 
   })
});


app.listen(3000, function()
{
    console.log('example app listening');
});


/*


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

  con.connect(function(err) //연결. 안의 function은 콜백함수 
  {
    if (err) throw err; //에러처리 
    //유효한 경우 
    con.query("SELECT * FROM free", function(err, result, fields)
    { //query문에서의 function에대한 정보를 찾아봐야 할 듯 
      if (err) throw err;
      console.log(result);
    });
   //서버에서 table에 접근해서 정보를 불러올 수 있음 
  })

    response.writeHead(200);
    response.end(fs.readFileSync(__dirname + _url));
});

app.listen(3000, function() //listen 뒤의 function은 결국에 서버가 최초로 열릴때만 나오는거지 
{   //이 listen은 결국에 request요청에 대해서 event가 존재하는지 지속적으로 체크하는 역할  
    //이 function은 결국 이 listener가 added될때 호출되는 함수이므로 한 번만 호출되는거임 
    console.log("서버가 실행");
});

*/