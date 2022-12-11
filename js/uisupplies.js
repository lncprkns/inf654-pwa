const supplies = document.querySelector(".supplies")

document.addEventListener("DOMContentLoaded", function() {
    const menus = document.querySelector('.side-menu')
    M.Sidenav.init(menus, {edge: "right"})
    const forms = document.querySelector('.side-form')
    M.Sidenav.init(forms, {edge: "left"})
})

const renderSupply = (data, id) => {
    const supplyHtml = `
    <div class="card-panel supply task white row" data-id="${id}">
        <div class="task-detail">
            <div class="task-title">${data.item}</div>
            <div class="task-notes">${data.info}</div>
            <div class="task-notes">${data.inotes}</div>
        </div>
        <div class="task-delete">
            <i class="material-icons" data-id="${id}">delete_forever</i>
        </div>
    </div>`

    supplies.innerHTML += supplyHtml
}

const removeSupply = (id) => {
    const supply = document.querySelector(`.supply[data-id = '${id}']`)
    supply.remove()
}