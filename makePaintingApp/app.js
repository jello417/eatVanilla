// <canvas>
// canvas 내부의 픽셀에 접근할 수 있는 방법인 context를 가진 html element이다.
// 1. css 크기 설정 2.작동 범위 설정 두가지 크기 설정을 해야한다.
const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 700;
canvas.height = 700;

ctx.strokeStyle = "#2c2c2c";
ctx.lineWidth = 2.5;

let painting = false;

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
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    // lineTo 시작점과 끝점을 연결한 선을 만든다.
    // stroke 선 칠하기
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function onMouseDown(event) {
  painting = true;
}

// mousedown 클릭할 때 발생하는 이벤트
// mouseup 클릭 반대로 손을 떼면 발생하는 이벤트
if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
}
