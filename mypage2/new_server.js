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

app.get('/secret', function(req, res) //free형태의 url을 전달받은 경우에
{ 
    con.connect(function(err) //연결. 안의 function은 콜백함수 
    {
      if (err) throw err; 
     //유효한 경우 
     con.query("SELECT * FROM secret", function(err, result, fields)
     { 
        if (err) throw err;
        console.log(result);
        res.send(result);
      });
     //서버에서 table에 접근해서 정보를 불러올 수 있음 
   })
});

app.get('/prom', function(req, res) //free형태의 url을 전달받은 경우에
{ 
    con.connect(function(err) //연결. 안의 function은 콜백함수 
    {
      if (err) throw err; //에러처리 
     //유효한 경우 
     con.query("SELECT * FROM prom", function(err, result, fields)
     { //query문에서의 function에대한 정보를 찾아봐야 할 듯 
        if (err) throw err;
        console.log(result);
        res.send(result);
      });
     //서버에서 table에 접근해서 정보를 불러올 수 있음 
   })
});

app.get('/info', function(req, res) //free형태의 url을 전달받은 경우에
{ 
    con.connect(function(err) //연결. 안의 function은 콜백함수 
    {
      if (err) throw err; //에러처리 
     //유효한 경우 
     con.query("SELECT * FROM info", function(err, result, fields)
     { //query문에서의 function에대한 정보를 찾아봐야 할 듯 
        if (err) throw err;
        console.log(result);
        res.send(result);
      });
     //서버에서 table에 접근해서 정보를 불러올 수 있음 
   })
});

app.get('/sw', function(req, res) //free형태의 url을 전달받은 경우에
{ 
    con.connect(function(err) //연결. 안의 function은 콜백함수 
    {
      if (err) throw err; //에러처리 
     //유효한 경우 
     con.query("SELECT * FROM sw", function(err, result, fields)
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
