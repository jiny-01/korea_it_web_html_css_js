// 콜백 함수(Callback Function)
// : 어떤 함수의 인자로 전달되어, 그 함수의 실행이 끝난 뒤 나중에 호출되는 함수

// login("이동윤", (username) => {                          //1. login 함수
//   console.log(`${username}님이 로그인했습니다.`);
  
//   addToCart("감자", (product) => {
//     console.log(`${product} 가 장바구니에 추가되었습니다.`);
    
//     checkOut("1234-567-9012-3456", product, (cardNumber, product) => {
//       console.log(`${product}에 대한 결제가 완료되었습니다. 카드번호 : ${cardNumber}`);
//     });
//   });
// });

/*
login() 함수가 실행되며, 내부에서 1초 후에 콜백이 실행됨.
콜백 내부에서 addToCart() 호출됨 → 또 콜백.
/그 안에서 다시 checkOut() 호출 → 또 콜백.
*/

getData();

console.log("----promise----")
function getData() {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = { name: "김지니" }; //서버에서 받아온 데이터
      if (data) {
        //데이터 있으면 -> resolve() 함수 호출
        console.log("서버 요청 성공");
        resolve(data);
      } else {
        //데이터 없으면
        reject(new Error("오류가 발생함"));
      }
    }, 2000);
  });
  return promise;
}


// console.log(promise); //-> pending 상태, result : undefined 로 나옴 -> 서버요청 전에 실행되었기 때문

//질문
// console.log(promise);

// const promise = new Promise((resolve, reject) => {
//   resolve();
// });
//이렇게 하면 에러
//함수나 변수 선언을 코드 최상단으로 끌어올려서 이것도 되는 것 아닌지
//getData() 안에 있어서 호이스팅이 적용안된다..?


function login(name, action, delay) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const message = `${name}님, ${action} 하셔야 합니다.`;
      console.log(message);
      resolve(message);
    }, delay);
  });
}

// 버튼 1
document.getElementById("btn1").onclick = async () => {
  const result = await login("김지니", "로그인", 1000);
  console.log("✅ 완료:", result);
};

// 버튼 2
document.getElementById("btn2").onclick = async () => {
  const result = await login("김지니", "장바구니 담기", 1500);
  console.log("✅ 완료:", result);
};
