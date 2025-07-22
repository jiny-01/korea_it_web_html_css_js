const addbtn = document.querySelector("#add-btn");

let count = 1;
addbtn.onclick = () => {
  console.log("클릭됨");
  const inputName = document.querySelector("#input-name"); //사용자가 입력한 값 확인
  const nameValue = inputName.value;
  console.log(nameValue);

  const inputAge = document.querySelector("#input-age");
  const ageValue = inputAge.value;
  console.log(ageValue);

  const inputAdr = document.querySelector("#input-address");
  const addressValue = inputAdr.value;
  console.log(addressValue);

  //   const tableData = document.querySelector(".table-data");

  const tableBody = document.querySelector(".table");

  //   tableBody.innerHTML += inputName.value
  //   tableBody.innerHTML += inputAge.value
  //   tableBody.innerHTML += inputAdr.value

  //+= : 쌓여서 들어감 
  tableBody.innerHTML += `
    <tr>
        <td>${count++}</td>
        <td>${nameValue}</td>
        <td>${ageValue}</td>
        <td>${addressValue}</td>
        </tr>
  `;

  count++;

  //입력값 초기화
  inputName.value = "";
  inputAge.value = "";
  inputAdr.value = "";

//   const tableData = `
//     <tr>
//       <td>${count++}</td>
//       <td>${inputName.value}</td>
//       <td>${inputAge.value}</td>
//       <td>${inputAdr.value}</td>
//     </tr>
//   `;

//   tableBody.innerHTML += tableData;

//   inputName.value = "";
//   inputAge.value = "";
//   inputAdr.value = "";

  if (nameValue === "" || ageValue === "" || addressValue === "") {
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
