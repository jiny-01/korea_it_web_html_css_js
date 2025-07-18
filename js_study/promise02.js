//promise chaining
//
function getData() {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      //const data = null;
      const data = { name: "이동윤" }; //서버에서 받아온 데이터
      if (data) {
        //데이터 있으면 -> resolve() 함수 호출
        console.log("서버 요청 성공");
        resolve(data); //resolve 의 인자로는 비동기작업의 결과물을 넣어줌 ( 즉. { name: "이동윤" })
      } else {
        //데이터 없으면
        reject(new Error("오류가 발생함")); //reject 의 인자로는 에러 객체 넣어줌
      }
    }, 2000);
  });
  return promise;
}

const promise = getData(); //getData 의 결과를 promise 에 넣음
// promise.then().then().then()....
//promise chaining 을 사용하게 되면 여러가지 비동기 작업을
//연속적으로 수행할 수 있다.

// promise
//   .then((data) => {
//     console.log(data);
//     return getData();
//   })
//   .then(() => {
//     console.log(data);
//   });

// promise
//   .then((data) => getData())
//   .then((data) => getData())
//   .then((data) => getData())
//   .then((data) => console.log(data));

promise
  .then((data) => {
    console.log(data);
    return "hello";     //값을 리턴하게 되면 promise 의 resolve 에 해당 값이 전달됨
  })
  .then((data) => {console.log(data)});
