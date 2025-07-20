//REST 문법과 Spread 문법
const student = {
  name: "김지니",
  age: 25,
  address: "부산 해운대구",
  phone: "010-1234-1234",
};

const { name, address } = student;
console.log(name, address);

//REST 문법
//나머지 속성들을 새로운 객체 또는 배열로 묶을 때 사용

const { age, phone, ...a } = student;
console.log(age, phone, a);

const numbers = [1, 2, 3, 4];
const [n1, n2, ...ns] = numbers;
//n1 = 1 , n2 = 2 이고 3, 4 는 할당 안함 -> ns 배열에 들어감
console.log(n1, n2, ns);

//Spread 문법
//기존 객체의 모든 속성을 새로운 객체에 복사하거나
//새로운 속성을 추가할 때 사용
console.log("--Spread문법--");
console.log("--객체--");
const newStudent = {
  ...student, // student 객체에 있던 모든 속성을 여기에 복사
  gender: "남", // gender 라는 새로운 속성 추가
};
console.log(newStudent);

//student 의 속성은 그대로에 gender 추가

console.log("--배열--");
const newNumbers = [...numbers, 5, 6];
console.log(newNumbers);

console.log("배열에 spread 문법 이용해서 요소 추가");
let names = [];

function addName(name) {
  names = [...names, name]; //원래 있던 names 요소 복사
}

addName("이동윤");
addName("삼동윤");
console.log(names);

console.log("배열에 spread 문법 이용해서 요소 추가");
let obj = {
  data1: "data1",
  data2: "data2",
};

console.log("객체에 spread 문법 이용해서 속성 추가");
function addProps(props) {
  obj = {
    ...obj,
    ...props, //props 는 객체 형태일것이기 때문(키-값 형태의 속성이 들어가야하기 때문)
  };
}

addProps({ data3: "data3", data4: "data4" });
console.log(obj);

//score 변수에 임의의 숫자를 할당
//조건에 따라서 등급을 부여
//90점 이상이면 A,
//80점 ... B,
//70점 ...C
//나머지 F

const score = 88;
let grade;
if (score >= 90) {
  grade = "A";
} else if (score >= 80) {
  grade = "B";
} else if (score >= 80) {
  grade = "C";
} else {
  grade = "F";
}

console.log(grade);

//for 문을 이용해서 1부터 20까지 숫자 중 짝수만 출력

for (let i = 1; i <= 20; i++) {
  // const num = i
  if (i % 2 == 0) {
    console.log(i);
  }
}

//1. title, author, publisherYear 속성을 포함하는 book 객체 생성
// 해리포터, J.K 롤링, 1997
//2. book 객체의 title과 author 속성 값을 출력 (점 표기법, 대괄호 표기법)

//3. book 객체에 getAge() 라는 메소드 추가
//4. 현재 연도(new Date().getFullYear()) 에서 publisherYear 를 뺀 값을 리턴

//5. book 객체에 새로운 속성 genre 를 추가하고 값을 할당 ("판타지")
//6. book 객체의 publisherYear 를 2000으로 수정

console.log("--문제풀이--");
const book = {
  title: "해리포터",
  author: "J.K롤링",
  publisherYear: 1997,
};

console.log(book.title);
console.log(book.author);

console.log(book["title"]);
console.log(book["author"]);

const book2 = {
  ...book,
  genre: "fantasy",
};

console.log(book2);

book.getAge = function () {
  const year = new Date().getFullYear() - this.publisherYear;
};
console.log("책 나이" + book.getAge());

// book.getAge = () => {
//     const currentYear = new Date().getFullYear() - this.publisherYear;
//     return currentYear - book.publisherYear;
// }

console.log("책 나이" + book.getAge());

book.genre = "판타지";
book.publisherYear = 2000;
console.log("수정된 연도: ", book.publisherYear);

const products = [
  { id: 1, name: "노트북", price: 1200000, category: "전자제품" },
  { id: 2, name: "티셔츠", price: 25000, category: "의류" },
  { id: 3, name: "모니터", price: 300000, category: "전자제품" },
  { id: 4, name: "청바지", price: 50000, category: "의류" },
  { id: 5, name: "마우스", price: 15000, category: "전자제품" },
];

//1. 50000원 이상인 제품만 필터링해서 expensiveProducts 배열에 넣고 출력
//2. products배열에서 각 제품의 이름과 가격만 포함하는 productNamesAndPrices배열 만들기
// [{name: "노트북", price: 1200000}, {}...]
//3. products배열에서 category가 전자제품인 제품만 선택해서 
// 각 제품의 이름과 가격을
//10%할인한 discountProducts배열을 만드세요

// let expensiveProducts = [];
// expensiveProducts = products.filter((products.price) => products.price >= 50000)
const expensiveProducts = products.filter((product) => products.price >= 50000);
console.log(expensiveProducts);

console.log("--2. 새로운 객체--");
const productNamesAndPrices = products.map((product) => ({
  name: product.name,
  price: product.price,
}));

console.log(productNamesAndPrices);

//코드블럭에 중괄호를 쓴 것 - 많이 하는 실수
// const productNamesAndPrices2 = products.map((product) => {
//   name: product.name,
//   price: product.price,
// });




console.log("--3. 할인된 가격--");
const discountProducts = products.filter((product) => product.category === "전자제품"
).map((product) => ({
    name: product.name,
    price: product.price * 0.9,
    // price : products.discount = function () {
    //     products.price * 0.9
    // }
}));

//실수
// const discountProducts = products.filter((product) => product.category === "전자제품"
// ).map((product) => {
//     name: product.name,
//     price: product.price * 0.9,
//     // price : products.discount = function () {
//     //     products.price * 0.9
//     // }
// });

console.log(discountProducts);

//=================================================
const baseConfig = {
  theme: "dark",
  fontSize: "16px",
  language: "ko",
};

// newConfig를 만드세요.
// theme는 "light"로 변경하고,
// padding: "20px" 속성을 새로 추가하세요.

// 객체 Spread 문법을 사용하여 newConfig 생성

console.log("=================================================")
baseConfig.theme = "light";
const newConfig = {
  ...baseConfig,
  padding: "20px",
}
console.log(newConfig);
//==================================================
console.log("----배열 합치기----")
const arr1 = [1, 2, 3];
const arr2 = [4, 5];
// 배열 Spread 문법을 사용하여 배열 합치기
const newArr = [...arr1, ...arr2];
console.log(newArr);

