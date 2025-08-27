import "./styles.css";

import domManager from "./dom.js"

// New actions can be added here without touching handleButton; open/closed principle
window.dom = domManager;
const buttonActions = {
    addProject: function (event) { domManager.openProjectCreationForm(event) },
    switchProject: function (event) { domManager.switchCurrentProject(event) },
    confirmAddProject: function (event) { domManager.confirmProjectCreationForm(event); },
    cancelProject: function (event) { domManager.cancelProjectCreationForm(event) },
    deleteProject: function (event) { domManager.removeProject(event); },
    editProject: function (event) { domManager.openProjectEditForm(event)},
    confirmEditProject: function(event) { domManager.confirmProjectEditForm(event) },
    addTodo: function (event) { domManager.openTodoModal(event, "Create") },
    confirmTodo: function (event) { domManager.confirmTodoCreation(event) },
    cancelTodo: function (event) { domManager.closeTodoModal(event) },
    editTodo: function (event) { domManager.openEditTodoForm(event); },
    exitEditTodo: function (event) { domManager.closeEditTodoForm(event); },
    deleteTodo: function (event) { domManager.removeTodo(event); },
    toggleCompleted: function(event) { event.target.parentElement.parentElement.parent.toggleCompletedState() }
};

function handleStorageOnChange(purpose) {
    const changePurposes = ['confirmAddProject', 'deleteProject', 'confirmEditProject', 'confirmTodo', 'exitEditTodo', 'deleteTodo', 'toggleCompleted'];
    if (changePurposes.find(p => p === purpose)) {
        domManager.saveToLocalStorage();
    }
}

let todo_list = (function () {
    //using data-purpose for the O/C principle
    function handleButton(event) {
        let button = event.target.closest('button');
        //for the toggling-complete checkbox
        if (!button) button = event.target.closest('input[type="checkbox"]')

        if (!button) return;

        const purpose = button.dataset.purpose;
        const action = buttonActions[purpose];

        if (action) {
            action(event);
        }
        else {
            console.log(purpose)
        }
        handleStorageOnChange(purpose);
    }

    function initiate() {
        const sidebar = document.querySelector("#sidebar");
        const container = document.querySelector("#container");

        attachEvents();
    }

    function attachEvents() {
        const content = document.querySelector("#content");
        content.addEventListener("click", handleButton);

        const modal = document.querySelector("dialog");
        modal.addEventListener("click", handleButton);
    }

    initiate();
})();

//The domManager basically handles most of the logic, almost always calling projectManager or modalManager's functions. project and todo are separate from the dom logic, while todoForm and projectForm are used as interfaces to use project and todo