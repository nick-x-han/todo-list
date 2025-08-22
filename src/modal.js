import { ToDo } from "./todo.js"

const modalManager = (function () {
    const modal = document.querySelector("#create-todo");
    const title = document.querySelector("#title");
    const description = document.querySelector("#description");
    const dueDate = document.querySelector("#due-date");
    const priority = document.querySelector("#priority");

    function resetModal() {
        title.value = "";
        description.value = "";
        dueDate.value = "";
        priority.value = "";
    }

    function displayModal() {
        modal.showModal();
    }

    function getModal() {
        const t = title.value;
        const d = description.value;
        const dd = dueDate.value;
        const p = priority.value;
        return [t, d, dd, p];
    }

    function popModal() {
        const modalInfo = getModal();

        resetModal();
        modal.close();

        return modalInfo;
    }

    return { displayModal, getModal, popModal };

})();

export default modalManager;