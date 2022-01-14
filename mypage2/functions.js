function createAndAdd(ele, clsname, pr, intext) //ele라는 tag를 생성 후, clsname을 클래스로 설정한 다음에 pr의 자식으로 넣어주는 함수 
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

function createMenu() //메뉴를 초기에 생성. 
{
    createAndAdd("div", "menu-back", document.body); 
    const menuBar = createAndAdd("div", "menu-show-out", document.body); 

    const testArr = ['자유게시판','비밀게시판','정보게시판','홍보게시판','SW게시판'];

    testArr.forEach( item => createAndAdd("div","menu-show-in", menuBar, item));

    document.querySelector(".menu-back").style.display = "none";
    document.querySelector(".menu-show-out").style.display = "none";
}

function menuClickAction() //메뉴가 클릭되는 경우에 일어나는 action 
{ 
    //이 경우에 대해서는 좌측에 새로운 영역을 전개해서 메뉴 목록을 보여줘야한다. 
    if(document.querySelector(".menu-back").style.display == "none") //메뉴가 전개되어 있지 않은 경우 
    {
        document.querySelector(".menu-back").style.display = "block";
        document.querySelector(".menu-show-out").style.display = "flex";
    }
    else //메뉴가 전개되어 있는 경우 
    {
        document.querySelector(".menu-back").style.display = "none";
        document.querySelector(".menu-show-out").style.display = "none";
    }  
}

function createBoard() //이 경우 처음으로 board를 생성하는 과정 
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

function nameMatching(a)
{
    if(a == "free") return "자유게시판";
    else if(a == "secret") return "비밀게시판";
    else if(a == "info") return "정보게시판";
    else if(a == "prom") return "홍보게시판";
    else if(a == "sw") return "SW게시판";
}

function nameMatchingReverse(a)
{
    if(a == "자유게시판") return "free";
    else if(a == "비밀게시판") return "secret";
    else if(a == "정보게시판") return "info";
    else if(a == "홍보게시판") return "prom";
    else if(a == "SW게시판") return "sw";
}

function boards(adr, pn, his)
{
    if(his == undefined)
        history.pushState(null, null, `/${adr}/${pn}`);
    //history에 지정한 adr과 pn을 통해서 등록 

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
    //여기까지는 게시판을 초기화해주는 과정 

    document.querySelector(".name-show").innerText = nameMatching(adr);
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
        }
    });
}

window.onpopstate = function(event) { //뒤로가기 등 발생시 처리하는 이벤트 
    //여기에 분기에 따른 결과를 넣어줘야 한다
    
    let strArr = location.pathname.split('/');
    if(strArr.length == 2)
        boards(strArr[1], 1, 1);
    else if(strArr.length == 3)
        boards(strArr[1], strArr[2], 1);
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
    boards("free", 1);
}


createBoard();
createMenu();
boards("free", 1);

const menuClick = document.querySelector(".banner img"); //메뉴 클릭에 대한 이벤트 리스너
menuClick.addEventListener("click", menuClickAction);  

const boardClick = document.querySelector(".menu-show-out"); //게시판 이동을 위한 리스너 
boardClick.addEventListener("click", function(e)
{
    let a = e.target.innerText;
    if(a == "자유게시판") boards("free", 1);
    else if(a == "비밀게시판") boards("secret", 1);
    else if(a == "정보게시판") boards("info", 1);
    else if(a == "홍보게시판") boards("prom", 1);
    else if(a == "SW게시판") boards("sw", 1);
}); 

const numClick = document.querySelector(".num-board");
numClick.addEventListener("click", function(e)
{
    let tBoard = nameMatchingReverse(document.querySelector(".name-show").innerText); //tBoard내부에는 게시판 이름 드감
    let a = e.target.innerText;
    boards(tBoard, a);
});

const writeClick = document.querySelector(".write-show");
writeClick.addEventListener("click", writeClickAction);

const ajouClick = document.querySelector(".part1");
ajouClick.addEventListener("click", ajouClickAction);

