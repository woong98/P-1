# node js 

웹 서버 기능을 내장한다!
자바스크립트의 실행 환경!
- 웹 브라우저 밖에서도 자바스크립트를 실행 가능하다
- 이 때문에 터미널을 쓰는거같음!!
- 자바스크립트 하나로도 백앤드를 다룰 수 있음 

```javascript=
var http = require('http');
var fs = require('fs');
var url = require('url');
// 이 앞에 3개는, 모듈이라는 것을 불러와서 객체에 저장
// 모듈은 각 js나 뭐 그런 파일 하나라고 생각하면 된다.

var app = http.createServer(function(request,response){
    //http라는 객체의 createServer을 호출한다. 
    // 인자로는 아래와 같은데 아직 복잡해서 이 부분은 넘어가고 
    // 추후에 각 의미를 알 수 있을때 까지! 
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    console.log(queryData);
    
    if(request.url == '/'){
      _url = '/index.html';
    }
    if(request.url == '/favicon.ico'){
        response.writeHead(404);
        response.end();
        return;
    }
    response.writeHead(200);
    console.log(__dirname + _url)
    response.end(queryData.id);
 
});
app.listen(3000); //로컬호스트 3000
/*
알아봐야 하는 것.
1. request, response는 무엇인가
-> 이 부분은 전역변수라고 착각해서 계속 이 부분을 찾아봤는데, 다시 보니 함수의 인자였던것.... 마음이 아프네요. 

2. 각 모듈이 담긴 객체는 어떤 역할을 하기 위해서 존재하는가
3. require에서는 어떤 동작을 하는것인가?
 */ 
```
## 위의 코드로 알 수 있는 것
먼저 queryData는 url 객체에 존재하는 parse메소드를 통해서 적당히 parse를 한 후에, 이 결과에 대한 property 중 query를 가지고 있다. 이 query에서 현재 저장하는 있는 정보는 
</br>
또한 이 js파일의 경우에는 전역변수로 global을 가지는데, 이는 nodejs로 실행할 파일이기 때문이다. nodejs로 실행할 파일은 global 속성을 가질 수 있다.
혹시나 해서 이거를 HTML 환경에서 트라이를 해 보았음
 

## URL
- https://mongchan.com:3000/main?id=HTML&page=12
- 여기서 main은 path, 그 위에 있는게 queryString이다.(?제외)

## 노드의 모듈화
- 확장성을 위해서 모듈 구조를 통해 애플리케이션을 구성
- 모듈 기본적으로 다수의 클래스와 객체로 구성된다
(객체지향적 구성!)
- 기본 포함 여부 : 기본모듈과 확장모듈
- 어떤 언어로 개발되었는지 : 일반모듈과 네이티브모듈(javascript)

### 기본 모듈
- 기본 모듈은 기본적으로 설치되어있다
- 파일 입출력, 이벤트 관리, HTTP 프로토콜 관리 등에 관한 내용
- 이에 따라서 비동기 입출력 처리를 위한 기본적인 기능 제공 가능
### 확장 모듈 
- 확장 모듈의 경우는 기본보다 좀 더 강력한 기능을 제공
- express와 같은 모듈들처럼 하나의 프레임워크로 제공되기도 함
### 모듈의 식별자
- 모듈의 식별자로는 확장자 없는 전체 경로를 사용한다
- 모듈은 파일과 일대일 대응을 하기 때문에 파일 이름만으로 가능
- 상대식별, 절대식별이 있음(이거는 상대경로와 절대경로를 생각하면 된다)
- 경로를 입력하지 않고 <strong>모듈 이름만 입력하는 경우 최상이 레벨 식별자로 인식.</strong> 설치된 전체 확장 모듈이나 기본 모듈 중에서 해당 모듈 이름 검색. 
</br>
</br>
## 전역 객체의 개념
- 서버 사이드에서 동작하는 노드의 경우에는 global이라는 전역 객체가 존재한다.
- 클라이언트 사이드에서는 window가 기본적으로 전역객체임
### global
- require, setTimeout(), console.log() 등을 포함한다.
</br>
#### console 객체 
- console.log() //출력!
- console.time() //시간측정 시작
- console.timeEnd() //시간측정 종료

#### process 객체
- process.argv: 프로그램의 매개변수 정보
- process.env : 컴퓨터 환경과 관련된 정보
- process.version : Node.js의 버전
- process.versions : Node.js 프로세스에서 사용하는 모듈들의 버전
- process.arch : 프로세서의 아키텍처
- process.platform : 플랫폼의 정보
</br>
- process.exit() //프로그램 종료
- process.memoryUsage() //메모리 사용 정보
- process.uptime() //현재 프로그램이 실행된 시간

#### exports 객체
- 기본적을 모듈에 관련된 객체이다.
* 모듈 생성을 하기 위해서는 파일을 만들고 exports 객체의 속성이나 메소드로 정의해 주면 된다. 

#### 그 외의 객체
- os 객체(메모리, 디스크 CPU등에 대한 정보를 확인 가능하다)
- Utility 모듈 : 보조 기능 담당
- FileSystem 모듈
- Event 모듈


ex) 함수 선언 시 다음과 같이 하면 
```
exports.double = function(r) 
{
    return r*r;
};
exports.plus = function(r)
{
    return r + r;
};

//이 경우 double과 plus 함수에 대한 것이 exports 형태로 이루어진 것임.
```
이렇게 만들어진 파일을 현재 폴더에 존재하는 test.js라고 하자. 이 경우 리눅스처럼 접근하여 상대경로를 사용하게 되면 된다
```
var cacul = require(''./test.js');
cacul.double(3);
cacul.plus(3);
// 이렇게 하면 cacul은 현재 test형 모듈을 가져온 것이고
```
## require 메소드

- 클라이언트 사이드에서는 HTML을 통해서 자바스크립트 파일들이 서로 참조하거나 호출이 가능하다
- 노드는 HTML을 사용하지 않으므로, 서로 참조하고 호출하는 방법이 원래는 따로 없음  ->> require메소드의 등장

- module.exports를 이용해서 모듈이 제공하는 함수나 객체등을 반환한다.(여기서 불러온 모듈이 다른 모듈을 필요로 하는 경우 그 모듈 또한 같이 로드하도록 한다.)

- <strong>결국 require가 하는 일은, 모듈(다른 js파일 등) 을 현재 js파일에서 사용하는 등의 상호작용을 하기 위해서이다.</strong>


# 근본적인 질문
- 이놈의 process 객체는 그러면 어디 사이드꺼임?
-> process객체로 출력되는 결과로 확인해봤을 때, 현재 node js를 실행한 프로세스에 대한 정보를 출력해줌 

- Node.js는 결국에 프로그램인거는 알겠음. 근데 어디에서 실행되는거임? 서버사이드? 클라이언트 사이드?




