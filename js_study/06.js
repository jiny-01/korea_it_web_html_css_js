// 단축 평가 논리 연산
// &&  ,  ||
const name = "이동윤";

console.log(!!name && !!"삼동윤"); // 둘 다 true 이므로 -> true
//&& (AND) 연산
//앞의 값이 true 일 때 뒤의 값을 리턴, false 일 땐 false
//앞의 조건이 true 여야만 뒤에를 확인
//즉, true true 면 뒤에 것 -> true 반환
//true false 면 뒤에 거 -> false
// false true -> false     false false -> false
console.log(false && 10);  // -> false
console.log(true && 10);  // -> 10
console.log(!!name && 0);  // -> 0

// \\ (OR) 연산
// 앞의 값이 false 일 때 뒤의 값 리턴
// true 일 때 true 리턴
console.log(false || 10);  // -> 10
console.log(true || 10);  // -> true

//nullish 병합 연산자 => ??
// 앞의 값이 null 또는 undefined 가 아니면 앞의 값, 그 외는 뒤의 값(null, undefined 이면)
console.log(null ?? 100);  //null이니까 뒤에 것 -> 100;
console.log(undefined ?? 100);  // -> 100
console.log(20 ?? 100); // 20
console.log(0 ?? 100);  // 0
console.log("" ?? 100); //빈 문자열
