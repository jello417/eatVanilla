// <canvas>
// canvas 내부의 픽셀에 접근할 수 있는 방법인 context를 가진 html element이다.
// 1. css 크기 설정 2.작동 범위 설정 두가지 크기 설정을 해야한다.

// var, let, const
// var 재선언, 재할당 가능
// let 재할당 가능 // 재선언 불가능 -> 선언만 하고 나중에 값 할당 가능
// const 재선언, 재할당 불가능 -> 선언과 동시에 값을 할당해야한다
const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

// offset - 캔버스 부분과 관련 있는값
// client - 윈도우 전체에서 마우스 위치값
function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  // 그리지 않을 때 canvas 좌표 초기화
  // beginPath 기존의 좌표를 지우고 시작점을 만든다.
  // moveTo 시작점의 좌표를 옮긴다.
  if (!painting || filling) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    // lineTo 시작점과 끝점을 연결한 선을 만든다.
    // stroke 선 칠하기
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function handleColorClick() {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}

function handleModeClick() {
  if (filling === true) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";
  }
}

function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

function handleCM(event) {
  event.preventDefault();
}

function handleSaveClick() {
  // HTMLCanvasElement.toDataURL()
  // href에는 주소, download에는 파일명
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "PaintJS";
  link.click();
}

// mousedown 클릭할 때 발생하는 이벤트
// mouseup 클릭 반대로 손을 떼면 발생하는 이벤트
if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  //우클릭할 때 발생하는 메뉴 제어
  canvas.addEventListener("contextmenu", handleCM);
}

// Array.from(object) -> 객체로부터 배열 생성하는 메서드
// forEach() -> 함수를 배열 요소 각각에 실행하는 메서드
Array.from(colors).forEach(color =>
  color.addEventListener("click", handleColorClick)
);

if (range) {
  range.addEventListener("input", handleRangeChange);
}

if (mode) {
  mode.addEventListener("click", handleModeClick);
}

if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}
