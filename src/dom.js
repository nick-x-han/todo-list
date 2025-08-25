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
        projectListDom.insertBefore(project.dom, projectListDom.firstElementChild);
    }

    function openProjectEditForm(event) {
        let projectDiv = event.target.closest("div");
        projectForm.displayEditForm(projectDiv);
    }

    function removeProject(event) {
        if (projectManager.projects.length === 1) {
            alert("You must have at least one project.");
            return;
        }
        let projectDiv = event.target.closest("div");
        let name = projectDiv.firstElementChild.textContent;
        if (projectManager.getProjectByName(name) == currentProject)
            currentProject = null;
        projectManager.deleteProjectByName(name);
        reloadContent();
    }

    function switchCurrentProject(event) {
        currentProject.dom.classList.toggle("current-project");
        let name = event.target.textContent;
        currentProject = projectManager.getProjectByName(name);
        currentProject.dom.classList.toggle("current-project");
        currentProjectName.textContent = currentProject.getName();
        // reloadTodos();
    }

    function openTodoModal(event, mainButtonText) {
        modalManager.displayModal(mainButtonText);
    }

    function closeTodoModal() {
        modalManager.closeModal();
    }

    function confirmTodoCreation(event) {
        event.preventDefault();
        let todoInfo = modalManager.popModal();
        let todo = projectManager.createTodo(currentProject, todoInfo);
        insertTodoToDom(todo);
    }

    function insertTodoToDom(todo) {
        todosListDom.prepend(todo.dom);
    }

    //for editing todos, just use the modal while disabling all inptu fields. each field will have an edit button next to it, or there's a single edit button to press that undisables all fields

    //for editing projects, prob better to use disabled and keep it as a text input and then style with :disabled so it looks like it isn't a form, but ship has long sailed.

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

        // which project to load after deleting the previous "current" one
        if (!currentProject) {
            currentProject = projectManager.projects.at(-1);
        }
        currentProject.dom.classList.add("current-project");
        if (currentProject)
            currentProjectName.textContent = currentProject.getName();
    }

    reloadContent();

    return { openProjectCreationForm, confirmProjectCreationForm, cancelProjectCreationForm, confirmTodoCreation, switchCurrentProject, removeProject, openProjectEditForm, confirmProjectEditForm, openTodoModal, closeTodoModal };
})();

export default domManager;