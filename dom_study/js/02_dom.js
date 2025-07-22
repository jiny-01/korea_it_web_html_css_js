const submitButton = document.querySelector(".input-button");
//HTML에서 클래스가 input-button인 버튼 요소를 JS에서 선택

//클릭했을 떄 실행될 함수 재할당
submitButton.onclick = () => {
  const input = document.querySelector(".inputs"); //사용자가 입력한 값 확인
  const dataList = document.querySelector(".data-list");

  if (input.value === "") {
    alert("빈칸이야");  //알림창이 뜸
    return;
  }

  //현재 있는 거에 추가
  dataList.innerHTML += `<li>${input.value}</li>`;

  input.value = "";   //입력창 초기화
};

console.log(submitButton); // 콘솔에 찍어봐서 null이면 선택 실패




