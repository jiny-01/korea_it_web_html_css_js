//Javascript 의 클래스
// class 클래스명
// 접근제어자, 타입 명시안함
//생성자는 있음 -> constructor

class Student {
  name;
  age;

  //생성자
  // 클래스의 인스턴스를 생성할 때 호출되는 메소드
  //constructor(인스턴스)
  constructor(name, age) {
    this.name = name; //현재 객체 => this
    this.age = age;
  }
}

//클래스 인스턴스 생성: new 키워드로 생성
const newStudent1 = new Student("이동윤", 27);
console.log(newStudent1);
console.log(newStudent1.name);
