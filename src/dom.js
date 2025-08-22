import todoManager from "./todoManager.js";
import projectManager from "./projectManager.js";


const domManager = (function () {
    const content = document.querySelector("#content");

    //using data-purpose for the O/C principle
    function handleClick(e) {
        if (e.target.tagName === "BUTTON")
        {
            const purpose = e.target.dataset.purpose;
            if (purpose === "todo") {
                console.log("Using todo");
                todoManager.receiveEvent(e.target);
            }
            else if (purpose === "project") {
                projectManager.receiveEvent(e.target);
            }
        }
        
    }

    function initiate() {
        const sidebar = document.querySelector("#sidebar");
        const container = document.querySelector("#container");

        attachEvents();
    }

    function attachEvents() {
        content.addEventListener("click", handleClick);
        // createButton.addEventListener("click", modalManager.showModal);
        // confirmButton.addEventListener("click", modalManager.confirmNewTodo);
    }
//this file prob needs to be name changed and just do somethign else. think about the restaurant...OR all i want in the index will instead be done here


    return { initiate };
})();

//remember that the dom should be the interface between the internal code and the user. it needs to call the internal modules' functions for them. 








export default domManager;