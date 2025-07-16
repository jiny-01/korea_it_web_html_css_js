//객체
const student = {
  name: "이동윤",
  age: 27,
};

console.log(student);
console.log(student.name);
console.log(student.age);
//인덱스처럼 접근 가능
console.log(student["name"]);
console.log(student["age"]);

const a = "name";
const b = "age";
console.log(student[a]);
console.log(student[b]);

// 값 수정 가능
student[a] = "삼동윤";
console.log(student);
student.name = "사동윤";
console.log(student);

//객체에 함수를 추가하는 방법
console.log("---객체에 함수 추가---");
student.printName = () => console.log("이름: ", student.name); //함수명이 printName 은 아님
student.printName();

const loginButton = {
  text: "로그인",
  value: "text",
  onclick: () => {
    console.log(loginButton.text); //함수 자체는 익명함수
  },
};

loginButton.onclick();
loginButton.onclick = () => {
  console.log("로그인 버튼을 클릭하였습니다.");
};
loginButton.onclick();
console.log(typeof loginButton); //-> object 출력 : 객체 타입

//Object 의 기능
/**
 * Objects.keys(), Object.values(), Object.entries()
 */
const loginButtonKeys = Object.keys(loginButton);
console.log(loginButtonKeys);

//키 추출
for (let i = 0; i < loginButtonKeys.length; i++) {
  const keyName = loginButtonKeys[i];
  console.log(loginButton[keyName]); // -> text, value, onclick 출력
}

//값 추출
const loginButtonValues = Object.values(loginButton);
console.log(loginButtonValues);

for (let i = 0; i < loginButtonValues.length; i++) {
  console.log(loginButtonValues[i]);
}

const loginButtonEntries = Object.entries(loginButton);
console.log(loginButtonEntries);
//entries 하면 키-값 쌍으로 나옴 / 배열 안에 배열 형태 순회
for (let i = 0; i < loginButtonEntries.length; i++) {
  const entry = loginButtonEntries[i]; //한 쌍 출력
  const key = entry[0];
  const value = entry[1];
  console.log(entry, key, value);
}

for (let entry of loginButtonEntries) {
  console.log(entry);
  const key = entry[0];
  const value = entry[1];
  console.log(entry, key, value);
  
}
