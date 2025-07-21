/**
 * async(비동기 함수 정의 키워드)
 * await(비동기 함수 동기 호출 키워드)
 * await 는 async 함수 내부에서만 사용 가능
 * await 은 promise 가 resolve 될 때까지 기다렸다가 그 결과를 변수에 할당
 */

const promise = new Promise((resolve) => resolve("개발자"));
async function getData() {
  return promise; //이렇게 한다고 해서 프로미스에 프로미스가 감싸진 형태는 아니다..
  //위에 정의한 promise 에 대한 결과값이 나오는 것 - 바꿔치기
}
//=> async function 안에서 return Promise라고 해도 중첩되지 않는다.

//function : 동기 함수 / async 쓰면 비동기 함수 만들어줌
// -> async 붙이면 이 함수 자체를 비동기함수 (함수 자체가 promise) 로 만듦
// async function getData() {
//   return "이동윤";
// }

// const user = getData();
// console.log(user);
// user.then((name) => console.log(name));
//브라우저에  promise 가 출력됨 - fulfilled, result : 결과
//콘솔에는 Promise { <fulfilled>: "이동윤" } 형태로 출력
// async 함수는 항상 Promise를 반환하기 때문
// 즉, getData()는 "이동윤"이 아니라 Promise<string>을 반환
//그걸 꺼내려면 then 으로 받음

console.log("============출력");
function getUserReq() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("사용자 데이터를 받아옴");
      return resolve("서버1"); //getUserReq() 의 결과물 => 서버1
    }, 2000);
  });
}

// async function getData() {
//   const result = await getUserReq(); // 보내놓고 기다림
//   const result2 = await getUserReq();
//   return "이동윤";
// }

// async function getData() {
//   const result = await getUserReq();          // getUesrReq 먼저 뜨게 하려면 await 붙여줌 - 동기처럼 처리하겠다(기다린다)
//   return result;
// }

//원래 -> 비동기함수가 끝날때까지 다음 작업 기다려주지 않음 (비동기)
//await -> 해당 비동기 작업이 완료될 때까지 다음 작업을 하지않고 기다림
//getUserReq가 끝날 때까지 기다림
//return "이동윤";  //그 다음에 실행됨

// const user = getData();
// user.then((name) => console.log(name));

//============출력
//(2초 후) 사용자 데이터를 받아옴
//이동윤

//이전의 promise 버전
// function getDataPromise() {
//   return getUserReq()
//     .then(() => {
//       return getUserReq;
//     })
//     .then(() => {
//       return "이동윤";
//     });
// }

// const user2 = getDataPromise();


console.log("===========");
function getUserReq() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("사용자 데이터를 받아옴");
      return resolve("서버1"); //getUserReq() 의 결과물 => 서버1
    }, 2000);
  });
}

async function getUser() {
    await getUserReq()
    return "이동윤"
} 

async function getTodo() {
    await getUserReq()
    return ["밥먹기", "잠자기"]
} 

async function getData() {
    const user = await getUser()
    const todo = await getTodo()
    console.log(`${user}님 ${todo}를 해야합니다.`)
}
//await 없으니까 호출만 해서 console.lot(해야합니다) 먼저 빈 값으로 출력됨
//await 넣어야 
//출력
//-> "사용자 데이터를 받아옴"
//-> "이동윤님 밥먹기,잠자기를 해야합니다.""

getData();