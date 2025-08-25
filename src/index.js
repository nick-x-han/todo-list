import "./styles.css";

import domManager from "./dom.js"

// New actions can be added here without touching handleButton; open/closed principle
const buttonActions = {
    addProject: function (event) { domManager.openProjectCreationForm(event) },
    switchProject: function (event) { domManager.switchCurrentProject(event) },
    confirmAddProject: function (event) { domManager.confirmProjectCreationForm(event) },
    cancelProject: function (event) { domManager.cancelProjectCreationForm(event) },
    deleteProject: function (event) { domManager.removeProject(event) },
    editProject: function (event) { domManager.openProjectEditForm(event)},
    confirmEditProject: function(event) { domManager.confirmProjectEditForm(event) },
    addTodo: function (event) { domManager.openTodoModal(event) },
    confirmTodo: function (event) { domManager.confirmTodoCreation(event) },
    cancelTodo: function (event) { domManager.closeTodoModal(event) },

};

let todo_list = (function () {
    //using data-purpose for the O/C principle
    function handleButton(event) {
        const button = event.target.closest('button');

        if (!button) return;

        const purpose = button.dataset.purpose;
        const action = buttonActions[purpose];

        if (action) {
            action(event);
        }
        else {
            console.log(purpose)
        }
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