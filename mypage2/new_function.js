let menuFlag = 0; //메뉴바에 대한 플래그 
let pageFirstLoaded = 1; //처음 서버로부터 받아왔는가에 대한 플래그 
//const axios = require("axios").default;

function createAndAdd(ele, clsname, pr, intext)
{
    let a = document.createElement(ele);
    a.className = clsname;
    if(intext != undefined)
    {
        a.innerText = intext;
    }
    pr.appendChild(a);      
    return a;
}
//ele라는 tag를 생성 후, clsname을 클래스로 설정한 다음에 pr의 자식으로 넣어주는 함수 

function freeCliked()
{
    boards("자유게시판", "free", 1);
    history.pushState(null, null, '/free/1');
}
function secretCliked()
{
    boards("비밀게시판", "secret", 1);
    history.pushState(null, null, '/secret/1');
}
function infoCliked()
{
    boards("정보게시판", "info", 1);
    history.pushState(null, null, '/info/1');
}
function promCliked()
{
    boards("홍보게시판", "prom", 1);
    history.pushState(null, null, '/prom/1');
}
function swCliked()
{
    boards("SW게시판", "sw", 1);
    history.pushState(null, null, '/sw/1');
}


function menuClickAction()
{ 
    //이 경우에 대해서는 좌측에 새로운 영역을 전개해서 메뉴 목록을 보여줘야한다. 
    if(menuFlag === 0) //메뉴가 전개되어 있지 않은 경우 
    {
        menuFlag = 1;
        createAndAdd("div", "menu-back", document.body); 
        const menuBar = createAndAdd("div", "menu-show-out", document.body); 
        
        createAndAdd("div", "menu-show-in", menuBar, "자유게시판");
        createAndAdd("div", "menu-show-in", menuBar, "비밀게시판");
        createAndAdd("div", "menu-show-in", menuBar, "정보게시판");
        createAndAdd("div", "menu-show-in", menuBar, "홍보게시판");
        createAndAdd("div", "menu-show-in", menuBar, "SW게시판");
    }
    else if(menuFlag === 1)//메뉴가 전개되어 있는 경우 
    {
        menuFlag = 2;
        let hidedMenuBack = document.querySelector(".menu-back");
        hidedMenuBack.className = "menu-back-blocked";
        hidedMenuBack = document.querySelector(".menu-show-out");
        hidedMenuBack.className = "menu-show-blocked";
        //메뉴바를 가리고 
        let hidedMenus = document.querySelectorAll(".menu-show-in");
        for(let i = 0; i < 5; i++)
        {
            hidedMenus[i].className = "menu-show-blocked2";
        }
    }
    else //메뉴가 전개되어 있지 않지만, 이미 객체는 생성되어 있는 경우 
    {
        menuFlag = 1;
        let hidedMenuBack = document.querySelector(".menu-back-blocked");
        hidedMenuBack.className = "menu-back";
        hidedMenuBack = document.querySelector(".menu-show-blocked");
        hidedMenuBack.className = "menu-show-out";
        //메뉴바를 가리고 
        let hidedMenus = document.querySelectorAll(".menu-show-blocked2");
        for(let i = 0; i < 5; i++)
        {
            hidedMenus[i].className = "menu-show-in";
        }
    }
    
    if(menuFlag === 1)
    { //이 경우에는 메뉴가 열려있는 시점임 
        const freeClick = document.querySelectorAll(".menu-show-in");
        freeClick[0].addEventListener("click", freeCliked);
        freeClick[1].addEventListener("click", secretCliked);
        freeClick[2].addEventListener("click", infoCliked);
        freeClick[3].addEventListener("click", promCliked);
        freeClick[4].addEventListener("click", swCliked);
    }
    
}

function createboard() //이 경우 처음으로 board를 생성하는 과정 
{
    //adr의 경우에는 게시판마다 할당될 가상의 address 
    let tempBoard = createAndAdd("div", "big-board", document.body); //div요소 하나를 만들어줘서 게시판 기능을 구성한다.
    let nameBoard = createAndAdd("div", "name-board", tempBoard); //게시판 상부 이름구성 등  

    createAndAdd("div", "name-show", nameBoard); //이 경우에는 초기에는 값이 없는게 맞기 때문에. 
    createAndAdd("div", "name-show", nameBoard, ""); 
    createAndAdd("div", "write-show", nameBoard, "글쓰기"); 
    //게시판 상부 구현  

    let mainBoard = createAndAdd("div", "main-board", tempBoard); //게시판의 메인보드 구성  
    
 
    let outtable =  createAndAdd("table", "out-table", mainBoard);
    for(let i = 0; i < 5; i++)
    {
         createAndAdd("th", "table-key", outtable);
    }
    for(let i = 0; i < 10; i++)
    {
        let tableRow = createAndAdd("tr", "table-row", outtable);
        for(let j = 0; j < 5; j++)
        {
            createAndAdd("td", "table-element", tableRow, " ");
        }      
    }
    let numBoard = createAndAdd("div", "num-board", tempBoard); //게시판 하부 숫자 구성 
    for(let i = 0; i < 10; i++)
    {
        createAndAdd("div", "num-board-ele", numBoard, " ");
    }
}

function boards(boardName, adr, pn)
{
    //테이블 내부 요소들을 기본값으로 변경하는 과정이 필요하다. 
    let tableRow = document.querySelectorAll(".table-row");
    for(let i = 0; i < tableRow.length; i++)
    {
        for(let j = 0; j < 5; j++)
        {
            tableRow[i].childNodes[j].innerText = " ";
        }
    }

    let numEle = document.querySelectorAll(".num-board-ele");
    for(let i = 0; i < numEle.length; i++)
    {
            numEle[i].innerText = " ";
    }

    document.querySelector(".name-show").innerText = boardName;
    //게시판 이름을 변경 
    function getdbData(cb)
    {
        axios.get(`/${adr}`).then(function(response)
        {
                cb(response.data);
        });
    }
    getdbData(function(a)
    {
        //이렇게 콜백함수를 사용하는 경우에는, a에 현재 DB의 데이터가 들어있는 것을 확인 가능하다 
        const keyNames = Object.keys(a[0]);
        for(let i = 0; i < 5; i++)
        {
            document.querySelectorAll(".table-key")[i].innerText = keyNames[i];
        }
        tableRow = document.querySelectorAll(".table-row");
        

        for(let i = 0 + 10*(pn - 1); i < 10 + 10*(pn - 1); i++)
        {
            if(i >= a.length)
                break;
            for(let j = 0; j < keyNames.length; j++)
            {
                if(keyNames[j] == "date")
                {
                    let tempStr = a[i][keyNames[j]];
                    let newStr = tempStr.split("T");
                    tableRow[i - 10*(pn - 1)].childNodes[j].innerText = newStr[0];
                    continue;
                }
                tableRow[i - 10*(pn - 1)].childNodes[j].innerText = a[i][keyNames[j]];
            }      
        }
        //이 경우 innerText를 적용해야한다. innerText는 그거 data를 바탕으로 선정한다.
        let numOf = parseInt(a.length/10 + 1); //이것은 이제 적용해야할 번호수
        numEle = document.querySelectorAll(".num-board-ele");
        for(let i = 1; i < numOf + 1; i++)
        {
            numEle[i - 1].innerText = String(i);
            numEle[i - 1].addEventListener("click", function()
            {
                history.pushState(null, null, `/${adr}/${i}`);
                boards(boardName, adr, i);
            });
        }
    });
}

window.onpopstate = function(event) { //뒤로가기 등 발생시 처리하는 이벤트 
    //여기에 분기에 따른 결과를 넣어줘야 한다
    switch(location.pathname)
    {
        case '/free/1' :
            boards("자유게시판", "free", 1);
            break;
        case '/secret/1' :
            boards("비밀게시판", "secret", 1);
            break;
        case '/info/1' :
            boards("정보게시판", "info", 1);
            break;
        case '/prom/1' :
            boards("홍보게시판", "prom", 1);
            break;
        case '/sw/1' :
            boards("SW게시판", "sw", 1);
            break;
        default:
            break;
    }
  };

function writeClickAction() //글쓰기 클릭 
{
    let tempBoard = document.querySelector(".big-board");
    tempBoard.style.display = "none";
}

function ajouClickAction() //Ajou클릭 
{   
    let tempBoard = document.querySelector(".big-board");
    tempBoard.style.display = "flex";
    boards("자유게시판", "free", 1);
    history.pushState(null, null, '/free/1');
}

createboard();
boards("자유게시판", "free", 1);
history.pushState(null, null, '/free/1');

const menuClick = document.querySelector(".banner img");
menuClick.addEventListener("click", menuClickAction); //메뉴 클릭에 대한 이벤트 리스너 

const writeClick = document.querySelector(".write-show");
writeClick.addEventListener("click", writeClickAction);

const ajouClick = document.querySelector(".part1");
ajouClick.addEventListener("click", ajouClickAction);
