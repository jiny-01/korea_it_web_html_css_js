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

//--------------------------------------------------------------------------------------------------
//callback ==> promise

//로그인
function login(username) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (username) {
                resolve(username);
            } else {
                reject(new Error("사용자 이름 없음"))
            }
        }, 2000)
    })
}

//장바구니 
function addToCart(product) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (product) {
                resolve(product);
            } else {
                reject(new Error("상품이 없음"))
            }
        }, 1000)
    })
}

//
//결제하기  
function checkOut(cardNumber, product) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (cardNumber && product) {
                resolve(cardNumber, product);
            } else {
                reject(new Error("잘못된 요청"))
            }
        }, 1000)
    })
}

//메소드 체이닝
login("이동윤")
  .then((username) => {
    console.log(`${username} 님이 로그인했습니다. `)
    return addToCart("감자");
  })
  .then((product) => {
    console.log(`${product} 가 장바구니에 추가되었습니다. `)
    return checkOut("1234-5678-9012-3456", product);
  })
  .then((product) => {
    console.log(`${product} 에 대한 결제 완료`); // "결제 완료"
  })
  .catch((error) => {
    console.log("에러 발생:", error);
  });
