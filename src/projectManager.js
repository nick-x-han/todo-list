import Project from "./project.js";
import editIcon from "./images/pencil.svg"
import deleteIcon from "./images/delete.svg"
import { ToDo } from "./todo.js";

//MIGHT BE BEST TO REFACTOR BY MAKING PROJECTS AN OBJECT...AVOIDS DUPLICATES, O(1), ETC.
//IDEA: refactor by using data-name to identify project doms + using an object to store all doms ever created in project manager. could even attach to Projects a .dom property to access their dom element instead of whatevr is being done now w/ ProjectObject
class ProjectObject {
    constructor(name) {
        this.project = new Project(name);
        this.object = this.#generateProjectHTML(name);
        //either use data-id to search for tasks, or do some kind of object in here such that the .project keeps track of the underlying todos, while the new object will use dict to keep track of each task's corresponding dom object or something. maybe the data task will have a id, which the dom task will use as a data-id, allowing free access to both sides. it should be important that, despite such a radically different approach to storing todos vs projects, other modules hvae no idea that they're so different; should basically be the same
        //project objects keep a dict that stores id: domObject, but it handles all of that logic itself; other classes, including project manager, should have no idea that this is how it is stored 
        //OR just define on each task a new property that stores their dom, so that the task and project classes have no idea
    }

    //this will store id (not data-id): domObject, I guess. projectmanager is what actually handles the creation. object is ok here b/c it will prob be used in like .map from id to dom objects, since we should be sorting the tasks themselves anyway, not their dom representation
    todoDomObjects = {};

    #generateProjectHTML(name) {
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

    //called by projectmanager
    generateTodoHTML(todo) {

    }

    getHTML() {
        return this.object;
    }
}

const projectManager = (function () {
    let projects = [];
    let defaultProject = new ProjectObject("Default");
    projects.push(defaultProject);
    
    function createTodo(project, todoInfo) {
        const todo = new ToDo()
        project.addTodo(todo);
    }

    function createProject(name) {
        let project = new ProjectObject(name);
        projects.push(project);
        return project;
    }

    function changeName(project, name) {
        project.object.firstElementChild.textContent = name;
        project.project.setName(name);
    }

    function deleteProjectByName(name) {
        let index = projects.findIndex(p => p.project.getName() === name);
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
            return project.project.getName();
        })
        return !names.includes(name);
    }

    function getProjectByName(name) {
        return projects.find(project => project.project.getName() === name);
    }
    window.projects = projects;
    return { projects, createTodo, createProject, validateName, getProjectByName, changeName, deleteProjectByName };
})();

export default projectManager;