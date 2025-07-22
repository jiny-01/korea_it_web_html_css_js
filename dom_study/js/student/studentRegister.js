//3. register 함수 선언

//5. 추가하는 함수 만들기
let studentInputValue = {
  id: 0,
  name: "",
  age: "",
  address: "",
};

//6. handleRegisterOnkeyup 함수는 registerinput 의 onkeyup 의 함수로 전달함
function handleRegisterOnkeyup(e) {
  //이벤트(e) 발생시킴
  studentInputValue = {
    ...studentInputValue, //spread 문법으로 속성복사
    [e.target.name]: e.target.value,
    //해당요소안의 name 속성을 키로(name, age, address)
    //e.target.value : 각각 요소의 입력값
  };
  console.log("key up:", e.target.name, e.target.value)
}

//7. onclick 시 실행될 함수 (화살표함수)
const handleRegisterOnClick = (e) => {
  let newId = 1;
  if (studentList.length > 0) {
    const lastStudent = studentList[studentList.length - 1]; //배열의 마지막 거
    //마지막거 가져와서 거기에 +1 로 추가하기 위함
    newId = lastStudent.id + 1;
  }
  //새로 추가할 정보(아이디만 추가해주면 됨)
  const newStudent = {
    ...studentInputValue,
    id: studentList.length + 1,
  };

  studentList = [...studentList, newStudent];
  console.log(newStudent);
   loadStudentList();
};

//3. register 함수 선언
function studentRegister() {
  return `
    <div>
        ${studentRegisterInput({
          type: "text",
          name: "name",
          onkeyup: "handleRegisterOnkeyup", //registerinput 에 ${onkeyup}(event) 했으므로 event 가 매개변수
        })}
        ${studentRegisterInput({
          type: "text",
          name: "age",
          onkeyup: "handleRegisterOnkeyup",
        })}
        ${studentRegisterInput({
          type: "text",
          name: "address",
          onkeyup: "handleRegisterOnkeyup",
        })}
        <div>
        <button onclick="handleRegisterOnClick()">등록</button>     
        </div>
    </div>
    `;
}

//-> app.js 에서 불러서 렌더링
