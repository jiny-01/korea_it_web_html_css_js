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

//상단메뉴 버튼 4개 각각 클릭할 때 실행될 함수 - 페이지 전환 함수
function changepages(pageElement) {
  const pages = document.querySelectorAll(".page"); //페이지 다 들고옴
  pages.forEach((page) => {
    //일단 전부 active 제거
    pageElement.classList.remove("active");
  });
  pageElement.classList.add("active"); //선택된 거에만 active
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
