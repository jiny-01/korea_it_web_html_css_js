// promise 는 기본적으로 자바스크립트의 비동기처리에 사용되는 객체
// Promise는 콜백 함수와 유사한 역할(비동기 처리) 을 하지만,
// "콜백지옥(callback hell)"을 피하고,
// 코드를 더 읽기 쉽게 하기 위해 

// promise 객체는 state 와 result 라는 속성을 가지고 있다.
// state 에는 3가지 (state 당 result 가지고 있음)
// 대기, 이행, 거부
// 1) 대기 (pendding) : 초기 상태, 비동기 작업이 아직 완료되지 않은 상태
// 이 때의 -- result : undefined
// 2) 이행 (fulfilled) : 비동기작업이 성공적으로 완료된 상태
// 이 때 -- result : 성공적으로 완료된 결과값
// 3) 거부 (rejected) : 비동기 작업이 실패한 상태
// 이 때 -- result : error (실패한 이유)

//Promise 객체 하나 만들어서 promise 변수에 넣음
//promise 의 인자로 setTimeout 함수를 전달받는데
//이 때 setTimeout -> executor 함수라고 함
//executor 함수
//객체 생성과 동시에 즉시 실행되는 함수
//executor 함수에는 인자로 resolve, reject 들어감 (따로 넣어주는 게 아닌 원래 있음)
//resolve -> 비동기작업이 성공했을 때 호출하는 함수
//reject -> 비동기작업이 실패했을 때 호출하는 함수

function getData() {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = { name: "이동윤" }; //서버에서 받아온 데이터
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

console.log(promise); //-> pending 상태, result : undefined 로 나옴 -> 서버요청 전에 실행되었기 때문

//질문
// console.log(promise);
// const promise = new Promise((resolve, reject) => {
//   resolve();
// });
//이렇게 하면 에러뜨는데 왜?
//getData() 안에 있어서..?

setTimeout(() => {
  console.log(promise);
}, 3000);
//-> fulfilled 상태, result : undefined 로 나옴

const promise = getData();
//promise.   then/catch/finally

//promise.then => then은 promise 가 이행(fulfilled) 되었을 때(즉, resolve 다음) 호출되는 콜백함수
promise
  .then((data) => {               //promise.then => then은 promise 가 이행(fulfilled)되었을 때(resolve 다음) 호출되는 콜백함수
    //결과값(data)를 매개변수로 받아옴    
    console.log(data); //-> resolve 안ㅇ에 넣어준 data -> 즉, then 은 resolve 후 실행됨
    //여기서 data 는 넣어준 {name: "이동윤"}
    const name = data.name;
    console.log(`이름은 ${name}입니다`);
  })
  .catch((error) => {                  //promise.catch => catch 는 reject 되었을 때 호출되는 콜백함수
    console.log(error);
    console.log("에러 처리함");
  })
  .finally(() => {                     //promise.finally => 성공/실패 상관없이 항상 호출되는 콜백함수
    console.log("마무리작업");
  });

// console.log(data);


