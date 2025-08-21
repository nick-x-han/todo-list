import Project from "./project.js"
import modalManager from "./modal.js"


const domManager = (function () {
    let projects = [];
    const createButton = document.querySelector("#new-todo");
    const confirmButton = document.querySelector("#confirm-button");

    function initiate() {
        const sidebar = document.querySelector("#sidebar");
        const container = document.querySelector("#container");
        let defaultProject = Project("Default Project");
        projects.push(defaultProject);

        attachEvents();
    }

    function attachEvents() {
        createButton.addEventListener("click", modalManager.showModal);
        confirmButton.addEventListener("click", modalManager.confirmNewTodo);
    }



    return { initiate };
})();



// const projectManager = (function () {
//     let projects;
//     function initiate(projectsList, sidebar) {
//         projects = projectsList;
//     }
// })();





export default domManager;