// input 요소 가져오기
// 버튼 함수
// ul list 에 넣어야함

const todoInput = document.querySelector("#todoInput");
const addTodoBtn = document.querySelector("#addTodoBtn");
const todoList = document.querySelector("#todoList");

//todo 를 담을 리스트
let todos = [];
let nextTodoId = 1;

//버튼 클릭되었을 때 함수
function addTodo() {
    console.log("추가버튼 클릭됨");
    const todoText = todoInput.value.trim()   //입력된 텍스트 가져와서 양쪽 공백제거
    
    //유효성 검사 - 텍스트 있는지 
    if (todoText === "") {
        alert("할 일을 입력해주세요!")
        return;              //return 이면 addtodo 함수 끝
    }

    //todo 의 형태
    const newTodo = {
        id: nextTodoId++, 
        text: todoText, 
        isEditing: false,  //수정 중인지 여부를 나타내는 플래그 (수정 버튼)
    }

    todos.push(newTodo);  //배열에 입력한 할 일 추가
    console.log(todos);
    todoInput.value=""  //입력값 초기화
    todoInput.focus;    //추가하면 바로 입력할 수 있도록 포커싱


}



//eventlistener (클릭되었을 때 이벤트 이름, 이벤트가 일어날 때 실행될 함수)
//함수 호출 - 바로 되는 것(웹페이지 로드 시 바로)
//함수 이름만 - 이벤트 일어날 때 함수를 실행해라는 의미
addTodoBtn.addEventListener("click", addTodo);

//입력하고 엔터치면 알아서 추가되도록
//이때 익명함수에 event 는 키보드의 어떤 키를 눌렀는지 정보 또한 가져옴
todoInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        addTodoBtn.click();          //이벤트리스너인 click 이 이를 ㄱ감지해 addTodo 함수 실행
    }
})