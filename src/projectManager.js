import Project from "./project.js";
import editIcon from "./images/pencil.svg"
import deleteIcon from "./images/delete.svg"
import { ToDo } from "./todo.js";

function generateTodoHTML(todo) {
    const todoDiv = document.createElement("div");
    const completedCheckbox = document.createElement("input");
    const priorityDisplay = document.createElement("span");
    const dueDate = document.createElement("div");
    const titleP = document.createElement("p");
    const editButton = document.createElement("button");
    const deleteButton = document.createElement("button");

    completedCheckbox.type = "checkbox";
    editButton.dataset.purpose = "editTodo";
    deleteButton.dataset.purpose = "deleteTodo";
    editButton.style.backgroundImage = `url(${editIcon})`;
    editButton.classList.add("small-button");
    deleteButton.style.backgroundImage = `url(${deleteIcon})`;
    deleteButton.classList.add("small-button");
    todoDiv.classList.add("todo");
    todoDiv.classList.add(todo.priority.toLowerCase());
    todoDiv.dataset.id = todo.id;

    priorityDisplay.textContent = todo.priority;
    dueDate.textContent = todo.dueDate;
    titleP.textContent = todo.title;


    todoDiv.append(completedCheckbox);
    todoDiv.append(priorityDisplay);
    todoDiv.append(dueDate);
    todoDiv.append(titleP);
    todoDiv.append(editButton);
    todoDiv.append(deleteButton);

    return todoDiv;
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
    createProject("Default");
    window.projects = projects;


    function createTodo(project, todoInfo) {
        const todo = new ToDo(todoInfo.title, todoInfo.description, todoInfo.dueDate, todoInfo.priority);
        todo.dom = generateTodoHTML(todo);
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
        })
    }

    function getProjectByName(name) {
        return projects.find(project => project.getName() === name);
    }

    return { projects, createTodo, createProject, isUniqueName, getProjectByName, changeName, deleteProjectByName };
})();

export default projectManager;