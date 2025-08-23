import { ToDo } from "./todo";

function Project(name) {

    let todos = [];

    let addTodo = function(todo) {
        todos.push(todo);
    }

    function getTodos() {
        return todos;
    }

    function getName() {
        return name;
    }

    //for getting e.g. tasks ready by today
    function getDueTasks(timeframe) {
        
    }

    return {addTodo, getTodos, getDueTasks, getName};
}

export default Project;