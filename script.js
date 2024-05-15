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
};

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
        const todoBody = document.querySelector(".list");
        const todoText = document.querySelector(".todo");
        const todoCheckbox = document.querySelector("#checkbox");
        const editTodo = document.querySelector(".fa-pen");
        const deleteTodo = document.querySelector(".fa-trash-can");
        todoBody.addEventListener("click",()=>{

        })
    });
};


