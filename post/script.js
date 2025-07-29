const API_BASE_URL = "https://jsonplaceholder.typicode.com";

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
const detailUserId = document.querySelector("#detailUserId");
//게시물 상세 내용
const detailBody = document.querySelector("#detailBody");
//목록으로 돌아가기 버튼
const backBtn = document.querySelector("#backBtn");

// for (let i = 1; i <= 100; i += 10) {
//   fetch(`https://jsonplaceholder.typicode.com/posts/${i}`)
//     .then(res => res.json())
//     .then(data => console.log(`postId: ${data.id}, userId: ${data.userId}`));
// }

//목록 - 상세전환 함수
function changeContainer(containerId) {
  //게시물 목록/ 상세 목록 2개 다 가져옴
  const containers = document.querySelectorAll(`.page-container`);
  containers.forEach((container) => {
    container.classList.remove("active");
  });
  document.querySelector(`#${containerId}`).classList.add("active");
}

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
        <span class="post-title" data-post-id="${post.id}">${post.title}</span>
        <button class="detail-btn" data-post-id="${post.id}">상세보기</button>
        </li>
        `;
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

//상세 요청 보내는 함수
async function fetchPostDetail(postId) {
  //호출되면 detailcontainer부터 나와야함
  changeContainer("postDetailContainer"); //상세컨테이너 나타남
  //제목, 내용, 아이디 바꾸기
  detailTitle.textContent = "불러오는 중...";
  detailId.textContent = "";
  detailUserId.textContent = "";
  detailBody.textContent = "내용 불러오는 중...";

  try {
    const response = await fetch(`${API_BASE_URL}/posts/${postId}`);
    
    if (!response.ok) {
      throw new Error("문제 발생!");
    }

    const post = await response.json();
    console.log(post);  //게시물 안의 내용 확인
    detailTitle.textContent = post.title;
    detailId.textContent = post.id
    detailUserId.textContent = post.userId;
    detailBody.textContent = post.body;
  } catch (error) {
    alert("게시물 상세를 불러오는 데 실패했습니다.");
    changeContainer("postListContainer"); //실패시 목록으로 감
  }

  //잘 들어오는지 확인
  console.log("postId:", postId);
  console.log("URL:", `${API_BASE_URL}$/posts/${postId}`);
}

//버튼 눌러질 때 감지 - 상세보기, 버튼 둘 중 하나
postList.addEventListener("click", (event) => {
  const target = event.target;

  if (
    target.classList.contains("post-title") ||
    target.classList.contains("detail-btn")
  ) {
    // console.log("클릭됨");
    const postId = target.dataset.postId;
    // dataset 에서는 알아서 - 있어도 카멜 케이스로 바꿈
    if (postId) {
      //상세 요청
      fetchPostDetail(postId);
    }
  }
});

//목록으로 돌아가기 버튼 감지

fetchPosts();
