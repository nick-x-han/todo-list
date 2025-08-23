import projectManager from "./projectManager.js";
import modalManager from "./modal.js"
import ProjectForm from "./projectForm.js";

const domManager = (function () {
    const projectListDom = document.querySelector("#project-list");
    const todosListDom = document.querySelector("#todos-list");
    let currentProject = projectManager.projects[0];

    const projectForm = new ProjectForm(projectListDom, projectManager);

    function openProjectCreationForm() {
        projectForm.displayForm();
    }

    function closeProjectCreationForm(event, created) {
        if (created) {
            let name = projectForm.submitForm(event);
            if (name) {
                const project = projectManager.createProject(name);
                insertProject(project);
            }
        }
        else {
            projectForm.hideForm(event);
        }
    }

    function insertProject(project) {
        const projectDiv = project.getHTML();
        projectListDom.insertBefore(projectDiv, projectListDom.firstElementChild);
    }

    function editProject(event) {
        let name = event.target.textContent;
        projectManager.editProjectName(name);

    }

    function removeProject(event) {

    }

    //used with the .project buttons on the sidebar to switch the project that will be added to from new todos
    function switchCurrentProject(event) {
        //add a .current-project class that will be styled to be darker in color or something
        currentProject.getHTML().classList.toggle("current-project");
        let name = event.target.textContent;
        currentProject = projectManager.getProjectByName(name);
        currentProject.getHTML().classList.toggle("current-project");
        // reloadTodos();
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
        console.log(currentProject)
        currentProject.getHTML().classList.add("current-project");
    }

    function receiveModalEvent() {
        //wait this function makes no sense to have; addTodos for example should handle the modal
    }

    reloadContent();

    return { openProjectCreationForm, closeProjectCreationForm, generateTodo, switchCurrentProject, receiveModalEvent, removeProject, editProject };
})();

export default domManager;