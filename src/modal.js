import { ToDo } from "./todo.js"

//maybe make showModal have different modes, like see (no inputs; amost the same except inputs replaced by the actual values), edit (all fields editable), and etc.
const modalManager = (function () {
    let projectList;
    const modal = document.querySelector("#create-todo");
    const title = document.querySelector("#title");
    const description = document.querySelector("#description");
    const dueDate = document.querySelector("#due-date");
    const priority = document.querySelector("#priority");
    const confirmButton = document.querySelector("#confirm-button");
    const cancelButton = document.querySelector("#cancel-button");
    cancelButton.type = "button";

    function initiate(projects) {
        projectList = projects;
    }
    function resetModal() {
        title.value = "";
        description.value = "";
        dueDate.value = "";
        priority.value = "";
    }

    function displayModal(purpose) {
        
        confirmButton.textContent = purpose;
        modal.showModal();
    }

    function getModal() {
        const t = title.value;
        const d = description.value;
        const dd = dueDate.value;
        const p = priority.value;
        return [t, d, dd, p];
    }

    function closeModal() {
        modal.close();
    }

    function popModal() {
        const modalInfo = getModal();

        resetModal();
        closeModal();

        return modalInfo;
    }

    return { initiate, displayModal, getModal, popModal, closeModal };

})();

export default modalManager;