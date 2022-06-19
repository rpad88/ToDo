// Selectors
const todoInput = document.querySelector('.todo-input')
const todoBtn = document.querySelector('.todo-btn')
const todoList = document.querySelector('.todo-list')
const filterOption = document.querySelector('.filter-todo')

// Event Listeners
todoBtn.addEventListener('click', addTodo)
todoList.addEventListener('click', deleteCheck)
filterOption.addEventListener('click', filterTodo)

// Functions
function addTodo(event) {
    event.preventDefault()

    print(todoInput.value)
    // ADD TODO TO LOCAL STORAGE
    saveLocalTodos(todoInput.value)
    // CLEAR TODO INPUT VALUE
    todoInput.value = ""
}

function deleteCheck(e) {
    e.preventDefault()

    const item = e.target
    // DELETE TODO
    if(item.classList[0] === 'trash-btn') {
        const todo = item.parentElement
        // Animation
        todo.classList.add('fall')
        removeLocalTodos(todo)
        todo.addEventListener('transitionend', function () {
            todo.remove() //Remove all div
        })
    }
    // CHECK MARK
    if(item.classList[0] === 'complete-btn') {
        const todo = item.parentElement
        todo.classList.toggle('completed')
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes
    todos.forEach(function(todo) {
        console.log(e.target.value);
        switch (e.target.value) {
            case 'all':
                todo.style.display = 'flex'
                break
            case 'completed':
                if(todo.classList.contains('completed')){
                    console.log('contém a classe completed');
                    todo.style.display = 'flex'
                } else {
                    todo.style.display = 'none'
                }
                break
            case 'uncompleted':
                if(!todo.classList.contains('completed')){
                    todo.style.display = 'flex'
                } else {
                    todo.style.display = 'none'
                }
                break
        }
    })
}

//CHECK IF ALREADY HAVE A TODO SAVED or create a new array
const todos = JSON.parse(localStorage.getItem('todos')) || []

function saveLocalTodos(todo) {
    todos.push(todo)
    localStorage.setItem("todos", JSON.stringify(todos))
}

function getTodos() {
    let todos = JSON.parse(localStorage.getItem('todos'))

    todos.forEach(print)
}

function print(element) {
    // CREATE TODO DIV
    const todoDiv = document.createElement('div')
    todoDiv.classList.add('todo')
    // CREATE LI
    const newTodo = document.createElement('li')
    newTodo.innerText = element
    newTodo.classList.add('todo-item')
    todoDiv.appendChild(newTodo)

    // CHECK MARK BUTTON
    const completedBtn = document.createElement('button')
    completedBtn.innerHTML = '<i class ="fas fa-check"></i>'
    completedBtn.classList.add('complete-btn')
    todoDiv.appendChild(completedBtn)
    // TRASH BUTTON
    const trashBtn = document.createElement('button')
    trashBtn.innerHTML = '<i class ="fas fa-trash"></i>'
    trashBtn.classList.add('trash-btn')
    todoDiv.appendChild(trashBtn)
    // APPEND TO LIST
    todoList.append(todoDiv)
}

function removeLocalTodos(todo) {
    const todoIndex = todo.children[0].innerText
    todos.splice(todos.indexOf(todoIndex, 1))
    localStorage.setItem("todos", JSON.stringify(todos))
    
}

getTodos()