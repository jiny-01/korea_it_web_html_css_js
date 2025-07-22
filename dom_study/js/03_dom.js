const addbtn = document.querySelector("#add-btn");

let count = 1;
addbtn.onclick = () => {
  console.log("클릭됨");
  const inputName = document.querySelector("#input-name"); //사용자가 입력한 값 확인
  console.log(inputName);

  const inputAge = document.querySelector("#input-age");
  console.log(inputAge);

  const inputAdr = document.querySelector("#input-address");
  console.log(inputAdr);

  //   const tableData = document.querySelector(".table-data");

  const tableBody = document.querySelector(".table");

  //   tableBody.innerHTML += inputName.value
  //   tableBody.innerHTML += inputAge.value
  //   tableBody.innerHTML += inputAdr.value

  const tableData = `
    <tr>
      <td>${count++}</td>
      <td>${inputName.value}</td>
      <td>${inputAge.value}</td>
      <td>${inputAdr.value}</td>
    </tr>
  `;

  tableBody.innerHTML += tableData;

  inputName.value = "";
  inputAge.value = "";
  inputAdr.value = "";

  if (inputName.value || inputAge.value || inputAdr.value === "") {
    alert("입력하세요");
    return;
  }
};

//입력값 테이블 데이터로 넣기
//이거 아님 -
//   const Data = tableDatas.map((data, index) => {
//     return `<tr>
//         <td>${index + 1}</td>
//         <td>${data.name}</td>
//         <td>${data.age}</td>
//         <td>${data.address}</td>
//         </tr>`;
//   })
