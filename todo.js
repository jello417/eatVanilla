const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = [];

function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  // filter() forEach()처럼 각요소에 함수가 실행되는데
  // 주어진 함수의 반환값이 true인 요소만 모아 새로운 배열로 반환
  const cleanToDos = toDos.filter(function(toDo) {
    //parseInt() string to number
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  saveToDos();
}

// 로컬저장소에는 자바스크립트의 데이터를 오직 string형태로만 저장할 수 있다.
// JSON (JavaScript Object Notation)
// 데이터를 자바스크립트가 다룰 수 있는 형태로 바꿔주는 기능
// JSON.stringify(value) object to string
// JSON.parse(value) string to object

// local storage에 저장 / object to string function
function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text) {
  const li = document.createElement("li"),
    span = document.createElement("span"),
    delBtn = document.createElement("button");
  const newId = toDos.length + 1;
  span.innerText = text;
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", deleteToDo);
  li.appendChild(span);
  li.appendChild(delBtn);
  li.id = newId;
  toDoList.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId
  };

  //push() Array안에 요소 추가 메소드
  toDos.push(toDoObj);
  saveToDos();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}

// local storage에서 불러오기 / string to object function
function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    // forEach() 배열메소드, Array에 담겨있는 각 요소에 함소를 실행시켜준다.
    parsedToDos.forEach(function(toDo) {
      paintToDo(toDo.text);
    });
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
