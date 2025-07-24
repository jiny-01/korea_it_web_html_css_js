// input 요소 가져오기
// 버튼 함수
// ul list 에 넣어야함

const todoInput = document.querySelector("#todoInput");
const addTodoBtn = document.querySelector("#addTodoBtn");
const todoList = document.querySelector("#todoList");

//todo 를 담을 리스트
let todos = [];
let nextTodoId = 1;

//ul 에 li 로 넣는 함수
function renderTodo() {
  todoList.innerHTML = "";

  todos.forEach((todo) => {
    const listItem = document.createElement("li"); //li 태그를 넣어줌
    listItem.dataset.id = todo.id;

    //요소에 추가적인 사용자 정의 데이터 저장
    //요소에 데이터셋을 적용(아이디 부여) - 수정, 삭제할 요소 찾기 위함
    //li 쪽에 아이디를 심어놓음
    //브라우저는 이 속성들을 특별히 해석하지 않는다.

    if (todo.isEditing) {
      listItem.classList.add("editing"); //클래스를 따로 부여

      //수정할 때
      listItem.innerHTML = `
                
                    <input type="text" class="edit-input" value=${todo.text}>
                    <div class="todo-actions">
                        <button class="save-btn">저장</button>
                        <button class="cancel-btn">취소</button>
                    </div>
                
            `;
    } else {
      listItem.innerHTML = `
                
                    <span class="todo-text">${todo.text}</span>
                    <div class="todo-actions">
                        <button class="edit-btn">수정</button>
                        <button class="delete-btn">삭제</button>
                    </div>
                
            `;
    }
    todoList.appendChild(listItem); //요소의 변수를 넣음 -> innerHTML 비슷, => ul의 자식으로 들어감
  });
}

//버튼 클릭되었을 때 함수
function addTodo() {
  console.log("추가버튼 클릭됨");
  const todoText = todoInput.value.trim(); //입력된 텍스트 가져와서 양쪽 공백제거

  //유효성 검사 - 텍스트 있는지
  if (todoText === "") {
    alert("할 일을 입력해주세요!");
    return; //return 이면 addtodo 함수 끝
  }

  //todo 의 형태
  const newTodo = {
    id: nextTodoId++,
    text: todoText,
    isEditing: false, //수정 중인지 여부를 나타내는 플래그 (수정 버튼)
  };

  todos.push(newTodo); //배열에 입력한 할 일 추가
  console.log(todos);
  todoInput.value = ""; //입력값 초기화
  todoInput.focus; //추가하면 바로 입력할 수 있도록 포커싱
  renderTodo();
}

//삭제버튼 클릭 시 실행될 함수
function deleteTodo(id) {
  if (!confirm("정말 삭제하시겠습니까?")) {
    // 삭제안함 -> 취소 일때
    return;
  } else {
    todos = todos.filter((todo) => todo.id !== id); //같지 않은 것만 고름 (같은 건 삭제)
    renderTodo();
  }
}

function editTodo(id) {
  todos = todos.map((todo) =>
    todo.id === id
      ? { ...todo, isEditing: true }
      : { ...todo, isEditing: false }
  );
  renderTodo();

  const editInput = todoList.querySelector(`li[data-id="${id}"] .edit-input`);
  if (editInput) {
    editInput.focus(); //커서 포커스
    editInput.select(); //드래그 효과
  }

}

function saveTodo(id, newText) {
  if (newText.trim() === "") {
    alert("수정할 내용을 입력해주세요.");
    return;
  }
  todos = todos.map((todo) =>
    todo.id === id ? { ...todo, text: newText.trim(), isEditing: false } : todo
  );
  renderTodo();

  
}

//취소 버튼 클릭 시 실행될 함수

function cancelTodo(id) {
  todos = todos.map((todo) =>
    todo.id === id ? { ...todo, isEditing: false } : todo
  );
  renderTodo();
}


//eventlistener (클릭되었을 때 이벤트 이름, 이벤트가 일어날 때 실행될 함수)
//함수 호출 - 바로 되는 것(웹페이지 로드 시 바로)
//함수 이름만 - 이벤트 일어날 때 함수를 실행해라는 의미
addTodoBtn.addEventListener("click", addTodo);

//입력하고 엔터치면 알아서 추가되도록
//이때 익명함수에 event 는 키보드의 어떤 키를 눌렀는지 정보 또한 가져옴
todoInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    addTodoBtn.click(); //이벤트리스너인 click 이 이를 ㄱ감지해 addTodo 함수 실행
  }
});

//버튼 한 번에 묶어서 감지 - 4개 버튼(수정. 삭제, 저장. 취소)
todoList.addEventListener("click", (event) => {
  const target = event.target; //클릭된 요소
  const listItem = target.closest("li[data-id]");
  //클릭된 요소의 가장 가까운 부모 li(data에 id 속성을 가진)

  if (!listItem) return; //li 요소를 찾지 못했다면 함수 종료

  const todoId = parseInt(listItem.dataset.id); //데이터셋의 아이디를 todoId 로 가져옴

  if (target.classList.contains("delete-btn")) {
    deleteTodo(todoId);
  } else if (target.classList.contains("edit-btn")) {
    editTodo(todoId);
  } else if (target.classList.contains("save-btn")) {
    const editInput = listItem.querySelector(".edit-input");
    saveTodo(todoId, editInput.value);
  } else if (target.classList.contains("cancel-btn")) {
    cancelTodo(todoId);
  }
});
