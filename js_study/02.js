//자바 스크립트의 함수

//일반 함수 정의
function 함수명(매개변수1, 매개변수2) {
  console.log("함수 호출됨");
  let 리턴데이터 = null;
  console.log(매개변수1);
  console.log(매개변수2);
  return 리턴데이터;
}

console.log("--일반 함수--");
const 리턴값 = 함수명(); //호출한 함수명을 리턴값이라는 상수에 담음
console.log(리턴값); // 출력 -> null
const 함수명2 = 함수명; //함수 자체를 다른 변수에 할당
const 리턴값2 = 함수명2(10, 20); //10, 20 은 출력됨
console.log(리턴값2); // 출력 -> null
const 리턴값3 = 함수명2(10); //10, undefined
console.log(리턴값3); //null

//익명함수 : 이름이 없는 함수로, 주로 변수에 할당하거나
//          다른 함수의 인수로 사용

console.log("--익명 함수--");
const 함수명3 = function (매개변수1, 매개변수2) {};
// function(1,2) 의 함수명이 함수명3 는 아님 -> 즉 이름 없는 익명함수
//함수명3 라는 상수에 익명함수가 할당
//리턴할 것 없으면 return 불필요

//화살표 함수
/**
 * 1. 매개변수가 하나면 () 괄호 생햑 가능
 * 2. 실행문이 한줄이라면 {} 괄호 생략 가능
 * 3. {} 생략 시 값만 입력하려면 return 값이 됨
 * 즉, {} 생략 안하고 return 하려면 return 키워드 명시
 */

console.log("--화살표 함수--");
const 함수명4 = (매개변수1, 매개변수2) => {
  //코드
  // return "리턴값"   -> return 부분 생략 가능
};

// function fx1() {
//     console.log("fx1 호출")
// }
const fx1 = () => console.log("fx1 호출");
const fx2 = (n) => console.log(n, "출력");
// const fx_2 = n => console.log(n, "출력");  //괄호 없애기도 가능

const fx3 = (n) => n + 1;
const fx4 = (n) => {
  console.log(n, "출력");
  return n + 1;
};
const fx5 = (a, b) => a * b;
fx1();
console.log(fx3(10));

function a() {
  // 빈 함수 가능
}

const 리턴값4 = 함수명;
//함수를 호출한 게 아님, 함수명 자체를 리턴값 4에 할당
//const 리턴값4 = 함수명();  -> () 있으면 함수의 리턴값을 리턴할 것
console.log(리턴값4()); //-> null : 함수의 리턴값 출력할 것

console.log("--고차함수--");
const aa = () =>  {
    console.log("aa함수 호출")
    return "aa함수 리턴값"
}

const bb = (fxx) =>  {
    console.log("bb함수 호출")
    return fxx;
}

const aaa = (fxx, fxx2) => {
    console.log("aaa함수 호출")
    console.log(fxx())  //
    console.log(fxx2()) //aa
    return "aaa함수 리턴값"
}
console.log(aaa(bb(aa), bb(aa)))

//bb(aa) 안에서부터 
// bb "함수 호출"
// bb "함수 호출" / fxx : aa 함수 -> fxx, 즉 aa 함수를 리턴
//  aa함수 리턴 =>  "aa 함수 호출"
//                  "aa함수 리턴값"
// 다음 aaa 함수로 감
// aaa 함수 실행 => "aaa함수 호출"
// aaa(bb(aa))
// console.log(fxx()) 실행, fxx() : 함수

//                  "aaa함수 호출"
// console.log(fxx())  -> "aa함수 호출"
//                         "aa 함수 리턴값"
// console.log(fxx2())  -> "aa 함수 호출"
//                          "aa 함수 리턴값"
// return "aaa함수 리턴값"     => "aaa함수 리턴값" 
            
