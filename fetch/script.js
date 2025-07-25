//fetch란?
//JS 에서 네트워크 요청
//비동기적으로 수행을 할 수 있게 해주는 요청 api
//기반이 promise

// fetch(url, option)
// .then(response => {
//     //응답 객체를 확인 처리
// })

//https://jsonplaceholder.typicode.com/ 에서 가져옴 - get post1 주소
const API_URL = "https://jsonplaceholder.typicode.com/posts/1";

const fetchBtn = document.querySelector("#fetchBtn"); //게시물 불러오기 버튼 가져옴
const postContainer = document.querySelector("#postContainer");

//요청을 보내고 기다려야함 - 비동기여야함
//비동기처리를 해야하는 동기처럼 하기 위해 async/await 를 사용
async function getData() {
  postContainer.innerHTML =
    '<p class="placeholder-text">게시물 데이터 불러오는 중...</p>';
}

fetchBtn.addEventListener("click", getData);
