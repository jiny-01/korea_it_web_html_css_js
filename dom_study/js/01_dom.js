//태그의 id를 통해 선택 -> getElementById
const title1 = document.getElementById("title"); //h1 의 태그아이디 : title
console.log(title1);
console.log({ title1 }); //비구조할당: h1 태그의 속성
//{title1: h1#title} 나옴 - #: 아이디

//태그의 class로 선택 -> getElementsByClassName
const titles = document.getElementsByClassName("title"); //클래스명이 title 인 애들 배열 형태로
console.log(titles);

//태그명을 통해서 선택 - h3 만 -> getElementsByTagName
const h3 = document.getElementsByTagName("h3");
console.log(h3);

//div 의 아이디 로 가져옴
const d1 = document.getElementById("d1");
const d2 = document.getElementById("d2");
console.log(d1);
console.log(d2);
//.innerHTML   //태그 안에 적힌 속성 다 보여줌
//===========================================================
//querySelector => CSS 선택자를 이용하는 것 (더 빠름)
//querySelectorAll -> NodeList 로 나옴
//#아이디, .클래스로 찾음
const h3s = document.querySelectorAll("h3");
console.log(h3s);

const title2 = document.querySelector("#title"); //id 로 단일선택
console.log(title2);
console.log(title2.innerHTML); //태그 안에 적힌 속성 다 보여줌
title2.innerHTML = "변경된 제목"; //innerHTML 활용해서 값 변경 가능

const titles2 = document.querySelectorAll(".title"); //class 다중선택
console.log(titles2);

//d1 - d2 의 내용 변경
const d11 = document.querySelector("#d1");
const d22 = d11.querySelector("#d2");
// d22.innerHTML = "이동윤";

const rd2 = document.getElementById("d2");
// rd2.innerHTML = "김지니";

//태그를 넣을 수도 있음 
const d222 = document.querySelector("#d1 > #d2");
d222.innerHTML = "<p>innerHTML</p>";      //innerHTML - 태그로 인식
d222.innerText = "<p>innerText</p>";      //innerText - 내용만 들어감(텍스트로)
// dd2.innerHTML = "김지니";

//테이블
const 
