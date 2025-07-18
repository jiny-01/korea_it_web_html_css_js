//callback 함수
//다른 함수의 인자로 전달되는 함수
//인자 = 변수?

//비동기콜백
//비동기 작업이 완료된 후에 호출되는 콜백함수
//단, 콜백함수로는 익명함수만 가능

// function getData(callback) {
//   //데이터 받아오는데 2초정도 걸린다 가정하고 서버 통신 흉내냄
//   setTimeout(() => {
//     console.log("서버에서 데이터를 받아왔어요"); //2초뒤 console 출력됨
//     callback({ name: "이동윤" });
//   }, 2000);
// }

// getData((data) => {
//   console.log(data);
// });

//getData 먼저 호출 - 2초 뒤 callback 함수 실행 -> {name: "이동윤"}를 객체(data)로 받음 -> getData 에 객체 넣어서 출력

//getData()가 호출됨 - 일단 settimeout 시작
// setTimeout으로 2초 뒤에 코드 실행됨 -  console.log("서버에서 데이터를 받아왔어요");
// 서버에서 데이터를 받아온 것처럼 "서버에서 데이터를 받아왔어요" 콘솔에 출력
// 받은 데이터 { name: "이동윤" }를 콜백 함수(console.log(data) 에 data로 전달
// 콜백 함수에서 그 데이터를 console.log(data)로 출력

//쇼핑몰
//로그인
function login(username, callback) {
  setTimeout(() => {
    callback(username);    // => console.log(`${username}님이 로그인했습니다.`);
  }, 1000);
}
//장바구니
function addToCart(product, callback) {
  setTimeout(() => {
    callback(product);  // -> console.log(`${product} 가 장바구니에 추가되었습니다.`);
  }, 1000);
}

//결제하기
function checkOut(cardNumber, product, callback) {
  setTimeout(() => {
    callback(cardNumber, product); // ->  console.log(`${product}에 대한 결제가 완료되었습니다.
  }, 1000);
}

console.log("---로그인 요청 보내기---");
login("이동윤", (username) => {
  console.log(`${username}님이 로그인했습니다.`); // `(백틱??) - 안에 문자열처럼 변수 넣을 수 있음

  console.log("---장바구니에 담기 요청 보내기---");
  addToCart("감자", (product) => {
    console.log(`${product} 가 장바구니에 추가되었습니다.`);

    console.log("---장바구니에 담기 요청 보내기---");
    checkOut("1234-567-9012-3456", product, (cardNumber, product) => {
        console.log(`${product}에 대한 결제가 완료되었습니다. 카드번호 : ${cardNumber}`)
    });
  });
});
//위처럼 콜백함수 중첩되면 콜백지옥이 발생된다.

// login() 호출 후 1초 기다림
// 내부 setTimeout 완료(1초 후) callback(username) 실행
// 이때의 callback은 (username) => { console.log(...) }이므로
// 출력: 이동윤님이 로그인했습니다.