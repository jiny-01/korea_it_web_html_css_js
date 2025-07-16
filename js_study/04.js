//배열
const arr1 = []; //빈 배열
const arr2 = new Array(); //빈 배열- 잘 안씀

//새로운 요소 추가
//push -> 배열의 끝에 요소를 추가
arr1.push(10);
arr1.push(20);
arr1.push(30);
arr1.push(40);
console.log(arr1);

arr2.push(10);
arr2.push(20);
arr2.push(30);
arr2.push(40);
console.log(arr2);

console.log(arr1 === arr2); // -> false
//배열과 객체의 참조 비교 => 자바스크립트에서 객체(배열포함)는 참조타입
// === (일치연산자)는 객체의 경우 메모리 주소(참조) 가 같은지 비교 -> 자바에선 == (메모리주소) / equals 의 차이
//arr1 과 arr2 는 내용이 같더라도 서로 다른 메모리 공간에 있는 별개의 객체이므로 false

console.log(arr1 == arr2); //이건 왜 false??
//둘은 값이 같아도 서로 다른 참조값을 가지고 있기 때문

const obj1 = { key1: "value1", key2: "value2" };
const obj2 = { key1: "value1", key2: "value2" };
console.log(obj1 === obj2); //메모리 주소(참조) 비교- 따로 만들었기 때문에 다름 -> false

//JSON (JavaScript Object Notation)
//자바스크립트 객체/배열과 JSON 문자열 간의 변환
//JSON.stringify() => 자바 스크립트 객체 또는 배열을 JSON 형식의 문자열로 변환
//Json.parse() => JSON 문자열을 자바스크립트 객체 또는 배열을 변환
// stringify <-> parse
//
console.log("--배열과 JSON--")
const json1 = JSON.stringify(arr1);
const json2 = JSON.stringify(arr2);
console.log(json1);
console.log(json2);
console.log(typeof json2);
console.log(json1 === json2);
//타입이 문자열이므로 타입, 값 비교해서 -> true

const json3 = JSON.stringify(obj1);
const json4 = JSON.stringify(obj2);
console.log(json3);
console.log(json4);
console.log(json3 === json4);  // -> true

//배열의 다양한 기본 내장함수
console.log("--배열의 기본 함수--")
const names = ["이동윤", "삼동윤", "사동윤"];
names.push("오동윤")
console.log(names);
// 상수인데 추가?
// const 가 재할당을 금지하는 것일 뿐, 참조하는 객체(즉 배열)의 내용 변경까지 막는 것은 아님
// names = ["육동윤"] 이건 재할당이므로 금지됨


//요소 제거 : pop() => 배열의 마지막 요소를 제거하고 제거된 요소를 반환
console.log(names.pop());

//요소 수정/삽입/제거 : splice(삽입될 인덱스, 제거할 개수, 추가할 요소...)
names.splice(1, 0, "육동윤");
console.log(names);

//요소 찾기 : find()
const findFx = (n) => n === "육동윤";
const foundName = names.find(findFx);
//이걸 만족하는 첫번째 요소 반환
//자바에서의 stream.filter -> 조건을 만족하는 것 반환
console.log(foundName);

