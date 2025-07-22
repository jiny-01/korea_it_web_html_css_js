//1. 페이지의 가장 큰 틀 - 최상위
//student 리스트 관리
let studentList = []  //전역으로 사용되는 상태 역할

//전체 페이지의 메인 컴포넌트 역할
function app() {
    const appInfo = {
        title: "Component Study",
        date: new Date().toLocaleDateString(),   //현재 날짜를 지역형식에 맞게 문자열로 변환
        author: "김지니",
    };

    //이건 넣어주는게 아니라 문자열로 반환만 할 뿐 
    //넣어주는 건 index 에서 웹페이지가 로드되었을 때 실행됨
    return `
        <div>
            <h1>제목: ${appInfo.title}</h1>
            <h2>작성일: ${appInfo.date}</h2>
            <h3>작성자: ${appInfo.author}</h3>
            ${studentRegister()}
            <ul class="student-list"></ul>
        </div>    
    `
}

