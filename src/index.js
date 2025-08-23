import "./styles.css";

import domManager from "./dom.js"

// New actions can be added here without touching handleButton; open/closed principle
const buttonActions = {
    addProject: function () { domManager.openProjectCreationForm() },
    switchProject: function (event) { domManager.switchCurrentProject(event) },
    confirmProject: function (event) { domManager.closeProjectCreationForm(event, true) },
    cancelProject: function (event) { domManager.closeProjectCreationForm(event, false) },
    deleteProject: function (event) { domManager.removeProject },
    editProject: function () { },
    addTodo: function () { },
    confirmTodo: function () { },
    cancelTodo: function () { },

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
        // createButton.addEventListener("click", modalManager.showModal);
        // confirmButton.addEventListener("click", modalManager.confirmNewTodo);
    }

    initiate();
})();