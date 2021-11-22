// get todos from localStorage
let todos = localStorage.getItem("todos")

// try parse data or null
try {
    todos = JSON.parse(todos)
    todos = todos.length ? todos : null
} catch(e) {
    todos = null
}

// set default value if todos == null
if (!todos) {
    todos = [
        {content: "learn Js", status: true},
        {content: "Watch videos", status: false},
        {content: "Like videos", status: true},
    ]
    localStorage.setItem("todos", JSON.stringify(todos))
}

// func to create or update todos list in ui
function createTodos(todos) {
    let todosList = document.querySelector("#todos-list")
    todosList.innerHTML = ""

    // create list tag for each todo
    todos.forEach((todo, index) => {
        let li = document.createElement("li")
        li.className = "task"
        let division = document.createElement("div")
        division.className ="compeletion"
        let content = document.createElement("span")
        content.textContent = todo.content
        content.style.textDecoration = todo.status ? "initial" : 'line-through'
        let deleteBtn = document.createElement("img")
        deleteBtn.src = "./icon/x.svg"
        deleteBtn.alt = "delete icon"
        deleteBtn.className = 'delete'

        // append content and deleteBtn to li
        li.append(content)
        li.append(division)
        li.append(deleteBtn)

        // append li to todosList
        todosList.append(li)

        // add deleteBtn functionality
        deleteBtn.addEventListener("click", e => {
            todos.splice(index, 1)
            localStorage.setItem("todos", JSON.stringify(todos))
            createTodos(todos)
        })

        // add complete functionality
        content.addEventListener("click", e => {
            todos[index].status = !todos[index].status
            localStorage.setItem("todos", JSON.stringify(todos))
            createTodos(todos)
        })
    });
}

createTodos(todos)

// action add & search
let actions = document.querySelector("#actions")
let formWrapper = document.querySelector("#form-wrapper")

Array.from(actions.children).forEach(action => {
    if (action.dataset.action == "add") {
        action.addEventListener("click", e => {
            formWrapper.innerHTML = `
				<form id="add">
					<input class="form-control" name="add" placeholder="Add todo ..">
				</form>
			`
        })
    }
})

