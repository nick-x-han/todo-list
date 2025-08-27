import editIcon from "./images/pencil.svg"
import deleteIcon from "./images/delete.svg"
import checkIcon from "./images/check-bold.svg"
import cancelIcon from "./images/cancel.svg"
import { formatDistanceToNowStrict, startOfToday, format } from "date-fns";


export default class TodoForm {
    todoDiv = document.createElement("div");
    todoForm = document.createElement("form");
    completedCheckbox = document.createElement("input");
    priorityDisplay = document.createElement("select");
    dateInput = document.createElement("input");
    dateDisplay = document.createElement("div");
    titleDisplay = document.createElement("input");
    dateTitleDiv = document.createElement("div");

    editButton = document.createElement("button");
    deleteButton = document.createElement("button");
    buttonsDiv = document.createElement("div");

    expandButton = document.createElement("button");

    description = document.createElement("textarea");

    editableState = false;

    constructor(todo) {
        this.todo = todo;
        this.initiateTodoHTML(todo)
        this.dom = this.todoDiv;
        this.dom.parent = this;
        this.toggleReadStatus();
        this.regenerateTodoHTML();
        this.changeButtonEditState();
        this.setStyleByCompleted(this.completedCheckbox.checked);
    }

    toggleEditForm() {
        this.changeButtonEditState();
        this.editableState = !this.editableState;
        this.toggleReadStatus();
        this.toggleOpenDescription();
        this.swapInDate("input");
        this.swapInDate(this.editableState ? "input" : "display");
    }

    finalizeEdits(event) {
        //confirm the edit
        if (event.target === this.editButton) {
            if (!this.checkSubmitConditions()) {
                return;
            }
            this.todo.editInfo(this.getFormValues());
        }
        this.regenerateTodoHTML();
        this.toggleEditForm();
    }

    checkSubmitConditions() {
        if (!this.todoForm.checkValidity()) {
            this.todoForm.reportValidity();
            return false;
        }
        return true;
    }

    changeButtonEditState() {
        //when used in constructor, this bool will be false b/c purpose wasn't set yet
        let previouslyClosedState = this.editButton.dataset.purpose === "editTodo";
        if (previouslyClosedState) {
            this.editButton.dataset.purpose = "exitEditTodo";
            this.deleteButton.dataset.purpose = "exitEditTodo";
            this.editButton.style.backgroundImage = `url(${checkIcon})`;
            this.deleteButton.style.backgroundImage = `url(${cancelIcon})`;
        }
        else {
            this.editButton.dataset.purpose = "editTodo";
            this.deleteButton.dataset.purpose = "deleteTodo";
            this.editButton.style.backgroundImage = `url(${editIcon})`;
            this.deleteButton.style.backgroundImage = `url(${deleteIcon})`;
        }

    }

    toggleReadStatus() {
        let currentReadStatus = this.dateInput.readOnly;
        this.dateInput.readOnly = !currentReadStatus;
        this.description.readOnly = !currentReadStatus;
        this.titleDisplay.readOnly = !currentReadStatus;
        this.priorityDisplay.disabled = !currentReadStatus;
    }

    toggleOpenDescription(target) {
        if (target === this.description || target === this.completedCheckbox) return; //annoying if description can close/open itself (applies to checkbox as well)

        //if it's not attached to the div already and if not currently editing the todo (since we want it open for easier access)
        if (this.description.parentElement === this.todoDiv && !this.editableState) {
            this.description.remove();
            this.todoForm.classList.remove("description-open");
        }
        else {
            this.todoDiv.append(this.description);
            this.todoForm.classList.add("description-open");
        }

    }

    toggleCompletedState(target) {
        this.todo.toggleCompleted();
        this.setStyleByCompleted(this.completedCheckbox.checked);
    }

    setStyleByCompleted(completed) {
        if (completed) {
            this.todoForm.classList.add("completed");
            this.description.classList.add("completed");
        }
        else {
            this.todoForm.classList.remove("completed");
            this.description.classList.remove("completed");
        }
    }

    swapInDate(mode) {

        //newChild, oldChild
        if (mode === "display") {
            this.dateDisplay.style.display = "block";
            this.dateInput.style.display = "none";

        }
        else if (mode === "input") {
            this.dateDisplay.style.display = "none";
            this.dateInput.style.display = "block";
        }
    }

    //all of this only needs to run on creation
    initiateTodoHTML(todo) {
        this.completedCheckbox.type = "checkbox";
        this.completedCheckbox.classList.add("todo-completed");

        this.editButton.classList.add("small-button");
        this.deleteButton.classList.add("small-button");
        this.editButton.type = "button";
        this.deleteButton.type = "button";
        this.buttonsDiv.classList.add("todo-buttons-container");

        this.todoForm.classList.add("todo");
        this.todoDiv.dataset.id = todo.id;
        this.todoDiv.classList.add("todo-parent");


        this.dateInput.type = "date";
        this.dateInput.name = "dueDate";
        this.dateInput.min = format(startOfToday(), 'yyyy-MM-dd');
        this.dateInput.required = true;

        this.titleDisplay.name = "todoName";
        this.titleDisplay.required = true;

        this.dateTitleDiv.classList.add("vertical-two");

        this.todoDiv.addEventListener("click", e => this.toggleOpenDescription(e.target));

        this.completedCheckbox.dataset.purpose = "toggleCompleted";
        

        this.dateInput.classList.toggle("todo-date");
        this.dateDisplay.classList.toggle("todo-date");
        this.titleDisplay.classList.toggle("todo-title");
        this.description.classList.toggle("todo-description");
        this.priorityDisplay.classList.toggle("todo-priority");

        const options = [
            { value: 'low', text: 'Low' },
            { value: 'medium', text: 'Medium' },
            { value: 'high', text: 'High' }
        ];
        options.forEach(opt => {
            const option = document.createElement('option');
            option.value = opt.value;
            option.textContent = opt.text;
            this.priorityDisplay.appendChild(option);
        });

        this.todoForm.append(this.completedCheckbox);
        this.todoForm.append(this.priorityDisplay);
        this.dateTitleDiv.append(this.titleDisplay);
        this.dateTitleDiv.append(this.dateDisplay);
        this.dateTitleDiv.append(this.dateInput);
        this.todoForm.append(this.dateTitleDiv);
        this.buttonsDiv.append(this.editButton);
        this.buttonsDiv.append(this.deleteButton);
        this.todoForm.append(this.buttonsDiv);
        this.todoDiv.appendChild(this.todoForm);
        // this.todoDiv.append(this.expandButton);

        this.dateInput.style.display = "none";
    }

    //this must run upon any editing update
    regenerateTodoHTML() {

        const options = Array.from(this.priorityDisplay.children);
        options.forEach(opt => {

            if (opt.value === this.todo.priority) {
                opt.selected = true;
                this.priorityDisplay.classList.add(opt.value);
                this.todoForm.classList.add(opt.value)
            }
            else {
                this.priorityDisplay.classList.remove(opt.value);
                this.todoForm.classList.remove(opt.value)
            }
        });
        const dateFormatted = formatDistanceToNowStrict(new Date(this.todo.dueDate), { addSuffix: true });
        this.dateDisplay.textContent = "due " + dateFormatted;
        this.dateInput.value = this.todo.dueDate;
        this.titleDisplay.value = this.todo.title;
        this.description.value = this.todo.description;
        this.completedCheckbox.checked = this.todo.getCompleted();
    }

    getFormValues() {
        let title = this.titleDisplay.value;
        let description = this.description.value;
        let dueDate = this.dateInput.value;
        let priority = this.priorityDisplay.value;

        return { title, description, dueDate, priority }
    }

}