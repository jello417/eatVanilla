const clockContainer = document.querySelector(".js-clock"),
  clockTitle = clockContainer.querySelector("h1");

function getTime() {
  const date = new Date();
  const minutes = date.getMinutes();
  const hours = date.getHours();
  const seconds = date.getSeconds();
  clockTitle.innerText = `${getZero(hours)}:${getZero(minutes)}:${getZero(
    seconds
  )}`;
  //    `${hours < 10 ? `0${hours}`: hours}:
  //     ${minutes < 10? `0${minutes}` : minutes}:
  //     ${seconds < 10 ? `0${seconds}` : seconds}`;
  /* 3항 연산자
    조건 ? 참일때실행 : 거짓일때실행
    10초보다 작으면 앞에 0을 붙이고
    그렇지 않으면 초를 그대로 출력한다.
    */
}

function getZero(value) {
  return `${value < 10 ? `0${value}` : value}`;
}

function init() {
  getTime(); // 최초호출 필요
  setInterval(getTime, 1000);
}

//setInterval(함수명, 시간간격);
//1000 = 1초 시간 마다 반복실행시켜주는 함수

init();
