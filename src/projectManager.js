import Project from "./project.js";
import editIcon from "./images/pencil.svg"
import deleteIcon from "./images/delete.svg"
import { ToDo } from "./todo.js";

//MIGHT BE BEST TO REFACTOR BY MAKING PROJECTS AN OBJECT...AVOIDS DUPLICATES, O(1), ETC.
//IDEA: refactor by using data-name to identify project doms + using an object to store all doms ever created in project manager. could even attach to Projects a .dom property to access their dom element instead of whatevr is being done now w/ ProjectObject

function generateTodoHTML(todo) {

}

function generateProjectHTML(name) {
    const projectDiv = document.createElement("div");
    const changeButton = document.createElement("button");
    const editButton = document.createElement("button");
    const deleteButton = document.createElement("button");

    changeButton.textContent = name;
    changeButton.dataset.purpose = "switchProject";
    editButton.dataset.purpose = "editProject";
    deleteButton.dataset.purpose = "deleteProject";

    editButton.style.backgroundImage = `url(${editIcon})`;
    deleteButton.style.backgroundImage = `url(${deleteIcon})`;

    projectDiv.classList.add("project");
    projectDiv.appendChild(changeButton);
    projectDiv.appendChild(editButton);
    projectDiv.appendChild(deleteButton);
    return projectDiv;
}

const projectManager = (function () {
    let projects = [];
    createProject("Default");
    window.projects = projects;


    function createTodo(project, todoInfo) {
        const todo = new ToDo()
        project.addTodo(todo);
    }

    function createProject(name) {
        let project = new Project(name);
        let domObject = generateProjectHTML(name);
        project.dom = domObject;
        projects.push(project);
        console.log(project.dom);
        return project;
    }

    function changeName(project, name) {
        project.dom.firstElementChild.textContent = name;
        project.setName(name);
    }

    function deleteProjectByName(name) {
        let index = projects.findIndex(p => p.getName() === name);
        projects.splice(index, 1);
    }

    //if name has been input and it is unique
    function validateName(name) {
        if (isUniqueName(name) && name.length > 0) {
            return true;
        }
        return false;
    }

    function isUniqueName(name) {
        const names = projects.map(project => {
            return project.getName();
        })
        return !names.includes(name);
    }

    function getProjectByName(name) {
        return projects.find(project => project.getName() === name);
    }

    return { projects, createTodo, createProject, validateName, getProjectByName, changeName, deleteProjectByName };
})();

export default projectManager;