import { ToDo } from "./todo";

function Project(name) {

    let todos = [];

    let addTodo = function (todo) {
        todos.push(todo.id);
    }

    let removeTodo = function (todo) {
        if (!todo.id) { //function should work regardless of how it's used
            todo = ToDo.getTodoById(todo);
        }

        let index = todos.findIndex(id => id === todo.id);
        todos.splice(index, 1);g
        ToDo.deleteTodoById(todo.id);
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

    return { name, todos, addTodo, getTodos, getName, setName, removeTodo };
}

export default Project;