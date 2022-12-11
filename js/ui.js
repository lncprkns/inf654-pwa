//setup materialize components

document.addEventListener("DOMContentLoaded", function() {
    var modals = document.querySelectorAll(".modals")
    M.Modal.init(modals)

    var items = document.querySelectorAll(".collapsible")
    M.Collapsible.init(items)
})

const tasks = document.querySelector(".tasks")

document.addEventListener("DOMContentLoaded", function() {
    const menus = document.querySelector('.side-menu')
    M.Sidenav.init(menus, {edge: "right"})
    const forms = document.querySelector('.side-form')
    M.Sidenav.init(forms, {edge: "left"})
})

const renderTask = (data, id) => {
    const html = `
    <div class="card-panel task white row" data-id="${id}">
        <div class="task-detail">
            <div class="task-title">${data.task}</div>
            <div class="task-notes">${data.notes}</div>
        </div>
        <div class="task-delete">
            <i class="material-icons" data-id="${id}">delete_forever</i>
        </div>
    </div>`

    tasks.innerHTML += html
}

const removeTask = (id) => {
    const task = document.querySelector(`.task[data-id = '${id}']`)
    task.remove()
}


