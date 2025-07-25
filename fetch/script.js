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

  try {
    const response = await fetch(API_URL); //await 없으면 안기다릴 것
    console.log(response);

    // response.ok 가 아니면 or response.status===200 아니면
    if (!response.ok) {
      //문제가 있는 것
      throw new Error(
        `예외 발생! 상태: ${response.status} ${response.statusText}`
      );
    }

    const postData = await response.json(); //응답한 본문(body)을 json 형태로 파싱
    console.log(postData);

    postContainer.innerHTML = `
    <h2>${postData.title}</h2>
    <p>${postData.body}</p>
    `;

    postContainer.style.borderColor = "#28a745";
    postContainer.style.boxShadow = "0 0 0 2px rgba(40, 167, 69, 0.2)";
  } catch (error) {
    console.log("게시물 불러오기 실패 : " + error);
    postContainer.innerHTML = `
    <p class="placeholder-text" style="color: red;">
      데이터를 불러오는 데 실패했습니다.: ${error.message}
    </p>
  `;

    postContainer.style.borderColor = "#dc3545";
    postContainer.style.boxShadow = "0 0 0 2px rgba(220, 53, 69, 0.2)";
  }
}

fetchBtn.addEventListener("click", getData);
