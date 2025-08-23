import projectManager from "./projectManager.js";
import modalManager from "./modal.js"
import ProjectForm from "./projectForm.js";

const domManager = (function () {
    const projectListDom = document.querySelector("#project-list");
    const todosListDom = document.querySelector("#todos-list");
    let currentProject = projectManager.projects[0];

    const projectForm = new ProjectForm(projectListDom);

    function openProjectCreationForm() {
        //every project needs to have button functionality but no event listener (index.js will have a handleButton that redirects clicks on each project to there, with a single "switchCurrentProject" function). Make sure every project has a .project on it in the sidebar

        projectForm.displayForm();
    }

    function closeProjectCreationForm(event, created) {
        if (created) {
            let name = projectForm.submitForm(event);
            if (name) {
                createAndInsertProject(name);
            }
        }
        else {
            projectForm.hideForm(event);
        }
    }

    function createAndInsertProject(name) {
        const projectDiv = projectManager.createProject(name).getHTML();
        projectListDom.insertBefore(projectDiv, projectListDom.firstElementChild);
    }

    function removeProject(name) {
        
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
        reloadTodos();

    }

    //with use of localstorage, will almost certainly need to load the projects and then each project's todos alongside them. then, reloadtodos can be used on currentProject
    function reloadTodos() {
        //this will regenerate the #container with the todos for this project
        todosListDom.replaceChildren();
        const todos = currentProject.getTodos();
        console.log(todos);
    }

    function reloadContent() {
        projectListDom.replaceChildren();

        const projects = projectManager.projects;
        for (const project of projects) {
            createAndInsertProject(project);
        }
        reloadTodos();
    }

    function receiveModalEvent() {
        //wait this function makes no sense to have; addTodos for example should handle the modal
    }

    return { openProjectCreationForm, closeProjectCreationForm, generateTodo, switchCurrentProject, receiveModalEvent };
})();

export default domManager;