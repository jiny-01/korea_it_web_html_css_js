//10. 삭제 버튼 클릭되었을 때 지우는 함수 handleDeleteButtonOnclick()
function handleDeleteButtonOnclick(studentId) {
    //confirm : y/n 선택 가능
    if (!confirm("삭제하시겠습니까?")) return;   //예를 누르면 true 지만 false 가 되서 그냥 빠져나옴
    //삭제 할 때
    studentList = studentList.filter(() => student.id !== studentId)  //같지 않으면 삭제할 것이므로 같은 애들만 가져옴 - 삭제한 거나 같음

    loadStudentList();   //빼고 다시 함수 호출
}



//9. student list 로 만들어서 가져오기
function loadStudentList() {
  const studentLi = studentList
    .map((student) => {
      const text = `${student.id}. ${student.name}(${student.age} - ${student.address})`;
      //얘를 li에 집어넣어서 반환
      return `
        <li>
            ${text}
            <button onclick="handleDeleteButtonOnclick()">삭제</button>
        </li>
        `;
    })
    .join("");

  //이걸 ul에 넣어줌 - app 에서 확인가능 클래스는 student-list

  const studentListUl = document.querySelector(".student-list");

  studentListUl.innerHTML = studentLi;
}
