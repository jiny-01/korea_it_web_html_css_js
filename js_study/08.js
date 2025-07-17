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
}
console.log("책 나이" + book.getAge());

book.publisherYear = 2000;
console.log("수정된 연도: ", book.publisherYear)
