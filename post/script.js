const API_BASE_URL = "https://jsonplaceholder.typicode.com/";

//게시물 목록 컨테이너
const postListContainer = document.querySelector("#postListContainer");
//게시물 상세 컨테이너
const postDetailContainer = document.querySelector("#psotDetailContainer");
//게시물 목록 ul
const postList = document.querySelector("#postList");

//게시물 상세 제목
const detailTitle = document.querySelector("#detailTitle");
//게시물 상세 ID
const detailId = document.querySelector("#detailId");
//게시물 상세 유저 ID
const detailUserId = document.querySelector("detailUserId");
//게시물 상세 내용
const detailBody = document.querySelector("detailBody");
//목록으로 돌아가기 버튼
const backBtn = document.querySelector("#backBtn");

let postlists = [];

//게시물 목록 불러와서 랜더링하는 함수
//비동기 함수, async 해서 await 붙임
//이 함수에서 요청을 보냄
async function fetchPosts() {
  try {
    const response = await fetch(`${API_BASE_URL}/posts`); //요청 보낼 주소

    if (!response.ok) {
      throw new Error("문제 발생!");
    }

    const posts = await response.json(); //꺼내옴
    console.log(posts);

    postList.innerHTML = "";
    if (posts) {
      //각 게시물 순회해서 li 안에 제목과 버튼 넣어서 ul 안에 넣기
      posts.forEach((post) => {
        postList.innerHTML += `
        <li>
        <span class="post-title">${post.title}</span>
        <button class="detail-btn">상세보기</button>
        </li>
        `;
        const li = document.querySelector("li");
        li.title = post.title;
        li.button = post.button;
      });
    } else {
      postList.innerHTML = '<p class="loading-message">게시물이 없습니다.</p>';
    }
  } catch (error) {
    // loading-message 내용 바꾸기(색도 빨간색으로)
    postList.innerHTML =
      '<p class="loading-message" style="color: red;">게시물 목록을 불러오는 데 실패했습니다.</p>';
  }
}

//버튼 눌러질 때 감지 - 상세보기, 버튼 둘 중 하나
postList.addEventListener("click", (event) => {
  const target = event.target;

  if (
    target.classList.contains("post-title") ||
    target.classList.contains("detail-btn")
  ) {
    console.log("클릭됨");
  }
  
});
fetchPosts();
