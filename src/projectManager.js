import Project from "./project.js";
import editIcon from "./images/pencil.svg"
import deleteIcon from "./images/delete.svg"

class ProjectObject {
    constructor(name) {
        this.project = new Project(name);
        this.object = this.#generateHTML(name);
    }

    #generateHTML(name) {
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
        //idea: each project div has 3 columns for each of teh three actions. each project can also have a .current-project, in which case the entire div changes color. 
    }

    getObject() {
        return this.object;
    }
}

const projectManager = (function () {
    let projects = [];
    let defaultProject = new ProjectObject("Default");
    projects.push(defaultProject);
    
    function appendTodo(project, todo) {
        project.addTodo(todo);
    }

    function createProject(name) {
        let project = new ProjectObject(name);
        projects.push(project);
        return project;
    }

    return { projects, appendTodo, createProject };
})();

export default projectManager;