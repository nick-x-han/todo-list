function Project(name) {

    let todos = [];

    let addTodo = function(todo) {
        todos.push(todo);
    }

    function getTodos() {
        return todos;
    }

    //for getting e.g. tasks ready by today
    function getDueTasks(timeframe) {
        
    }

    return {addTodo, getTodos, getDueTasks, name};
}

export default Project;