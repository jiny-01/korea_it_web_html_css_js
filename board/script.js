//백엔드 서버 주소 연결
const API_BASE_URL = "http://localhost:8080";

//요소들 가져오기
const navSignin = document.querySelector("#nav-signin");
const navSignup = document.querySelector("#nav-signup");
const navBoard = document.querySelector("#nav-board");
const navWrite = document.querySelector("#nav-write");

//페이지 요소 가져오기
const pageSignin = document.querySelector("#page-signin");
const pageSignup = document.querySelector("#page-signup");
const pageBoard = document.querySelector("#page-board");
const pageWrite = document.querySelector("#page-write");

//signup 폼 가져오기
const signupForm = document.querySelector("#signup-form");

//상단메뉴 버튼 4개 각각 클릭할 때 실행될 함수 - 페이지 전환 함수
function changepages(pageElement) {
  const pages = document.querySelectorAll(".page"); //페이지 다 들고옴
  pages.forEach((page) => {
    //일단 전부 active 제거
    pageElement.classList.remove("active");
  });
  pageElement.classList.add("active"); //선택된 거에만 active
}

//Backend 연결
//회원가입 요청함수
async function signupHandler(event) {
  event.preventDefault(); //폼의 기본 동작을 막기 위해

  //요청 보내기 전 input 에 들어간 값 가져오기
  const usernameInput = document.querySelector("#signup-id");
  const passwordInput = document.querySelector("#signup-password");
  const emailInput = document.querySelector("#signup-email");

  //요청 보낼 때 데이터의 양식
  //서버로 보낼 회원가입 데이터를 객체로 만듦
  const signupData = {
    //백엔드 서버에서 signupreqdto 에 들어있는 데이터 그대로 가져옴
    username: usernameInput.value,
    password: passwordInput.value,
    email: emailInput.value,
  };

  //입력값 비어있는지 확인
  if (!signupData.username || !signupData.password || !signupData.email) {
    alert("모든 항목을 입력해주세요.");
    return;
  }

  try {
    //요청 보내기-- 성공적일 때 try 문 실행
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: "POST", //요청 메소드 방식 - POST
      //cors 에러 뜰 때 header 추가해야함
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signupData),    //자바 스크립트 객체를 json 문자열로 변환
    });

    const responseData = await response.json(); //요청 응답결과를 여기 담음
    //responseData 안에 요청 응답결과 (status, message, data)

    if (responseData.status !== "success") {
      alert(responseData.message); //실패 시 메시지
    } else {
      alert(responseData.message); //성공 시 메시지
      signupForm.reset(); //폼의 입력내용 초기화
      changepages(pageSignin);
    }
  } catch (error) {
    //요청 자체에 실패한 경우
    console.log("회원가입 요청 오류 발생: " + error);
    alert("회원가입 요청에 오류가 발생했습니다.");
  }
}
//버튼 눌러졌을 때 호출 - 4개 버튼 각각
//클릭했을 때만 실행되야 하므로 익명함수로 함
navSignin.addEventListener("click", () => {
  changepages(pageSignin);
});

navSignup.addEventListener("click", () => {
  changepages(pageSignup);
});

navBoard.addEventListener("click", () => {
  changepages(pageBoard);
});

navWrite.addEventListener("click", () => {
  changepages(pageWrite);
});

signupForm.addEventListener("submit", signupHandler);
//jiny01, 1234 , allie7019@naver.com