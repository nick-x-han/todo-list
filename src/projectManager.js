import Project from "./project.js";
import editIcon from "./images/pencil.svg"
import deleteIcon from "./images/delete.svg"
import { ToDo } from "./todo.js";
import TodoForm from "./todoForm.js";



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
    editButton.classList.add("small-button");
    deleteButton.style.backgroundImage = `url(${deleteIcon})`;
    deleteButton.classList.add("small-button");


    projectDiv.classList.add("project");
    projectDiv.appendChild(changeButton);
    projectDiv.appendChild(editButton);
    projectDiv.appendChild(deleteButton);
    return projectDiv;
}

const projectManager = (function () {
    let projects = [];
    let superProjects = [];
    
    window.projects = projects;


    function createTodo(project, todoInfo) {
        const todo = new ToDo(todoInfo.title, todoInfo.description, todoInfo.dueDate, todoInfo.priority, todoInfo.completed);
        todo.dom = new TodoForm(todo).dom;
        project.addTodo(todo);
        return todo;
    }

    function createProject(name) {
        let project = new Project(name);
        let domObject = generateProjectHTML(name);
        project.dom = domObject;
        projects.push(project);
        return project;
    }

    //the goal with superprojects was to create a function that e.g. checked if it were true that, for any task, the due date is the same day as today. however, wasn't sure what to do with currentProject cache, so stopped. implement later?
    function SuperProject(name, conditionCheck) {
        this.dom = document.createElement("button");
        this.dom.textContent = name;
        this.dom.classList.add("super-project");
        this.dom.dataset.purpose = "switchProject";

        this.getTodos = function() {
            const todos = ToDo.allTodos;
            todos.filter(todo => conditionCheck(todo));
            return todos;
        }

        this.getName = function() {
            return name;
        }
    }

    function changeName(project, name) {
        project.dom.firstElementChild.textContent = name;
        project.setName(name);
    }

    function deleteProjectByName(name) {
        let index = projects.findIndex(p => p.getName() === name);
        projects.splice(index, 1);
    }

    function isUniqueName(name) {
        return !projects.find(project => {
            return project.getName() === name;
        }) && !superProjects.find(project => {
            return project.getName() === name;
        })
    }

    function getProjectByName(name) {
        let superProject = superProjects.find(project => project.getName() === name);
        if (superProject) {
            return superProject;
        }
        return projects.find(project => project.getName() === name);
    }

    return { projects, superProjects, SuperProject, createTodo, createProject, isUniqueName, getProjectByName, changeName, deleteProjectByName };
})();

export default projectManager;