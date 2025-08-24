import projectManager from "./projectManager.js";
import modalManager from "./modal.js"
import { ProjectForm } from "./projectForm.js";

const domManager = (function () {
    const projectListDom = document.querySelector("#project-list");
    const todosListDom = document.querySelector("#todos-list");
    const currentProjectName = document.querySelector("#current-project-header");

    let currentProject = projectManager.projects[0];

    const projectForm = new ProjectForm(projectListDom, projectManager);

    //NEW IDEA: use the overall same projectForm, but just allow choosing between edit or creation display and also where it gets displayed
    function openProjectCreationForm(event) {
        projectForm.displayCreationForm();
    }

    function confirmProjectCreationForm(event) {
        let name = projectForm.submitForm(event);
 
        if (name) {
            const project = projectManager.createProject(name);
            insertProject(project);
        }
    }

    function confirmProjectEditForm(event) {
        projectForm.submitForm(event);
    }

    function cancelProjectCreationForm(event) {
        projectForm.hideForm(event);
    }

    function insertProject(project) {
        const projectDiv = project.getHTML();
        projectListDom.insertBefore(projectDiv, projectListDom.firstElementChild);
    }

    function openProjectEditForm(event) {
        let projectDiv = event.target.closest("div");
        projectForm.displayEditForm(projectDiv);
    }

    function removeProject(event) {
        let projectDiv = event.target.closest("div");
        let name = projectDiv.firstElementChild.textContent;
        projectManager.deleteProjectByName(name);
        reloadContent();
    }

    function switchCurrentProject(event) {
        currentProject.getHTML().classList.toggle("current-project");
        let name = event.target.textContent;
        currentProject = projectManager.getProjectByName(name);
        currentProject.getHTML().classList.toggle("current-project");
        currentProjectName.textContent = currentProject.project.getName();
        // reloadTodos();
    }

    function openTodoModal() {
        modalManager.displayModal("Create");
    }
    
    function closeTodoModal() {
        modalManager.closeModal();
    }

    function generateTodo() {
        currentProject.addTodo();
    }

    //with use of localstorage, will almost certainly need to load the projects and then each project's todos alongside them. then, reloadtodos can be used on currentProject
    function reloadTodos() {
        //this will regenerate the #container with the todos for this project
        // todosListDom.replaceChildren();
        // const todos = currentProject.getTodos();
        // console.log(todos);
    }

    function reloadContent() {
        projectListDom.replaceChildren();

        const projects = projectManager.projects;
        for (const project of projects) {
            insertProject(project);
        }
        // reloadTodos();

        //i envision this being useful if the current project deleted and then which project to load?
        if (!currentProject) {
            currentProject = projectManager.projects.at(-1);
        }
        currentProject.getHTML().classList.add("current-project");
        currentProjectName.textContent = currentProject.project.getName();
    }

    function receiveModalEvent() {
        //wait this function makes no sense to have; addTodos for example should handle the modal
    }

    reloadContent();

    return { openProjectCreationForm, confirmProjectCreationForm, cancelProjectCreationForm, generateTodo, switchCurrentProject, receiveModalEvent, removeProject, openProjectEditForm, confirmProjectEditForm, openTodoModal, closeTodoModal };
})();

export default domManager;