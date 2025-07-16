//변수 선언 => let, const
//let 은 값을 재할당할 수 있는 변수를 선언할 때 사용
let name = "김지니"; //name 이라는 변수에 값 담음
console.log(name); //console.log() -> 출력
console.log("hello world");
name = "홍길동";
console.log(name);

//const는 한번 할당하면 값을 변경할 수 없는 상수 선언할 때 사용
const age = 25;
console.log(age);
// age = 26;
//에러 발생 -> 재할당 불가하기 때문

//연산자
//== (동등연산자) : 값만 비교, 필요한 경우 알아서 암시적 타입 변환
let data1 = 10;
let data2 = "10";
let result1 = data1 == data2; //타입 무관 -> true
console.log(result1);

// === (일치연산자) : 값과 타입을 모두 엄격하게 비교
let result2 = data1 === data2; //타입 상관있음 -> false

//typeof 연산자 : 변수의 데이터 타입을 확인
console.log(typeof data1, typeof data2);

//문자열 연결과 숫자 출력의 차이
console.log("1" + "2"); // 12
console.log(1, 2); //1 2

//not 연산자
console.log(!1); //1-> true  이므로 not 이니 false
console.log(!0); //0-> false 이므로 not이니 true
console.log(!"a"); //문자열 있으면 true 지만 not -> false
console.log(!""); //빈 문자열(false) 의 반대 -> true
console.log(!null);
console.log(!!null); //not 에 not 이므로 그냥 원래 것
// !! => 값을 명시적으로 boolean 타입으로 변환하는 일반적인 방법

console.log("---");
console.log("".length > 0); //빈 문자열의 길이 > 0 이냐? -> false
console.log(!!"" === false); // 빈 문자열 false

let data = {
  name: "이동윤",
  age: 27,
};
//객체 형태

console.log("---조건문---");
if (!data) {
  //data가 없으면
  console.log("사용자 정보가 없습니다");
} else if (data.name === "삼동윤") {
  console.log("사용자 이름이 일치합니다.");
} else if (data.age === 27) {
  console.log("사용자 이름은 일치하지 않지만 나이는 일치함 - 결론");
} else {
  console.log("사용자가 일치하지 않습니다.");
}

console.log("---반복문---");
for (let i = 0; i < 10; i++) {
    console.log(i);
}
