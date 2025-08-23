import "./styles.css";

import domManager from "./dom.js"
// import odinImage from "./odin.png";

const buttonActions = {
  addProject: function() { domManager.openProjectCreationForm() },
  switchProject: function(target) {domManager.switchCurrentProject(target) },
  addTodo: function() { /* delete item logic */ },
  confirmTodo: function() { /* edit post logic */ },
  cancelTodo: function() { /* edit post logic */ },
  // New actions can be added here without touching handleButton
};

let todo_list = (function () {

    //using data-purpose for the O/C principle
    function handleButton(e) {
        const button = e.target.closest('button');

        if (!button) return;

        const purpose = button.dataset.purpose;
        const action = buttonActions[purpose];

        if (action) {
            action(e.target);
        }
        // if (e.target.classList.contains("project")) {
        //     domManager.switchCurrentProject(e.target);
        // }
        // else if (e.target.tagName === "BUTTON")
        // {
        //     const purpose = e.target.dataset.purpose;
        //     if (purpose === "addTodo") {
        //         console.log("Using todo");
        //         //domManager.initializeTodoCreationModal();
        //     }
        //     else if (purpose === "addProject") {
        //         domManager.openProjectCreationForm();
        //     }
        // }
        //for any other button that removes projects or whatever, i think the events will be directly attached to those maybe and so don't have to use this function? but idk. MAYBE JUST ADD A SPECIFIC DATA-PURPOSE, like data-purpose="delete" or data-purpose="". even better, dynamically call functions by using data-purpose to put in the entire function name or something
        
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


// // Define an object that holds all your button functions
// const buttonActions = {
//   addUser: function() { /* add user logic */ },
//   deleteItem: function() { /* delete item logic */ },
//   editPost: function() { /* edit post logic */ },
//   // New actions can be added here without touching handleButton
// };

// function handleButton(event) {
//   const button = event.target.closest('button');
//   if (!button) return;

//   const actionName = button.dataset.purpose;
  
//   // Clean, dynamic lookup
//   const actionFunction = buttonActions[actionName];
  
//   if (actionFunction) {
//     actionFunction(); // Call the function if it exists
//   }
// }