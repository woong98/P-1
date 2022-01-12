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
        console.log(hidedMenuBack);
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
}


function boards(boardName, adr)
{
    //adr의 경우에는 게시판마다 할당될 가상의 address 
    let tempBoard = createAndAdd("div", "big-board", document.body); //div요소 하나를 만들어줘서 게시판 기능을 구성한다.
    let nameBoard = createAndAdd("div", "name-board", tempBoard); //게시판 상부 이름구성 등  

    createAndAdd("div", "name-show", nameBoard, boardName); 
    createAndAdd("div", "name-show", nameBoard, "a"); 
    createAndAdd("div", "write-show", nameBoard, "글쓰기"); 
    //게시판 상부 구현  

    let mainBoard = createAndAdd("div", "main-board", tempBoard); //게시판 내부에 들어가야 할 내용 
    
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
        let outtable =  createAndAdd("table", "out-table", mainBoard);
        const keyNames = Object.keys(a[0]);
        for(let i = 0; i < keyNames.length; i++)
        {
            createAndAdd("th", "table-key", outtable, keyNames[i]);
        }
        for(let i = 0; i < a.length; i++)
        {
            let tableRow = createAndAdd("tr", "table-row", outtable);
            for(let j = 0; j < keyNames.length; j++)
            {
                createAndAdd("td", "table-element", tableRow, a[i][keyNames[j]]);
            }      
        }
        //이 경우 innerText를 적용해야한다. innerText는 그거 data를 바탕으로 선정한다.
        
    });

    

    createAndAdd("div", "num-board", tempBoard); //게시판 하부 숫자 구성 

    const title = '';
    history.pushState("div", title, `/${adr}`);
}
    
const menuClick = document.querySelector(".banner img");
menuClick.addEventListener("click", menuClickAction); //메뉴 클릭에 대한 이벤트 리스너 

boards("자유게시판", "free");