import projectManager from "./projectManager.js";
import modalManager from "./modal.js"

const domManager = (function () {
    let currentProject = projectManager.projects[0];

    const projectForm = new ProjectForm();

    function openProjectCreationForm() {
        //every project needs to have button functionality but no event listener (index.js will have a handleButton that redirects clicks on each project to there, with a single "switchCurrentProject" function). Make sure every project has a .project on it in the sidebar

        projectForm.displayForm();
    }

    function closeProjectCreationForm(event, created) {
        if (created)
            projectForm.submitForm(event);
        else
            projectForm.hideForm(event);
    }

    function generateTodo() {
        currentProject.addTodo();
    }

    //used with the .project buttons on the sidebar to switch the project that will be added to from new todos
    function switchCurrentProject(event) {
        //add a .current-project class that will be styled to be darker in color or something
        event.target.classList.toggle("current-project");
        currentProject.classList.toggle("current-project");
        currentProject = event.target;
        reloadTodos(currentProject);

    }

    function reloadTodos() {
        //this will regenerate the #container with the todos for this project
        const todos = currentProject.getTodos();
        console.log(todos);
    }

    function receiveModalEvent() {
        //wait this function makes no sense to have; addTodos for example should handle the modal
    }

    return { openProjectCreationForm, closeProjectCreationForm, generateTodo, switchCurrentProject, receiveModalEvent };
})();

//handles the form for creating a project
function ProjectForm() {
    const projectListDom = document.querySelector("#project-list");
    const project = document.createElement("div");
    const form = document.createElement("form");
    const nameInput = document.createElement("input");
    const confirmButton = document.createElement("button");
    const cancelButton = document.createElement("button");

    confirmButton.dataset.purpose = "confirmProject";
    cancelButton.dataset.purpose = "cancelProject";

    function initiate() {
        confirmButton.textContent = "Add";
        // addButton.type = "button";
        cancelButton.textContent = "Cancel";
        cancelButton.type = "button";
        nameInput.type = "text";
        nameInput.minLength = 1;
        form.appendChild(nameInput);
        form.appendChild(confirmButton);
        form.appendChild(cancelButton);
        project.appendChild(form);
    }

    this.displayForm = function () {
        // modalManager.displayModal();
        projectListDom.insertBefore(project, projectListDom.firstElementChild);
        nameInput.focus();
    }

    this.hideForm = function (e) {
        project.remove();
    }

    this.submitForm = function(e) {
        e.preventDefault();
        const name = nameInput.value;
        if (nameInput.value.length > 0) {
            const projectButton = projectManager.createProject(name).getObject();
            projectListDom.insertBefore(projectButton, projectListDom.firstElementChild);
            nameInput.value = "";
            this.hideForm();
        }
        else {
            //the validation isn't working in general, so this is best that can be done (browser won't check)
            nameInput.focus();
        }
    }

    initiate();

}

//remember that the dom should be the interface between the internal code and the user. it needs to call the internal modules' functions for them. I THINK THAT this will just contain functions that add HTML to the template.html and also modify the projectManager. the todoManager is no more, while the projectManager is what contains the actual data. then dom.js contains the functions that index.js calls based on button clicks.








export default domManager;