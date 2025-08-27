import { ToDo } from "./todo";

function Project(name) {

    let todos = [];

    let addTodo = function (todo) {
        todos.push(todo.id);
    }

    let removeTodo = function (todo) {
        let index = todos.findIndex(id => id === todo.id);
        todos.splice(index, 1);
    }

    function getTodos() {
        let currentProjectTodos = todos.map(id => ToDo.getTodoById(id));
        return currentProjectTodos;
    }

    function getName() {
        return name;
    }

    function setName(n) {
        name = n;
    }

    //for getting e.g. tasks ready by today
    function getDueTasks(timeframe) {

    }

    return { name, todos, addTodo, getTodos, getDueTasks, getName, setName, removeTodo };
}

export default Project;