window.addEventListener("load", getCloudData);

function getCloudData() {
    fetch('http://localhost:3000/getAll')
        .then(res => res.json())
        .then(data => updateList(data['data']))
        .catch(err => console.log(err))
};

const main = document.querySelector("main");

main.innerHTML = ` 
<div class="inputField">
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
const soundAccess = document.querySelector(".soundAccess");
const addAudio = new Audio("sound/add.mp3");
const checkedAudio = new Audio("sound/checked.mp3");
const deleteAudio = new Audio("sound/delete.mp3");
let soundAccessFlag = true;

soundAccess.addEventListener("click", (e) => {
    if (e.target.classList[1] == "fa-volume-high") {
        soundAccess.innerHTML = `<i class="fa-solid fa-volume-xmark sa"></i>`;
        soundAccessFlag = false;
    } else {
        soundAccess.innerHTML = `<i class="fa-solid fa-volume-high sa"></i>`;
        soundAccessFlag = true;
    }
})

input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        if (input.value != "") {
            addTodo(input.value);
            input.value = "";
        };
    };
});

addBtn.addEventListener("click", () => {
    if (input.value != "") {
        addTodo(input.value);
        input.value = "";
    };
});

function addTodo(e) {
    fetch('http://localhost:3000/addTodo', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ todo: e })
    })
        .then(res => res.json())
        .then(data => getCloudData())
        .catch(err => console.log(err))

    if (soundAccessFlag == true) {
        addAudio.play();
    }
};

function updateList(allTodos) {
    lists.innerHTML = "";

    allTodos.forEach((todo) => {
        let list = ``;

        if (todo.checked == true) {
            list = `<div class="list done-bg" id="${todo.id}">
            <input type="checkbox" id="checkbox" checked>
            <div class="todo done">${todo.todo}</div>
            <div class="icons">
            <i class="fa-solid fa-pen"></i>
            <i class="fa-solid fa-trash-can"></i>
            </div>
            </div>`;
        } else {
            list = `<div class="list" id="${todo.id}">
            <input type="checkbox" id="checkbox">
            <div class="todo">${todo.todo}</div>
            <div class="icons">
            <i class="fa-solid fa-pen"></i>
            <i class="fa-solid fa-trash-can"></i>
            </div>
            </div>`;
        }

        lists.insertAdjacentHTML("afterbegin", list);

        const todoBody = document.querySelector(".list");
        const todoText = document.querySelector(".todo");
        const todoCheckbox = document.querySelector("#checkbox");
        const editTodoBtn = document.querySelector(".fa-pen");
        const deleteTodoBtn = document.querySelector(".fa-trash-can");

        function checkDoneClass(e) {
            if (todoText.classList.contains("done")) {
                todoText.classList.remove("done");
                todoBody.classList.remove("done-bg");
                todoCheckbox.checked = false;
                fetch('http://localhost:3000/editTodo', {
                    headers: {
                        'Content-type': 'application/json'
                    },
                    method: 'POST',
                    body: JSON.stringify({ checked: 0, id: e })
                })
                    .then(res => res.json())
                    .then(data => getCloudData())
                    .catch(err => console.log(err));
            } else {
                todoText.classList.add("done");
                todoBody.classList.add("done-bg");
                todoCheckbox.checked = true;
                fetch('http://localhost:3000/editTodo', {
                    headers: {
                        'Content-type': 'application/json'
                    },
                    method: 'POST',
                    body: JSON.stringify({ checked: 1, id: e })
                })
                    .then(res => res.json())
                    .then(data => getCloudData())
                    .catch(err => console.log(err))
            };

            if (soundAccessFlag == true) {
                checkedAudio.play();
            };
        };

        todoText.addEventListener("click", () => {
            let id = todoBody.id
            checkDoneClass(id)
        });
        todoCheckbox.addEventListener("change", () => {
            let id = todoBody.id
            checkDoneClass(id)
        });
        deleteTodoBtn.addEventListener("click", () => deleteTodo(todo.id));
        editTodoBtn.addEventListener("click", () => editTodo(todoText.textContent, todo.id));
    });
};

function deleteTodo(id) {
    fetch('http://localhost:3000/deleteTodo', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'DELETE',
        body: JSON.stringify({ id: id })
    })
        .then(res => res.json)
        .then(data => getCloudData())
        .catch(err => console.log(err));

    if (soundAccessFlag == true) {
        deleteAudio.play();
    };
};

const inputCont = document.querySelector(".inputContainer");
const mainBtn = document.querySelector(".inputContainer button");

function editTodo(todoText, id) {
    main.scrollTop = 0;

    addBtn.style.display = "none";
    input.style.display = 'none';


    const editInput = document.createElement('input');
    editInput.id = "editInput";
    editInput.placeholder = 'Edit To-do here ...';
    editInput.autocomplete = "off";
    editInput.value = todoText;

    const editBtn = document.createElement("button");
    editBtn.classList.add("editBtn");
    editBtn.textContent = "Edit";

    inputCont.appendChild(editInput);
    inputCont.appendChild(editBtn);

    editInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            if (editInput.value != "") {
                editTodoSave()
            }
            inputCont.removeChild(editBtn);
            inputCont.removeChild(editInput);
            input.style.display = '';
            addBtn.style.display = "";
        }
    })

    editBtn.addEventListener("click", () => {
        if (editInput.value != "") {
            editTodoSave()
        }
        inputCont.removeChild(editBtn);
        inputCont.removeChild(editInput);
        input.style.display = '';
        addBtn.style.display = "";
    });
    function editTodoSave() {
        fetch('http://localhost:3000/editTodo', {
            headers: {
                'Content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ todo: editInput.value, id: id })
        })
            .then(res => res.json())
            .then(data => getCloudData())
            .catch(err => console.log(err));

        if (soundAccessFlag == true) {
            addAudio.play();
        }
    }
}