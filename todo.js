const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

const toDos = [];

// 로컬저장소에는 자바스크립트의 데이터(객체, 배열, 불린) 를 저장할 수 없다.
// 오직 string만 저장할 수 있으므로 데이터형태를 바꾸어 저장해야 한다.
// JSON.stringify(value) object to string
// JSON.parse(value) string to object
function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    const delBtn = document.createElement("button");
    const newId = toDos.length + 1;
    span.innerText = text;
    delBtn.innerText = "X";
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj = {
        text: text,
        id: newId 
    };
    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if (loadedToDos !== null) {
        // JSON.parse(value) string to object
        const parsedToDos = JSON.parse(loadedToDos);
        
    }
}

function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();