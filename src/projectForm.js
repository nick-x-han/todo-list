//handles the form for creating a project

//this should NOT be modifying the DOM (well it can but only with showing/hiding the form); dom.js will do that. this is also great b/c it allows me to easily reload the dom on page load so that the project list is generated immeidately (functions that just go through a list of projects while laso calling another function that takes in a project and inserts it)
function ProjectForm(projectListDom, projectManager) {
    const newProjectButton = document.querySelector("#new-project");
    const project = document.createElement("div");
    const form = document.createElement("form");
    const nameDiv = document.createElement("div");
    const nameInputLabel = document.createElement("label");
    const nameInput = document.createElement("input");
    const confirmButton = document.createElement("button");
    const cancelButton = document.createElement("button");

    nameDiv.style.display = "flex";
    nameDiv.style.alignItems = "center";
    nameDiv.style.fontSize = "1.2rem";
    nameInputLabel.htmlFor = "name";
    nameInputLabel.textContent = "Name"
    nameInput.name = "name";
    nameInput.id = "name";
    confirmButton.dataset.purpose = "confirmProject";
    cancelButton.dataset.purpose = "cancelProject";

    function initiate() {
        confirmButton.textContent = "Add";
        // addButton.type = "button";
        cancelButton.textContent = "Cancel";
        cancelButton.type = "button";
        nameInput.type = "text";
        nameInput.minLength = 1;
        nameDiv.appendChild(nameInputLabel);
        nameDiv.appendChild(nameInput);
        form.appendChild(nameDiv);
        form.appendChild(confirmButton);
        form.appendChild(cancelButton);
        project.appendChild(form);
    }

    this.displayForm = function () {
        // modalManager.displayModal();
        projectListDom.insertBefore(project, projectListDom.firstElementChild);
        nameInput.focus();
        newProjectButton.disabled = true;
    }

    this.hideForm = function (e) {
        project.remove();
        newProjectButton.disabled = false;
    }

    this.resetFormField = function(e) {
        nameInput.value = "";
    }

    this.submitForm = function (e) {
        e.preventDefault();
        const name = nameInput.value;

        if (projectManager.validateName(name)) {
            this.resetFormField();
            this.hideForm();
            return name;
        }
        else {
            //the validation isn't working in general, so this is best that can be done (browser won't check)
            nameInput.focus();
        }
    }

    initiate();

}

export default ProjectForm;