// //model two
//
// //Selectors
// const toDoInput = document.querySelector('.todo-input')
// const toDoButton = document.querySelector('.todo-button')
// const toDoList = document.querySelector('.todo-list')
// const allFilter = document.querySelector('.all')
// const activeFilter = document.querySelector('.on')
// const completedFilter = document.querySelector('.completed')
// const clear = document.querySelector('.remove')
//
// //Variables
// let todos = []
// let ALL = 'all'
// let ACTIVE = 'on'
// let COMPLETED = 'completed'
//
// //Event Listeners
// toDoButton.addEventListener('click', addTodo)
// toDoInput.addEventListener('keypress', (event) => {
//     if (event.key === 'Enter') {
//         addTodo()
//     }
// })
// toDoList.addEventListener('click', changeToDoMode)
// allFilter.addEventListener('click', () => filterToDos(ALL))
// completedFilter.addEventListener('click', () => filterToDos(COMPLETED))
// activeFilter.addEventListener('click', () => filterToDos(ACTIVE))
// clear.addEventListener('click', clearCompleted)
//
// //Functions
//
// function addTodo(event) {
//     event.preventDefault()
//     if (toDoInput.value === "" || toDoInput.value === " ") {
//         return;
//     }
//
//     const newToDo = {content: toDoInput.value, checked: false};
//     todos.push(newToDo);
//     renderToDos()
//
//     toDoInput.value = ""
// }
//
// function changeToDoMode(event) {
//     let item = event.target
//     let toDo = item.parentElement
//
//     if (item.classList[0] === 'delete-icon') {
//         todos.splice(toDo['id'], 1)
//         renderToDos()
//     } else {
//         todos[toDo['id']].checked = !todos[toDo['id']].checked
//         renderToDos()
//     }
// }
//
//
// function renderToDos() {
//     console.log(todos)
//     toDoList.innerHTML = todos.map((todo, index) => {
//         if (!todo.isClear) {
//             return `
//                 <div id=${index} class= 'todo ${todo.checked ? "complete-todo" : ''}'>
//                     <li>${todo.content}</li>
//                     <span class="delete-icon material-icons">close</span>
//                 </div>
//         `
//         }
//     }).join(' ')
// }
//
// allFilter.classList.add('filter-active')
//
// function filterToDos(mode) {
//     todos.forEach(todo => {
//         if (mode === ALL) {
//             // change button style
//             allFilter.classList.add('filter-active')
//             completedFilter.classList.remove('filter-active')
//             activeFilter.classList.remove('filter-active')
//             todo.isClear = false
//             renderToDos()
//         } else if (mode === COMPLETED) {
//             // change button style
//             completedFilter.classList.add('filter-active')
//             allFilter.classList.remove('filter-active')
//             activeFilter.classList.remove('filter-active')
//             //filter list
//             todo.isClear = !todo.checked;
//             renderToDos()
//
//         } else if (mode === ACTIVE) {
//             // change button style
//             activeFilter.classList.add('filter-active')
//             allFilter.classList.remove('filter-active')
//             completedFilter.classList.remove('filter-active')
//             //filter list
//             todo.isClear = todo.checked;
//             renderToDos()
//         }
//     })
// }
//
// function clearCompleted() {
//     for (let i = 0; i < todos.length; i++) {
//         if (todos[i].checked) {
//             todos[i].isClear = true
//         }
//     }
//     renderToDos()
// }
//
// // drag and drop
// new Sortable(toDoList, {
//     animation: 150,
//     group: 'shared',
//     ghostClass: 'blue-background-class'
// })

// model one

//Variables
let ALL = 'all'
let ACTIVE = 'on'
let COMPLETED = 'completed'

//Selectors
const toDoInput = document.querySelector('.addBtn')
const toDoButton = document.querySelector('.todo-button')
const toDoList = document.querySelector('.todo-list')
const allFilter = document.querySelector('.all')
const activeFilter = document.querySelector('.on')
const completedFilter = document.querySelector('.completed')
const clear = document.querySelector('.remove')


//Event Listeners
toDoButton.addEventListener('click', addTodo)
toDoInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        addTodo()
    }
})
toDoList.addEventListener('click', changeToDoMode)
allFilter.addEventListener('click', () => filterToDos(ALL))
completedFilter.addEventListener('click', () => filterToDos(COMPLETED))
activeFilter.addEventListener('click', () => filterToDos(ACTIVE))
clear.addEventListener('click', clearCompleted)
document.addEventListener('DOMContentLoaded', getToDos)

//Functions
function addTodo(event) {
    event.preventDefault()
    if (toDoInput.value === "" || toDoInput.value === " ") {
        return;
    }

    // create toDoDiv
    let toDoDiv = createToDoDiv()

    // create todoLi
    createToDoText(toDoDiv, toDoInput.value)
    saveLocalToDos(toDoInput.value)

    // create todoDelete icon
    createToDoDeleteIcon(toDoDiv)

    // append to list
    toDoList.appendChild(toDoDiv)

    // clear input value
    toDoInput.value = ''
}

function createToDoDiv() {
    const toDoDiv = document.createElement('div')
    toDoDiv.classList.add('todo')
    return toDoDiv
}

function createToDoText(toDoDiv, value) {
    const toDoText = document.createElement('li')
    toDoText.innerText = value
    toDoDiv.appendChild(toDoText)
}

function createToDoDeleteIcon(toDoDiv) {
    const deleteIcon = document.createElement('div')
    deleteIcon.classList.add('delete-icon')
    deleteIcon.classList.add('material-icons')
    deleteIcon.innerText = 'close'
    toDoDiv.appendChild(deleteIcon)
}

function changeToDoMode(event) {
    let item = event.target
    if (item.classList[0] === 'delete-icon') {
        let toDo = item.parentElement
        removeLocalToDos(toDo)
        toDo.remove()
    } else {
        item.classList.toggle('complete-todo')
    }
}

allFilter.classList.add('filter-active')

function filterToDos(mode) {
    const toDos = toDoList.childNodes

    toDos.forEach(toDo => {
        if (mode === ALL) {
            // change button style
            allFilter.classList.add('filter-active')
            completedFilter.classList.remove('filter-active')
            activeFilter.classList.remove('filter-active')
            //filter list
            toDo.style.display = 'flex'

        } else if (mode === COMPLETED) {
            // change button style
            completedFilter.classList.add('filter-active')
            allFilter.classList.remove('filter-active')
            activeFilter.classList.remove('filter-active')
            //filter list
            if (toDo.classList.contains('complete-todo')) {
                toDo.style.display = 'flex'
            } else {
                toDo.style.display = 'none'
            }

        } else if (mode === ACTIVE) {
            // change button style
            activeFilter.classList.add('filter-active')
            allFilter.classList.remove('filter-active')
            completedFilter.classList.remove('filter-active')
            //filter list
            if (!toDo.classList.contains('complete-todo')) {
                toDo.style.display = 'flex'
            } else {
                toDo.style.display = 'none'
            }
        }
    })
}

function clearCompleted() {
    const completedToDos = document.querySelectorAll(".complete-todo")
    completedToDos.forEach(todo => {
        todo.remove()
    })
}

function fillToDoFromLocal() {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    return todos
}

function saveLocalToDos(todo) {
    let todos = fillToDoFromLocal()
    todos.push(todo)
    localStorage.setItem('todos', JSON.stringify(todos))
}

function getToDos() {
    let todos = fillToDoFromLocal()

    todos.forEach(todo => {
        // create toDoDiv
        let toDoDiv = createToDoDiv()

        // create todoLi
        createToDoText(toDoDiv, todo)

        // create todoDelete icon
        createToDoDeleteIcon(toDoDiv)

        // append to list
        toDoList.appendChild(toDoDiv)
    })
}

function removeLocalToDos(todo) {
    let todos = fillToDoFromLocal()
    let chosenTodo = todo.childNodes[0].innerText
    todos.splice(todos.indexOf(chosenTodo), 1)
    localStorage.setItem('todos', JSON.stringify(todos))
}

// drag and drop
new Sortable(toDoList, {
    animation: 150,
    group: 'shared',
    ghostClass: 'blue-background-class'
})
