window.addEventListener("load",updateList);
function getCloudData() {
    return JSON.parse(localStorage.getItem("todo")) || [];
};
const main = document.querySelector("main");

main.innerHTML = `
<div class="input">
    <div class="inputContainer">
        <input type="text" id="input" autocomplete="off" placeholder="Add To-Do here...">
        <button class="addBtn">Add</button>
    </div>
</div>
<div class="lists">
    <div class="list">
        <input type="checkbox" id="checkbox">
        <div class="todo">Lorem ipsum dolor sit amet consectetur adipisicing elit. Error quaerat quasi
        consequatur rerum nemo ut tempore necessitatibus esse sequi itaque culpa impedit, qui ratione
        veritatis autem fuga debitis, repellat iusto.</div>
        <div class="icons">
            <i class="fa-solid fa-pen"></i>
            <i class="fa-solid fa-trash-can"></i>
        </div>
    </div>
</div>
`;

const addBtn = document.querySelector(".addBtn");
const lists = document.querySelector(".lists");
const input = document.querySelector("#input");

addBtn.addEventListener("click", () => {
    if (input.value != "") {
        addTodo(input.value);
        input.value = "";
    };
});

function addTodo(e) {
    let newTodo = {
        id: new Date().getTime(),
        todo: e
    };
    setCloudData(newTodo);
    getCloudData();
    updateList();
}
function setCloudData(todo) {
    let getData = getCloudData();
    getData.push(todo);
    localStorage.setItem("todo", JSON.stringify(getData));
};
function updateList() {
    let allTodos = getCloudData()
    lists.innerHTML="";
    allTodos.forEach((todo) => {
        let list = `<div class="list" id="${todo.id}">
        <input type="checkbox" id="checkbox">
        <div class="todo">${todo.todo}</div>
        <div class="icons">
            <i class="fa-solid fa-pen"></i>
            <i class="fa-solid fa-trash-can"></i>
        </div>
        </div>`;
        lists.insertAdjacentHTML("afterbegin", list);
    })
}
// function addTodo(e) {
//     let list = `<div class="list">
// <input type="checkbox" id="checkbox">
// <div class="todo">${e}</div>
// <div class="icons">
//     <i class="fa-solid fa-pen"></i>
//     <i class="fa-solid fa-trash-can"></i>
// </div>
// </div>`;
//     lists.insertAdjacentHTML("afterbegin", list);
// }

