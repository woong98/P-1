/*
자바스크립트에서 먼저 메인 페이지를 만들기 위해서는, 화면에 아무것도 표시되지 않는지부터 확인해보는 것이 좋음
-> 이를 위해서 옵션 형태로 변수를 주면 될라나 
*/

let pagenum = 0; //페이지를 처음 열었을 때 기본값으로 pagenum을 0으로 선택한다.
if(pagenum === 0)
{ //이 경우 자유게시판을 표시한다

}

function freeboard
{
    const freepage = document.createElement("div");
    freepage.className = "free-board";
}