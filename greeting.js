// querySelector
// CSS선택자를 사용, 첫번째로 찾은 요소를 리턴

// querySelectorAll
// 배열을 리턴, 하나의 요소라 해도 배열로 리턴

const form = document.querySelector(".js-form"),
  input = form.querySelector("input"),
  greeting = document.querySelector(".js-greeting");

const USER_LS = "currentUser",
  SHOWING_CN = "showing";

// 로컬저장소 활용하기
// localStorage.setItem(key, value);
// localStorage.getItem(key);

function saveName(text) {
  localStorage.setItem(USER_LS, text);
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = input.value;
  paintGreeting(currentValue);
  saveName(currentValue);
}

function askForName() {
  form.classList.add(SHOWING_CN);
  form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text) {
  form.classList.remove(SHOWING_CN);
  greeting.classList.add(SHOWING_CN);
  greeting.innerText = `hello ${text}`;
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    askForName();
  } else {
    paintGreeting(currentUser);
  }
  // 3항 연산자
  // `${currentUser === null ? askForName() : paintGreeting(currentUser)}`
}

function init() {
  loadName();
}

init();
