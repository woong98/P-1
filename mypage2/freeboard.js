const bdy = document.body;
let mainFlag = 0;

function freeboard() //게시판을 생성해주는 그러한 함수
{
    if(mainFlag === 1)
        return;
    mainFlag = 1;
    const upperBoard = document.createElement("div");
    upperBoard.className = "outer-board-name"
    bdy.appendChild(upperBoard);

    //게시판 이름을 표시하는 기능 
    for(let i = 0; i < 2; i++)
    {
        let upperBoardIn = document.createElement("div");
        upperBoardIn.className = "inner-board-name";
        if(i === 0)
        {   upperBoardIn.innerText = "자유게시판"; }
        else
        {   
            const writeButton =  document.createElement("button");
            writeButton.innerText = "글쓰기";
            writeButton.className = "rect-button";
            upperBoardIn.appendChild(writeButton);
        }
        upperBoard.appendChild(upperBoardIn);
    } //반복문으로 내부 div를 여러개 선언해주고. 

    let freepage = document.createElement("div");
    //div를 생성하는거고 이거로 또한 내부에 div를 생성해야 하기에 이를 표시해준다. 
    freepage.className = "outer-board";
    bdy.appendChild(freepage); //freepage의 out요소를 추가해주고 

    for(let i = 0; i < 6; i++)
    {
        let freeInnerpage = document.createElement("div");
        freeInnerpage.className = "inner-board";
        for(let j = 0; j < 3; j++)
        {
            let freeInnertext = document.createElement("div");
            freeInnertext.className = "inner-text";
            freeInnerpage.appendChild(freeInnertext);
        }
        
        freepage.appendChild(freeInnerpage);
    } //반복문으로 내부 div를 여러개 선언해주고. 


    let numPart = document.createElement("div");
    //div를 생성하는거고 이거로 또한 내부에 div를 생성해야 하기에 이를 표시해준다. 
    numPart.className = "outer-num";
    bdy.appendChild(numPart); //freepage의 out요소를 추가해주고 

    for(let i = 0; i < 9; i++)
    {
        let innerNumPart = document.createElement("div");
        innerNumPart.className = "inner-num";
        innerNumPart.innerText = " " + String(i) + " ";
        numPart.appendChild(innerNumPart);
    } //반복문으로 내부 div를 여러개 선언해주고. 
}

let menuFlag = 0;

function menuClickAction()
{ //이 경우에 대해서는 좌측에 새로운 영역을 전개해서 메뉴 목록을 보여줘야한다. 
    if(menuFlag === 0) //메뉴가 전개되어 있지 않은 경우 
    {
        console.log(menuFlag);
        menuFlag = 1;
        const menuBoard = document.createElement("div");
        const menuBar = document.createElement("div");
        menuBoard.className = "menu-back";
        menuBar.className = "menu-show-out";
        for(let i = 0; i < 5; i++)
        {
            let menuBarIn = document.createElement("div");
            menuBarIn.className = "menu-show-in";
            switch(i)
            {
                case 0:
                    menuBarIn.innerText = "자유게시판";
                    break;
                case 1:
                    menuBarIn.innerText = "비밀게시판";
                    break;
                case 2:
                    menuBarIn.innerText = "정보게시판";
                    break;
                case 3:
                    menuBarIn.innerText = "홍보게시판";
                    break;
                case 4:
                    menuBarIn.innerText = "SW게시판";
                    break;

            }
            menuBar.appendChild(menuBarIn); //메뉴바에 메뉴를 추가 
        }
        bdy.appendChild(menuBoard);
        bdy.appendChild(menuBar);
    }
    else //메뉴가 전개되어 있는 경우 
    {
        console.log(menuFlag);
        menuFlag = 0;
        let deleteMenu = document.querySelector(".menu-back");
        bdy.removeChild(deleteMenu);
        deleteMenu = document.querySelector(".menu-show-out");
        console.log(deleteMenu);
        while(deleteMenu.hasChildNodes())
        {
            deleteMenu.removeChild(deleteMenu.firstChild);
        }
        bdy.removeChild(deleteMenu);
    }
}


const ajouClick = document.querySelector(".part1 p");
ajouClick.addEventListener("click", freeboard);

const menuClick = document.querySelector(".banner img");
menuClick.addEventListener("click", menuClickAction);

const writeClick = document.querySelector(".rect-button");
console.log(writeClick);
writeClick.addEventListener("click", writeClickAction);
//현재 writeClick이 찾아지지 않는 문제점이 발생했다. 

