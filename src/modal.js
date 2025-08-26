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
        priorityDom.selectedIndex = 0; //"Low"; without this, the priority select will be empty after first submission
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
        if (form.reportValidity()) {
            const modalInfo = getModal();
            closeModal();
            resetModal();
            return modalInfo;
        }
        // plan last night: do the disabled thing for the todo dom; make the priority a select that is disabled and etcetera. edit button to make changes and then confirm/cancel + editbutton switch purpose (toggle)
        //maybe in eidt mode, switch purpose of delete button to cancel button and change its background image?
    }

    return { displayModal, getModal, popModal, closeModal };

})();

export default modalManager;