const close = document.getElementsByClassName("close");

const todoList = document.getElementsByTagName("LI");
for (let i = 0; i < todoList.length; i++) {
    createCloseBtn(todoList[i]);
}
deleteItem();

function newElement() {

    let input = document.getElementById("task").value;
    if (input === '') {
        $('.error').toast('show');
        return
    }

    document.getElementById("task").value = "";

    addTodo(input);

    $('.success').toast('show');

    saveTodos(input);
}

function addTodo(todo) {

    let li = document.createElement("li");
    let text = document.createTextNode(todo);
    li.appendChild(text);
    document.getElementById("list").appendChild(li);

    createCloseBtn(li);

    deleteItem();
}

function createCloseBtn(todoItem) {
    let span = document.createElement("span");
    let txt = document.createTextNode("\u00D7")
    span.className = "close";
    span.appendChild(txt);
    todoItem.appendChild(span);
}

function deleteItem() {
    let li = document.createElement("li");
    for (let i = 0; i < close.length; i++) {
        close[i].onclick = function () {
            let div = this.parentElement;
            div.style.display = "none";
            li.classList.remove('checked');
            deleteChecked();
            removeTodo(this.parentElement.textContent);
        }
    }
}

let list = document.querySelector('ul');
list.addEventListener('click', function (e) {
    if (e.target.tagName === 'LI') {
        e.target.classList.toggle('checked');
    } deleteChecked()
}, false)

document.querySelector('#deleteAll').onclick = function () {
    let elements = document.querySelectorAll('.checked');
    elements.forEach(function (item) {
        item.style.display = 'none';
        item.classList.remove('checked');
        removeTodo(item.textContent);
    })
    deleteChecked();
}

function deleteChecked() {
    let checkList = document.querySelectorAll('.checked');
    if (checkList.length > 0) {
        document.querySelector('#deleteAll').classList.remove('d-none');
    } else {
        document.querySelector('#deleteAll').classList.add('d-none');
    }
}

//save data to local storage
function saveTodos(input) {

    let existingTodos = JSON.parse(localStorage.getItem("todos"));
    existingTodos.push({
        text: input
    });
    localStorage.setItem("todos", JSON.stringify(existingTodos));

}
function removeTodo(input) {
    let existingTodos = JSON.parse(localStorage.getItem("todos"));
    const item = existingTodos.find(x => x.text === input.replace('\u00D7', ''))
    const removeIndex = existingTodos.indexOf(item);
    existingTodos.splice(removeIndex, 1);
    localStorage.setItem("todos", JSON.stringify(existingTodos));

}

//get data from local storage 
function getTodos() {

    const todos = JSON.parse(localStorage.getItem("todos"));
    if (!todos || todos === null) {
        localStorage.setItem('todos', JSON.stringify([]));
    } else {
        for (let i = 0; i < todos.length; i++) {

            addTodo(todos[i].text);
        }
    }

}
getTodos();
