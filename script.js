const main = document.querySelector("main");

main.innerHTML = `
<div class="input">
    <div class="inputContainer">
        <input type="text" id="input" placeholder="Add To-Do here...">
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
        addTodo(input.value)
    }
});

function addTodo(e) {
    let list = `<div class="list">
<input type="checkbox" id="checkbox">
<div class="todo">${e}</div>
<div class="icons">
    <i class="fa-solid fa-pen"></i>
    <i class="fa-solid fa-trash-can"></i>
</div>
</div>`;
    lists.insertAdjacentHTML("afterbegin", list);
    input.value = ""
}

