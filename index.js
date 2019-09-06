const title = document.querySelector("#title");
const CLICKED_CLASS = "clicked";

// function clicking() {
//     const CURRENT_CLASS = title.className;
//     if (CURRENT_CLASS === CLICKED_CLASS){
//         title.className = "";
//     } else {
//         title.className = CLICKED_CLASS;
//     }
// }

// function clicking() {
//     const CURRENT_CLASS = title.className;
//     const CLASS_CONDI = title.classList.contains(CLICKED_CLASS);
//     if (CLASS_CONDI){
//         title.classList.remove(CLICKED_CLASS);
//     } else {
//         title.classList.add(CLICKED_CLASS);
//     }
// }

function clicking() {
    title.classList.toggle(CLICKED_CLASS);
}

function init() {
    title.addEventListener("click", clicking);
}
init();