//handles the form for creating a project

function ProjectForm(parent, projectManager) {
    const newProjectButton = document.querySelector("#new-project");
    const project = document.createElement("div");
    const form = document.createElement("form");
    const nameDiv = document.createElement("div");
    const nameInputLabel = document.createElement("label");
    const nameInput = document.createElement("input");
    const confirmButton = document.createElement("button");
    const cancelButton = document.createElement("button");

    let formObjectToEdit;

    project.classList.add("form-parent");
    nameDiv.style.display = "grid";
    nameDiv.style.alignItems = "center";
    nameDiv.style.justifyContent = "space-between";
    nameDiv.style.fontSize = "1.2rem";
    nameDiv.style.justifyItems = "stretch";
    nameInputLabel.htmlFor = "name";
    nameInputLabel.textContent = "Name"
    nameInput.name = "name";
    nameInput.id = "name";
    nameInput.setAttribute("required", '');
    confirmButton.type = "submit";
    confirmButton.dataset.purpose = "confirmAddProject";
    cancelButton.dataset.purpose = "cancelProject";
    cancelButton.type = "button";

    function initiate() {
        form.formObject = this;

        confirmButton.textContent = "Add";
        cancelButton.textContent = "Cancel";
        cancelButton.type = "button";
        nameInput.type = "text";
        nameInput.setAttribute('minlength', "2");
        nameDiv.appendChild(nameInputLabel);
        nameDiv.appendChild(nameInput);
        form.appendChild(nameDiv);
        form.appendChild(confirmButton);
        form.appendChild(cancelButton);
        project.appendChild(form);

        nameInput.addEventListener('input', function () {
            // Clear any custom validity when user types. In the situation where e.g. project "ddd" is created and then I try to create another project "ddd", the error message will correctly show, but even after changing the name the popup will stay until pressing confirm, which is obscured. 
            this.setCustomValidity("");
        });
    }

    this.displayCreationForm = function () {
        this.hideForm();
        confirmButton.textContent = "Add";
        form.classList.add("create-form");
        form.classList.remove("edit-form");

        parent.insertBefore(project, parent.firstElementChild);
        nameInput.focus();
        newProjectButton.disabled = true;
    }

    this.displayEditForm = function (projectDomObject) {
        this.hideForm();
        confirmButton.textContent = "Edit";
        form.classList.remove("create-form");
        form.classList.add("edit-form");


        parent.insertBefore(project, projectDomObject);
        nameInput.value = projectDomObject.firstElementChild.textContent;
        nameInput.focus();
        formObjectToEdit = projectDomObject;
        formObjectToEdit.remove();

        confirmButton.dataset.purpose = "confirmEditProject";
    }

    this.hideForm = function (e) {
        if (formObjectToEdit) {
            parent.insertBefore(formObjectToEdit, project);
            formObjectToEdit = null;
            this.resetFormField(); //this is necessary; otherwise, the text from placing the original name in the nameInput will remain

            confirmButton.dataset.purpose = "confirmAddProject";
        }

        project.remove();
        newProjectButton.disabled = false;
    }

    this.resetFormField = function (e) {
        nameInput.value = "";
    }

    this.submitForm = function (e) {
        e.preventDefault();
        const name = nameInput.value;
        nameInput.setCustomValidity(""); //reset

        //checks for just minlength basically
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        if (!projectManager.isUniqueName(name)) {
            nameInput.setCustomValidity("Another project with this name already exists");
            nameInput.reportValidity();
            return;
        }
        
        if (formObjectToEdit) {

            let originalName = formObjectToEdit.firstElementChild.textContent;
            projectManager.changeName(projectManager.getProjectByName(originalName), name);

        }

        this.resetFormField();
        this.hideForm(name);
        return name;
    }

    initiate();

}

export { ProjectForm };