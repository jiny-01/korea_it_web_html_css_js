//2. 값을 넣어주는 로직
//웹 페이지의 리소스가 전부 로드가 다 되었을 때
//브라우저에 웹 페이지가 켜질 때

window.onload = () => {
  const root = document.querySelector("#root");

  //여기서 렌더링을 시켜주는 함수 render를 호출
  render(root);
};

function render(targetElement) {
  targetElement.innerHTML = app();
}
