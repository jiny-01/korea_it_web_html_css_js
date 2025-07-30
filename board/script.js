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

//로그인 및 회원가입 폼
//signup 폼 가져오기
const signupForm = document.querySelector("#signup-form");
const signinForm = document.querySelector("#signin-form");

//게시판 목록
const boardList = document.querySelector("#board-list");

//게시판 목록 리스트
let boards = [];

//게시판 게시물 추가
const writeForm = document.querySelector("#write-form");

//AccessToken 디코딩
function getPayload() {
  const token = localStorage.getItem("AccessToken");
  if (!token) {
    //토큰 없을 때
    alert("토큰 없음 로그인 필요");
    changepages(pageSignin);
    return null;
  }

  //토큰 있을 경우
  try {
    // 토큰을 . 기준으로 분리해서 payload 를 가져온다
    const payloadBase64 = token.split(".")[1];
    const decodedPayload = atob(payloadBase64);
    //디코딩된 JSON 문자열을 자바스크립트 객체로 변환
    const payload = JSON.parse(decodedPayload);

    return payload;
  } catch (error) {
    console.log(error);
    alert("토큰 오류 발생");
  }
}

//상단메뉴 버튼 4개 각각 클릭할 때 실행될 함수 - 페이지 전환 함수
function changepages(pageElement) {
  const pages = document.querySelectorAll(".page"); //페이지 다 들고옴
  pages.forEach((page) => {
    //일단 전부 active 제거
    page.classList.remove("active");
  });
  pageElement.classList.add("active"); //선택된 거에만 active
}

//게시판 조회 함수
//게시판 목록 조회 및 표시함수
// 게시판 목록 불렀을 때, 로그인 버튼 눌렀을 때 실행
//조회해서 ul 안에 li??
async function renderboard() {
  //요청 보내기 전에 AccessToken 빼오기
  //만약에 로컬 스토리지에 AccessToken 이 없으면 로그인 페이지로 전환
  //요청 보내기
  //fetch 에서 headers 안에 Authorizaiton: `Bearer ${AccessToken}`

  //요청해서 받아온 게시물들 foreach => ul 안에 li로 넣기
  //li 는 제목만 표시되도록

  const token = localStorage.getItem("AccessToken"); //토큰 빼오기

  //토큰 유무따라
  if (!token) {
    //토큰 없을 때
    alert("토큰이 존재하지 않습니다.");
    changepages(pageSignin);
    return;
  }

  //요청 보내기
  try {
    const response = await fetch(`${API_BASE_URL}/board/list`, {
      method: "GET", //요청 메소드 - 조회 => GET
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const responseData = await response.json();
    // 응답 구조: { status: "success", message: "...", data: [...] }

    //ul 요소 선택
    // const boards = responseData.data;

    if (responseData.status !== "success") {
      alert(responseData.message); // 실패 메시지
      //게시물 작성 페이지로 전환
      return;
    } else {
      //정상적으로 수행될 때
      //boards: 게시물 목록 리스트 (위에서 빈 배열로 정의)
      boards = responseData.data; //리스트에 가져온 게시물 추가
      boardList.innerHTML = "";

      boards.forEach((board) => {
        boardList.innerHTML += `<li>${board.title}</li>`;
      });
      changepages(pageBoard);
    }
  } catch (error) {
    //요청 실패 시
    console.log("게시물을 불러오는 데 실패했습니다" + error);
    alert("게시물 조회에 오류가 발생했습니다.");
  }

  // console.log("게시물 목록:", boardList);
}

//=====================게시물 추가 함수==============================
async function addBoard(event) {
  event.preventDefault(); //이벤트 막기
  const userInfo = await getPayload();
  console.log(userInfo);
}

//로그인 요청 함수
async function signinHandler(event) {
  event.preventDefault();

  //가져오기
  const usernameInput = document.querySelector("#signin-id");
  const passwordInput = document.querySelector("#signin-password");

  //서버로 요청 보낼 데이터 형식
  const signinData = {
    username: usernameInput.value,
    password: passwordInput.value,
  };

  if (!signinData.username || !signinData.password) {
    alert("아이디 또는 비밀번호를 모두 입력해주세요.");
    return;
  }

  try {
    //요청 보내기
    const response = await fetch(`${API_BASE_URL}/auth/signin`, {
      method: "POST",
      //cors 에러 뜰 때 header 추가해야함
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signinData), //자바 스크립트 객체를 json 문자열로 변환
    });

    const responseData = await response.json();
    //responseData 안에 요청 응답결과 (status, message, data)

    if (responseData.status !== "success") {
      alert(responseData.message); //실패이유
    } else {
      alert(responseData.message); //성공 메시지 출력
      localStorage.setItem("AccessToken", responseData.data); //토큰 로컬스토리지에 저장
      signinForm.reset(); //폼 초기화

      //===========================게시판 목록으로 전환하기=====================================================================
      //========================================================================================================
      await renderboard(); //ul안에 li 넣기 - 렌더링
      //페이지 바꾸기전 렌더링 먼저 -> await 사용
      changepages(pageBoard);
    }
  } catch (error) {
    //요청 자체에 실패한 경우
    console.log("서버와 통신 중 오류가 발생했습니다: " + error);
    alert("로그인 요청에 오류가 발생했습니다.");
  }
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
      body: JSON.stringify(signupData), //자바 스크립트 객체를 json 문자열로 변환
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

navBoard.addEventListener(
  "click",
  renderboard
  // changepages(pageBoard);    위에 render 함수에 포함되어있음
);

navWrite.addEventListener("click", () => {
  console.log("글쓰기 클릭됨");
  changepages(pageWrite);
});

signupForm.addEventListener("submit", signupHandler);
//jiny01, 1234 , allie7019@naver.com

signinForm.addEventListener("submit", signinHandler);

writeForm.addEventListener("submit", addBoard);
