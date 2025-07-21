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


function purchase() {
    const promise = new Promise((resolve, reject) => 
    setTimeout(() => {
        const username = "이동윤";
        if (username) {
            console.log("로그인 성공");
            resolve(username);
        } else {
            reject(new Error("오류발생"));
        }
    }, 2000)
)};




//promise chaining -> promise 자체를 리턴하기 때문에 가능
// purchase
//     .then((username) => {console.log(username)})
//     .then((product) => {console.log(product)})
//     .then((product, cardNumber) => {console.log("결제 완료")});


login("이동윤")
  .then((username) => {
    return addToCart("감자");
  })
  .then((product) => {
    return checkOut("1234-5678-9012-3456", product);
  })
  .then((result) => {
    console.log(result); // "결제 완료"
  })
  .catch((error) => {
    console.log("에러 발생:", err);
  });