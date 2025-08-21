import { ToDo } from "./todo.js"

export default modalManager = (function () {
    const modal = document.querySelector("#create-todo");
    const title = document.querySelector("#title");
    const description = document.querySelector("#description");
    const dueDate = document.querySelector("#due-date");
    const priority = document.querySelector("#priority");

    const createTodo = true;

    function resetModal() {
        title.value = "";
        description.value = "";
        dueDate.value = "";
        priority.value = "";
    }

    function showModal() {
        modal.showModal();
        //so this module handles the modal in general

    }

    function confirmNewTodo() {
        const t = title.value;
        const d = description.value;
        const dd = dueDate.value;
        const p = priority.value;
        const todo = new ToDo(t, d, dd, p);

        resetModal();
        modal.close();

        return todo;
    }

    return { showModal, confirmNewTodo };

})();