const title1 = document.getElementById("title"); //h1 의 태그아이디 : title
console.log(title1);
console.log({ title1 }); //비구조할당: h1 태그의 속성
//{title1: h1#title} 나옴 - #: 아이디

//클래스로 선택
const titles = document.getElementsByClassName("title"); //클래스명이 title 인 애들 배열 형태로
console.log(titles);

//h3 만
const h3 = document.getElementsByTagName("h3");
console.log(h3);
