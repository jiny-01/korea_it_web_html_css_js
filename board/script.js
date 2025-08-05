//백엔드 서버 주소 연결
const API_BASE_URL = "http://localhost:8080";

//요소들 가져오기
const navSignin = document.querySelector("#nav-signin");
const navSignup = document.querySelector("#nav-signup");
const navLogout = document.querySelector("#nav-logout");
const navBoard = document.querySelector("#nav-board");
const navWrite = document.querySelector("#nav-write");
const changeInfo = document.querySelector("#nav-changeInfo");
const navEdit = document.querySelector("#page-edit");

console.dir(navSignin); //모든 dom 요소 확인 가능

//페이지 요소 가져오기
const pageSignin = document.querySelector("#page-signin");
const pageSignup = document.querySelector("#page-signup");
const pageBoard = document.querySelector("#page-board");
const pageWrite = document.querySelector("#page-write");
const pageDetail = document.querySelector("#page-detail");
const pagechangepw = document.querySelector("#page-changepw");
const pageUpdate = document.querySelector("#page-update");

//로그인 및 회원가입 폼
//signup 폼 가져오기
const signupForm = document.querySelector("#signup-form");
const signinForm = document.querySelector("#signin-form");

//비밀번호 변경
const changeInfoForm = document.querySelector("#changepw-form");
const userId = document.querySelector("#changepw-userid");
const oldPassword = document.querySelector("#changepw-old");
const newPassword = document.querySelector("#changepw-new");
const confirmPassword = document.querySelector("#changepw-confirm");

//게시판 목록
const boardList = document.querySelector("#board-list");

//게시판 목록 리스트
let boards = [];

//게시판 게시물 추가
const writeForm = document.querySelector("#write-form");

//게시물 상세 관련 요소 가져오기
const detailTitle = document.querySelector("#detail-title");
const detailUserId = document.querySelector("#detail-userid");
const detailContent = document.querySelector("#detail-content");
const backBtn = document.querySelector("#back-btn");
const deleteBtn = document.querySelector("#delete-btn");
const updateBtn = document.querySelector("#update-btn");
const btnBox = document.querySelector("#btn-box");

//게시물 수정 요소
const updateForm = document.querySelector("#update-form");
const updateTitleInput = document.querySelector("#update-title");
const updateContentInput = document.querySelector("#update-content");

//======================================JWT 토큰 디코딩 함수===============================
//AccessToken 디코딩- 게시물 추가 dto 에 유저id 필요하기 때문 -> jti 로 빼옴
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

//========================================페이지 전환 함수=======================================================
//상단메뉴 버튼 4개 각각 클릭할 때 실행될 함수 - 페이지 전환 함수
function changepages(pageElement) {
  const pages = document.querySelectorAll(".page"); //페이지 다 들고옴
  pages.forEach((page) => {
    //일단 전부 active 제거
    page.classList.remove("active");
  });
  console.dir(pageElement);
  pageElement.classList.add("active"); //선택된 거에만 active
}

//=========================================게시판 조회 함수=========================================
// 게시판 목록 조회 및 표시함수
// 게시판 목록 불렀을 때, 로그인 버튼 눌렀을 때 실행
// 조회해서 ul 안에 li 추가되는 로직\

// 요청 보내기 전에 AccessToken 빼오기
// 만약에 로컬 스토리지에 AccessToken 이 없으면 로그인 페이지로 전환
// 요청 보내기
// fetch 에서 headers 안에 Authorizaiton: `Bearer ${AccessToken}`

// 요청해서 받아온 게시물들 foreach => ul 안에 li로 넣기
// li 는 제목만 표시되도록
async function renderboard() {
  const token = localStorage.getItem("AccessToken"); //토큰 빼오기

  //토큰 유무 확인
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
    // ApiRespDto 응답 구조: { status: "success", message: "...", data: [...] }

    if (responseData.status !== "success") {
      alert(responseData.message); // 실패 메시지
      changepages(pageWrite);
      return;
    } else {
      //정상적으로 수행될 때
      //boards: 게시물 목록 리스트 (위에서 빈 배열로 정의)
      boards = responseData.data; //리스트에 가져온 게시물 추가
      boardList.innerHTML = "";

      boards.forEach((board) => {
        //li태그에 대한 요소를 만들어서 listItem 에 담음
        const listItem = document.createElement("li");
        listItem.innerText = board.title;

        //각각 이벤트리스너 옵션(클릭 시 실행) 추가해줌
        listItem.addEventListener("click", () => {
          // console.log(board.boardId);
          //게시물 상세 보기
          getBoard(board.boardId);
        });

        //innerHTML 과 같은 역할 - li들을 ul 안에 넣음
        boardList.appendChild(listItem);
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

//================================게시물 수정 함수===============================

async function updateBoard() {
  // event.preventDefault();
  changepages(pageUpdate);

  const accessToken = localStorage.getItem("AccessToken");

  const boardId = updateBtn.dataset.boardId;
  console.log(boardId);

  if (!accessToken) {
    alert("게시물을 조회하려면 로그인이 필요합니다.");
    changePages(pageSignin);
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/board/${boardId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const responseData = await response.json();

    if (responseData.status === "success") {
      console.log(responseData.data);
      updateTitleInput.value = responseData.data.title;
      updateContentInput.value = responseData.data.content;
      changepages(pageUpdate);
    }
  } catch (error) {
    changepages(pageUpdate);
  }
}

//===========================게시물 수정 요청 보내는 함수=========================
async function update(event) {
  event.preventDefault();

  const accessToken = localStorage.getItem("AccessToken");

  const boardId = updateBtn.dataset.boardId;
  console.log(boardId);

  if (!accessToken) {
    alert("게시물을 조회하려면 로그인이 필요합니다.");
    changePages(pageSignin);
    return;
  }

  const updateData = {
    boardId: boardId,
    title: updateTitleInput.value,
    content: updateContentInput.value,
  };

  try {
    const response = await fetch(`${API_BASE_URL}/board/update`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    });

    const responseData = await response.json();

    if (responseData.status !== "success") {
      alert(responseData.message);
      console.log(responseData.message)
      await renderboard();
      changepages(pageBoard);
    } else {
      alert(responseData.message);
      console.log(responseData.message)
      renderboard();
      changepages(pageBoard);
    }
  } catch (error) {}
}
//요청 보내기
// try {
//   const response = await fetch(`${API_BASE_URL}board/${boardId}`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${accessToken}`,
//     },
//     body: JSON.stringify({
//       title,
//       content,
//     }),
//   });

//   const responseData = await response.json();
//   console.log(responseData.data);
//   if (responseData.status === "success") {
//     console.log(responseData.message);

// //수정할 게시물Id, 제목, 내용 가져오기
// const boardId = editForm.dataset.boardId;
// const titleInput = document.querySelector("#edit-title").value.trim();
// const contentInput = document.querySelector("#edit-content").value.trim();

//     // 수정 폼에 기존 데이터 넣기
//     const data = responseData.data;
//     const boardId = updateForm.dataset.boardId;
//     document.querySelector("#update-title").value.trim() = data.title;
//     document.querySelector("#update-content").value.trim() = data.content;

//     alert("게시물이 성공적으로 수정되었습니다.");
//   } else {
//     alert("게시물 수정 중 오류 발생");
//   }

//   await renderboard(); //게시물 목록 새로고침
//   changepages(pageBoard); //다시 게시물 목록 페이지로
// } catch (error) {
//   console.log("에러발생");
// }

//수정누름 - 아이디를 데이터셋에 넘겨서 아이디 불러옴 - 보드 아이디, 원래 있던 내용 가져옴
//수정 폼 형태를 띄움 - 글쓰기 형태랑 같음(div)
//수정 페이지로 바뀔 때 상세요청 날려서
//원래 있던 내용을 input 과 textarea 에 넣기
//상세조회를 먼저 1번 함 - 원래 글 내용이 있음
//수정할 input 에 넣음
//수정하고 update 요청 날림
//수정 후 밑에 수정하기 버튼을 통해 수정 요청 날리고 목록으로 페이지 전환

//===============================게시물 삭제 요청 함수==============================
async function removeBoard() {
  console.dir(deleteBtn.dataset.boardId);

  const boardId = deleteBtn.dataset.boardId; //삭제할 게시물의 boardId

  const accessToken = localStorage.getItem("AccessToken"); //토큰 가져옴
  //토큰 유무 유효성 검사
  if (!accessToken) {
    alert("삭제하려면 로그인이 필요합니다.");
    changepages(pageSignin);
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/board/remove/${boardId}`, {
      method: "POST", //요청 메소드 : POST
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const responseData = await response.json();

    if (responseData.status !== "success") {
      alert(responseData.message);
    } else {
      alert(responseData.message);
    }

    await renderboard(); //게시물 목록 새로고침  => 새로고침 먼저 되도록 await
    changepages(pageBoard); //게시물 페이지로 돌아감
  } catch (error) {
    console.log(error);
    alert("삭제 요청을 보내는 중에 문제가 발생했습니다.");
  }
}

//===========================================게시물 추가 함수=======================================
async function addBoard(event) {
  event.preventDefault(); //이벤트 막기

  // 요청 보내기 전 필요한 데이터 가져오기
  const userInfo = await getPayload();
  console.log(userInfo);

  //input 의 입력값 빼오기 - title, content 가져옴
  //input.value 필요
  const titleInput = document.querySelector("#write-title");
  const contentInput = document.querySelector("#write-content");

  //토큰은 로컬스토리지에 있음
  const accessToken = localStorage.getItem("AccessToken");
  //토큰은 전역으로 가져와도 되는지?????

  //혹시모를 accessToken 이 없는 경우 -> 토큰 없을 땐 로그인 페이지로 전환
  //백엔드 요청에 accessToken 이 필요하니까
  if (!accessToken) {
    alert("글을 작성하려면 로그인이 필요합니다.");
    changepages(pageSignin);
    return;
  }

  //항목에 빈값을 입력하거나 공백을 입력했을 경우
  if (!titleInput.value.trim() || !contentInput.value.trim()) {
    alert("모든 항목을 입력해주세요.");
    return;
  }

  //요청을 위한 body 데이터 객체 만들기
  //요청 dto 에 들어가는 데이터 그대로 보내기 위해 객체로 만듦
  const boardData = {
    title: titleInput.value,
    content: contentInput.value,
    userId: userInfo.jti,
  };

  //try 안에 contents type, header, token 넣어서 요청 보내기
  //responsedata 로 ApiRespDto (status, message, data)
  //data 안에 결과가 있음 -> 즉, responsedata.data
  try {
    //요청 보내기
    //함수 자체가 비동기인데 동기처럼 하기 위해 await 해줘야함
    //fetch(promise) 의 결과, 즉 요청 자체 -> response 변수에 저장
    const response = await fetch(`${API_BASE_URL}/board/add`, {
      method: "POST",
      //CORS 막히는 것 방지 - 요청주소/포트 다름 or body 를 요청 시 보내야할 때
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      //넘겨줘야 하는 데이터를 body 안에 넣어줌
      body: JSON.stringify(boardData), //객체를 json 문자열로 바꿈
    });
    //응답 데이터 빼오기(json 형태로)-백엔드 서버의 ApiRespDto 에서
    const responseData = await response.json();

    if (responseData.status !== "success") {
      alert(responseData.message);
    } else {
      alert(responseData.message);
      writeForm.reset();
      await renderboard(); //ul 에 li 추가하는 렌더링 먼저-await 붙여
      //                               changepages보다 먼저 실행되도록
      changepages(pageBoard); //최종 - 게시물 목록으로 전환
    }
  } catch (error) {
    console.log(error);
    alert("게시물 등록 중 로류가 발생했습니다.");
  }
}

//========================================게시물 상세 조회==================================
async function getBoard(boardId) {
  btnBox.classList.remove("active");

  //토큰 가져오기
  const accessToken = localStorage.getItem("AccessToken");

  //토큰의 유저아이디와 로그인한 유저아이디 비교
  const userInfo = getPayload(accessToken);
  const userId = parseInt(userInfo.jti);

  if (!accessToken) {
    alert("게시물을 조회하려면 로그인이 필요합니다.");
    changepages(pageSignin);
    return;
  }

  try {
    //데이터 담을 response
    const response = await fetch(`${API_BASE_URL}/board/${boardId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    //백엔드의 ApiRespDto 의 데이터(json 문자열)를 가져옴 -> js 형태로
    const responseData = await response.json();

    //가져온 데이터를 요소에 추가해줌
    if (responseData.status === "success") {
      detailTitle.innerText = responseData.data.title;
      detailUserId.innerHTML = `유저 ID : ${responseData.data.userId}`;
      detailContent.innerHTML = responseData.data.content;
      // 게시물 삭제 속성 추가 - 데이터셋 아이디 부여
      deleteBtn.setAttribute("data-board-id", responseData.data.boardId);
      updateBtn.setAttribute("data-board-id", responseData.data.boardId);

      //

      if (responseData.data.userId == userId) {
        btnBox.classList.add("active");
      }
      changepages(pageDetail);
    }

    console.log(responseData.data);
  } catch (error) {}
}

//===================================로그인 요청 함수======================================
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

      //==================게시판 목록으로 전환하기=====================================================================
      //========================================================================================================
      // await renderboard(); //ul안에 li 넣기 - 렌더링
      // //페이지 바꾸기전 렌더링 먼저 -> await 사용
      // changepages(pageBoard);
      location.reload(); //새로고침해서 로그아웃 버튼 나오게 하기 위함
    }
  } catch (error) {
    //요청 자체에 실패한 경우
    console.log("서버와 통신 중 오류가 발생했습니다: " + error);
    alert("로그인 요청에 오류가 발생했습니다.");
  }
}

//Backend 연결
//========================================회원가입 요청함수=========================================================
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
//---------------------------상단 버튼 이벤트리스너 옵션 추가----------------------------------------------------
//버튼 눌러졌을 때 호출 - 4개 버튼 각각
//클릭했을 때만 실행되야 하므로 익명함수로 함

//로그인
navSignin.addEventListener("click", () => {
  changepages(pageSignin);
});

//회원가입
navSignup.addEventListener("click", () => {
  changepages(pageSignup);
});

//로그아웃
navLogout.addEventListener("click", () => {
  if (confirm("정말 로그아웃 하시겠습니까?")) {
    //"예" 선택할 경우 밑에 true 조건 따름
    localStorage.removeItem("AccessToken"); //엑세스 토큰 삭제
    location.reload(true); //새로고침 발생
  } else {
    return;
  }
});

//게시판 => 게시물 조회
navBoard.addEventListener(
  "click",
  renderboard
  // changepages(pageBoard);    위에 render 함수에 포함되어있음
);

// navEdit.addEventListener("click", updateBoard);

//글쓰기
navWrite.addEventListener("click", () => {
  console.log("글쓰기 클릭됨");
  console.log(pageWrite);
  changepages(pageWrite);
});

//회원가입
signupForm.addEventListener("submit", signupHandler);
//jiny01, 1234 , allie7019@naver.com

//로그인
signinForm.addEventListener("submit", signinHandler);

//글쓰기 - 게시물 작성
writeForm.addEventListener("submit", addBoard);

updateForm.addEventListener("submit", update);

//목록으로 돌아가기 버튼 - 목록으로 -> renderboard 안에서 페이지 전환 정의해둠
backBtn.addEventListener("click", renderboard);

//게시물 상세보기 - 삭제 버튼
deleteBtn.addEventListener("click", removeBoard);

//게시물 상세보기 - 수정 버튼
updateBtn.addEventListener("click", updateBoard);

// document.addEventListener("DOMContentLoaded", function () {
//   const editForm = document.querySelector("#edit-form");

//   if (editForm) {
//     editForm.addEventListener("submit", updateBoard);
//   }
// });

//리로드 시 토큰 유무 확인
// (O : 게시판 불러오기(renderboard), X: 로그인 페이지 (signinpage))
// DOMContentLoaded : HTML 문서가 완전히 로드되고 파싱되었을 때
document.addEventListener("DOMContentLoaded", async () => {
  const accessToken = localStorage.getItem("AccessToken");

  if (accessToken) {
    navSignin.style.display = "none"; //버튼 가리기
    navSignup.style.display = "none";
    await renderboard();
  } else {
    navLogout.style.display = "none";
    changeInfo.style.display = "none";
    changepages(pageSignin);
  }
});

changeInfo.addEventListener("click", () => {
  changepages(pagechangepw);
});

//아이디, 기존 PW, 새 PW, 토큰
//메뉴버튼 만들고 엑세스 토큰에 따라서 보이고 안보이고 처리
//요청 보낼 때 userId, oldPW, newPw body 로 요청, 보내기
//accessToken 도 같이 헤더에
//새로운 비밀번호 입력은 두번 받아서 두개의 값이 같은지 확인 후 요청 처리
//비밀번호가 변경되면 로그아웃 처리, 로그아웃 페이지로 전환

//============================추가: 비밀번호 변경===========================
changeInfoForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  // 요청 보내기 전 필요한 데이터 - userId 가져오기
  const userInfo = await getPayload();

  // 입력값 가져오기
  const userId = userInfo.jti;
  const oldPassword = document.querySelector("#changepw-old").value;
  const newPassword = document.querySelector("#changepw-new").value;
  const confirmPassword = document.querySelector("#changepw-confirm").value;

  //요청 보내려면 토큰 필요
  const accessToken = localStorage.getItem("AccessToken"); //토큰 빼오기

  // //로그인되어 있을 때에만 변경페이지 보이도록
  // if (accessToken) {
  //   changepages(pagechangepw);
  // } else {
  //   alert("로그인 후 이용 가능합니다.");
  //   changepages(pageSignin);
  // }

  if (!userId || !oldPassword || !newPassword) {
    alert("모든 항목을 입력하세요.");
    return;
  }

  //비밀번호 2번 입력값 같은지 확인
  if (newPassword !== confirmPassword) {
    //2개의 입력값이 다를 경우
    alert("새 비밀번호가 일치하지 않습니다.");
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/account/change/password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        userId,
        oldPassword,
        newPassword,
        confirmPassword,
      }),
    });
    //responseData 안에 요청 응답결과 가져옴 (status, message, data)
    const responseData = await response.json();

    if (responseData.status !== "success") {
      alert(`비밀번호 변경 실패: ${responseData.message}`);
      return;
    }

    alert("비밀번호 변경 성공");
    localStorage.removeItem("AccessToken"); //로그아웃
    changepages(pageSignin); //다시 로그인 페이지로
  } catch (error) {
    alert("에러 발생: " + error.message);
  }
});
