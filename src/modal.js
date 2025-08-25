import { ToDo } from "./todo.js"

//maybe make showModal have different modes, like see (no inputs; amost the same except inputs replaced by the actual values), edit (all fields editable), and etc.
const modalManager = (function () {
    let projectList;
    const modal = document.querySelector("#create-todo");
    const form = document.querySelector("#modal-form");
    const titleDom = document.querySelector("#title");
    const descriptionDom = document.querySelector("#description");
    const dueDateDom = document.querySelector("#due-date");
    const priorityDom = document.querySelector("#priority");
    const confirmButton = document.querySelector("#confirm-button");
    const cancelButton = document.querySelector("#cancel-button");
    cancelButton.type = "button";

    function resetModal() {
        titleDom.value = "";
        descriptionDom.value = "";
        dueDateDom.value = "";
        priorityDom.value = "";
    }

    function displayModal(purpose) {

        confirmButton.textContent = purpose;
        modal.showModal();
    }

    function getModal() {
        const title = titleDom.value;
        const description = descriptionDom.value;
        const dueDate = dueDateDom.value;
        const priority = priorityDom.value;
        return { title, description, dueDate, priority };
    }

    function closeModal() {
        modal.close();
    }

    function popModal() {
        const modalInfo = getModal();

        if (form.reportValidity()) {
            resetModal();
        }


        // closeModal();

        return modalInfo;
    }

    return { displayModal, getModal, popModal, closeModal };

})();

export default modalManager;